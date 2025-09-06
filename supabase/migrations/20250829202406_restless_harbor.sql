/*
  # Create lawyer profiles table with vector embeddings

  1. New Tables
    - `lawyer_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `full_name` (text)
      - `email` (text)
      - `phone_number` (text)
      - `firm_name` (text)
      - `practice_areas` (text array)
      - `expertise_description` (text)
      - `professional_bio` (text)
      - `hourly_rate` (numeric)
      - `consultation_fee` (numeric)
      - `free_consultation` (boolean)
      - `availability_status` (text)
      - `response_time` (text)
      - `rating` (numeric)
      - `review_count` (integer)
      - `profile_photo_url` (text)
      - `location` (text)
      - `years_experience` (integer)
      - `languages_spoken` (text array)
      - `search_embedding` (vector)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `lawyer_profiles` table
    - Add policies for authenticated users
*/

-- Enable the vector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- Create lawyer_profiles table
CREATE TABLE IF NOT EXISTS lawyer_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text,
  phone_number text,
  firm_name text,
  practice_areas text[] DEFAULT '{}',
  expertise_description text,
  professional_bio text,
  hourly_rate numeric DEFAULT 0,
  consultation_fee numeric DEFAULT 0,
  free_consultation boolean DEFAULT false,
  availability_status text DEFAULT 'Available',
  response_time text DEFAULT 'Within 24 hours',
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  profile_photo_url text,
  location text DEFAULT 'South Africa',
  years_experience integer DEFAULT 0,
  languages_spoken text[] DEFAULT '{}',
  search_embedding vector(384),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE lawyer_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Lawyers can read own profile"
  ON lawyer_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Lawyers can update own profile"
  ON lawyer_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Lawyers can insert own profile"
  ON lawyer_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Public can read lawyer profiles"
  ON lawyer_profiles
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS lawyer_profiles_embedding_idx 
ON lawyer_profiles 
USING ivfflat (search_embedding vector_cosine_ops)
WITH (lists = 100);

-- Insert sample lawyer data
INSERT INTO lawyer_profiles (
  full_name, email, phone_number, firm_name, practice_areas, 
  expertise_description, professional_bio, hourly_rate, consultation_fee,
  free_consultation, location, years_experience, languages_spoken, rating, review_count
) VALUES 
(
  'Sarah Johnson',
  'sarah@lawfirm.com',
  '+27 11 123 4567',
  'Johnson & Associates',
  ARRAY['Corporate Law', 'Contract Law', 'M&A'],
  'Specializing in corporate transactions, mergers and acquisitions, and complex commercial contracts with over 15 years of experience.',
  'Sarah is a seasoned corporate lawyer with extensive experience in mergers and acquisitions, corporate governance, and commercial law. She has advised numerous multinational corporations on complex transactions and regulatory compliance.',
  1500,
  500,
  true,
  'Johannesburg, South Africa',
  15,
  ARRAY['English', 'Afrikaans'],
  4.9,
  127
),
(
  'Michael Chen',
  'michael@chenlegal.co.za',
  '+27 21 987 6543',
  'Chen Legal Services',
  ARRAY['Family Law', 'Divorce', 'Child Custody'],
  'Compassionate family law attorney specializing in divorce proceedings, child custody disputes, and domestic relations with a focus on mediation.',
  'Michael brings a compassionate approach to family law, helping clients navigate difficult personal situations with dignity and respect. He specializes in collaborative divorce and child-focused custody arrangements.',
  1200,
  400,
  true,
  'Cape Town, South Africa',
  12,
  ARRAY['English', 'Mandarin', 'Afrikaans'],
  4.8,
  89
),
(
  'Emily Rodriguez',
  'emily@rodriguezlaw.co.za',
  '+27 31 555 7890',
  'Rodriguez Employment Law',
  ARRAY['Employment Law', 'Labour Relations', 'Workplace Disputes'],
  'Expert in employment law, labour relations, and workplace disputes with a track record of successful CCMA representations.',
  'Emily is a dedicated employment law specialist who fights for workers rights and helps employers navigate complex labour legislation. She has extensive experience in CCMA proceedings and workplace investigations.',
  1300,
  450,
  false,
  'Durban, South Africa',
  10,
  ARRAY['English', 'Spanish', 'Zulu'],
  4.9,
  156
),
(
  'David Thompson',
  'david@thompsonproperty.co.za',
  '+27 12 444 3210',
  'Thompson Property Law',
  ARRAY['Property Law', 'Real Estate', 'Conveyancing'],
  'Experienced property lawyer handling residential and commercial property transactions, transfers, and property disputes.',
  'David has been practicing property law for over 20 years, handling everything from first-time home purchases to complex commercial property developments. He ensures smooth property transactions for all his clients.',
  1100,
  350,
  true,
  'Pretoria, South Africa',
  20,
  ARRAY['English', 'Afrikaans'],
  4.7,
  203
),
(
  'Priya Patel',
  'priya@patelcriminal.co.za',
  '+27 11 777 8888',
  'Patel Criminal Defense',
  ARRAY['Criminal Law', 'Criminal Defense', 'White Collar Crime'],
  'Aggressive criminal defense attorney with expertise in white-collar crime, fraud cases, and serious criminal charges.',
  'Priya is a formidable criminal defense lawyer known for her meticulous preparation and aggressive courtroom advocacy. She has successfully defended clients in high-profile criminal cases and complex fraud matters.',
  1800,
  600,
  false,
  'Johannesburg, South Africa',
  8,
  ARRAY['English', 'Hindi', 'Gujarati'],
  4.8,
  94
);