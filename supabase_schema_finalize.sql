-- ====================================================================
-- [REVERSE-RESEARCH-SUPABASE-SCHEMA-FINALIZE-001]
-- Supabase Production Schema Safety Finalizer
-- --------------------------------------------------------------------
-- Instructions: Copy and run this script in the Supabase SQL Editor to
-- finalize all tables, missing columns, RLS enablement, and SELECT policies.
-- ====================================================================

-- 1. Create suggest_keywords Table if not exists
CREATE TABLE IF NOT EXISTS public.suggest_keywords (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    query_id UUID REFERENCES public.search_queries(id) ON DELETE CASCADE,
    base_keyword TEXT NOT NULL,
    suggest_text TEXT NOT NULL,
    source TEXT DEFAULT 'google_suggest',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create emotion_scores Table if not exists
CREATE TABLE IF NOT EXISTS public.emotion_scores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    suggest_id UUID REFERENCES public.suggest_keywords(id) ON DELETE CASCADE,
    emotion_category TEXT NOT NULL, -- 不安, 比較, 怒り, 緊急, 購入直前, 悩み, 調査
    pain_score INTEGER NOT NULL CHECK (pain_score >= 0 AND pain_score <= 100),
    opportunity_score INTEGER NOT NULL CHECK (opportunity_score >= 0 AND opportunity_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create intent_chains Table if not exists
CREATE TABLE IF NOT EXISTS public.intent_chains (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    parent_keyword TEXT,
    child_keyword TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Add emotion_data JSONB column to search_queries if not exists
ALTER TABLE public.search_queries ADD COLUMN IF NOT EXISTS emotion_data JSONB DEFAULT '{}'::jsonb;

-- 5. Enable RLS on all tables
ALTER TABLE public.search_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suggest_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emotion_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intent_chains ENABLE ROW LEVEL SECURITY;

-- 6. Safely create SELECT policies (DO $$ BEGIN ... END $$ block to avoid duplicate errors)
DO $$
BEGIN
    -- Policy for search_queries
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'search_queries' AND policyname = 'Enable read access for all users on search_queries'
    ) THEN
        CREATE POLICY "Enable read access for all users on search_queries" 
        ON public.search_queries FOR SELECT USING (true);
    END IF;

    -- Policy for suggest_keywords
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'suggest_keywords' AND policyname = 'Enable read access for all users on suggest_keywords'
    ) THEN
        CREATE POLICY "Enable read access for all users on suggest_keywords" 
        ON public.suggest_keywords FOR SELECT USING (true);
    END IF;

    -- Policy for emotion_scores
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'emotion_scores' AND policyname = 'Enable read access for all users on emotion_scores'
    ) THEN
        CREATE POLICY "Enable read access for all users on emotion_scores" 
        ON public.emotion_scores FOR SELECT USING (true);
    END IF;

    -- Policy for intent_chains
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'intent_chains' AND policyname = 'Enable read access for all users on intent_chains'
    ) THEN
        CREATE POLICY "Enable read access for all users on intent_chains" 
        ON public.intent_chains FOR SELECT USING (true);
    END IF;
END
$$;

-- 7. Add indexes to boost history recovery query speeds
CREATE INDEX IF NOT EXISTS idx_suggest_query_id ON public.suggest_keywords(query_id);
CREATE INDEX IF NOT EXISTS idx_emotion_suggest_id ON public.emotion_scores(suggest_id);
CREATE INDEX IF NOT EXISTS idx_intent_session ON public.intent_chains(session_id);
