import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface LawyerProfile {
  id: string;
  practice_areas: string[];
  expertise_description: string;
  professional_bio: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get all lawyer profiles that don't have embeddings yet
    const { data: lawyers, error: fetchError } = await supabaseClient
      .from('lawyer_profiles')
      .select('id, practice_areas, expertise_description, professional_bio')
      .is('search_embedding', null);

    if (fetchError) {
      throw new Error(`Failed to fetch lawyers: ${fetchError.message}`);
    }

    if (!lawyers || lawyers.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No lawyers need embedding generation' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const results = [];

    // Process each lawyer
    for (const lawyer of lawyers as LawyerProfile[]) {
      try {
        // Create searchable text by combining practice areas, expertise, and bio
        const searchableText = [
          lawyer.practice_areas?.join(', ') || '',
          lawyer.expertise_description || '',
          lawyer.professional_bio || ''
        ].filter(text => text.trim().length > 0).join('. ');

        if (!searchableText.trim()) {
          console.log(`Skipping lawyer ${lawyer.id} - no searchable text`);
          continue;
        }

        // Generate embedding using Supabase AI built-in model
        const model = new Supabase.ai.Session('gte-small');
        const embedding = await model.run(searchableText, {
          mean_pool: true,
          normalize: true
        });

        if (!embedding || !Array.isArray(embedding)) {
          throw new Error('Invalid embedding generated');
        }

        // Update the lawyer profile with the embedding
        const { error: updateError } = await supabaseClient
          .from('lawyer_profiles')
          .update({ search_embedding: embedding })
          .eq('id', lawyer.id);

        if (updateError) {
          throw new Error(`Failed to update lawyer ${lawyer.id}: ${updateError.message}`);
        }

        results.push({
          id: lawyer.id,
          status: 'success',
          textLength: searchableText.length
        });

      } catch (error) {
        console.error(`Error processing lawyer ${lawyer.id}:`, error);
        results.push({
          id: lawyer.id,
          status: 'error',
          error: error.message
        });
      }
    }

    return new Response(
      JSON.stringify({
        message: `Processed ${lawyers.length} lawyers`,
        results
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-lawyer-embeddings:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});