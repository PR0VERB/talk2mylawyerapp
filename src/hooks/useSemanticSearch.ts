import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

interface LawyerSearchResult {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  firm_name: string;
  practice_areas: string[];
  expertise_description: string;
  professional_bio: string;
  hourly_rate: number;
  consultation_fee: number;
  free_consultation: boolean;
  availability_status: string;
  response_time: string;
  rating: number;
  review_count: number;
  profile_photo_url?: string;
  location: string;
  years_experience: number;
  languages_spoken: string[];
  similarity: number;
}

interface SearchResponse {
  query: string;
  results: LawyerSearchResult[];
  count: number;
}

export function useSemanticSearch() {
  const [results, setResults] = useState<LawyerSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastQuery, setLastQuery] = useState<string>('');

  const searchLawyers = useCallback(async (query: string, limit = 10) => {
    if (!query.trim()) {
      setResults([]);
      setLastQuery('');
      return;
    }

    setLoading(true);
    setError(null);
    setLastQuery(query);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('search-lawyers', {
        body: { 
          query: query.trim(),
          limit,
          threshold: 0.3 // Lower threshold for more results
        }
      });

      if (functionError) {
        throw new Error(functionError.message);
      }

      const searchResponse = data as SearchResponse;
      setResults(searchResponse.results || []);
      
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'Search failed');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setLastQuery('');
    setError(null);
  }, []);

  return {
    results,
    loading,
    error,
    lastQuery,
    searchLawyers,
    clearResults
  };
}