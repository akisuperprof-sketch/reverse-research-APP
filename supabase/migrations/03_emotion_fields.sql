-- Add new JSONB column to search_queries to store deep emotion data
ALTER TABLE public.search_queries ADD COLUMN IF NOT EXISTS emotion_data JSONB DEFAULT '{}'::jsonb;
