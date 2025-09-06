/*
  # Add vector similarity search function

  1. Functions
    - `search_lawyers_by_similarity` - performs vector similarity search
  
  2. Purpose
    - Enable semantic search of lawyers based on practice areas and expertise
    - Return ranked results with similarity scores
*/

-- Create the vector similarity search function
CREATE OR REPLACE FUNCTION search_lawyers_by_similarity(
  query_embedding vector(384),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  id uuid,
  full_name text,
  email text,
  phone_number text,
  firm_name text,
  practice_areas text[],
  expertise_description text,
  professional_bio text,
  hourly_rate numeric,
  consultation_fee numeric,
  free_consultation boolean,
  availability_status text,
  response_time text,
  rating numeric,
  review_count integer,
  profile_photo_url text,
  location text,
  years_experience integer,
  languages_spoken text[],
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    lp.id,
    lp.full_name,
    lp.email,
    lp.phone_number,
    COALESCE(lp.firm_name, '') as firm_name,
    COALESCE(lp.practice_areas, '{}') as practice_areas,
    COALESCE(lp.expertise_description, '') as expertise_description,
    COALESCE(lp.professional_bio, '') as professional_bio,
    COALESCE(lp.hourly_rate, 0) as hourly_rate,
    COALESCE(lp.consultation_fee, 0) as consultation_fee,
    COALESCE(lp.free_consultation, false) as free_consultation,
    COALESCE(lp.availability_status, 'Available') as availability_status,
    COALESCE(lp.response_time, 'Within 24 hours') as response_time,
    COALESCE(lp.rating, 0) as rating,
    COALESCE(lp.review_count, 0) as review_count,
    lp.profile_photo_url,
    COALESCE(lp.location, 'South Africa') as location,
    COALESCE(lp.years_experience, 0) as years_experience,
    COALESCE(lp.languages_spoken, '{}') as languages_spoken,
    (1 - (lp.search_embedding <=> query_embedding)) as similarity
  FROM lawyer_profiles lp
  WHERE lp.search_embedding IS NOT NULL
    AND (1 - (lp.search_embedding <=> query_embedding)) > match_threshold
  ORDER BY lp.search_embedding <=> query_embedding
  LIMIT match_count;
END;
$$;