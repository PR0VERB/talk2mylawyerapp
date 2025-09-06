import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface SearchRequest {
  query: string;
  limit?: number;
  threshold?: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { query, limit = 10, threshold = 0.5 }: SearchRequest = await req.json();

    if (!query || query.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Generate embedding for the search query using built-in AI
    const model = new Supabase.ai.Session('gte-small');
    const queryEmbedding = await model.run(query.trim(), {
      mean_pool: true,
      normalize: true
    });

    if (!queryEmbedding || !Array.isArray(queryEmbedding)) {
      throw new Error('Failed to generate query embedding');
    }

    // Perform vector similarity search
    const { data: lawyers, error: searchError } = await supabaseClient.rpc(
      'search_lawyers_by_similarity',
      {
        query_embedding: queryEmbedding,
        match_threshold: threshold,
        match_count: limit
      }
    );

    if (searchError) {
      console.error('Search RPC error:', searchError);
      throw new Error(`Search failed: ${searchError.message || 'Unknown search error'}`);
    }

    // Ensure we have valid results
    const validLawyers = (lawyers || []).filter(lawyer => 
      lawyer && typeof lawyer === 'object' && lawyer.id
    );

    return new Response(
      JSON.stringify({
        query,
        results: validLawyers,
        count: validLawyers.length
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in search-lawyers:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});