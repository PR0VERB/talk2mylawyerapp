/*
  # Ensure one profile per user in lawyer_profiles

  1. Clean up any duplicate rows per user_id keeping the most recent
  2. Add a unique constraint on user_id to prevent future duplicates
*/

-- 1) Remove duplicates (keep the latest by created_at, then by id)
WITH ranked AS (
  SELECT id, user_id, created_at,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC, id DESC) AS rn
  FROM lawyer_profiles
)
DELETE FROM lawyer_profiles lp
USING ranked r
WHERE lp.id = r.id
  AND r.rn > 1;

-- 2) Add unique constraint on user_id if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'lawyer_profiles_user_id_key'
  ) THEN
    ALTER TABLE lawyer_profiles
      ADD CONSTRAINT lawyer_profiles_user_id_key UNIQUE (user_id);
  END IF;
END $$;
