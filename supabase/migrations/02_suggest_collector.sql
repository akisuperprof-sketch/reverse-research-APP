-- ==========================================
-- IntentOS Suggest Collector Tables
-- ==========================================

-- 1. suggest_keywords (サジェストキーワード一覧)
CREATE TABLE IF NOT EXISTS public.suggest_keywords (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    query_id UUID REFERENCES public.search_queries(id) ON DELETE CASCADE,
    base_keyword TEXT NOT NULL,
    suggest_text TEXT NOT NULL,
    source TEXT DEFAULT 'google_suggest',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. emotion_scores (感情分類とペインスコア)
CREATE TABLE IF NOT EXISTS public.emotion_scores (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    suggest_id UUID REFERENCES public.suggest_keywords(id) ON DELETE CASCADE,
    emotion_category TEXT NOT NULL, -- 不安, 比較, 怒り, 緊急, 購入直前, 悩み, 調査
    pain_score INTEGER NOT NULL CHECK (pain_score >= 0 AND pain_score <= 100),
    opportunity_score INTEGER NOT NULL CHECK (opportunity_score >= 0 AND opportunity_score <= 100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. intent_chains (検索連鎖グラフ)
CREATE TABLE IF NOT EXISTS public.intent_chains (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    session_id TEXT NOT NULL, -- 同一ユーザー/セッションでの連続検索を追跡する用
    parent_keyword TEXT,
    child_keyword TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Settings (Service Role ONLY bypass)
ALTER TABLE public.suggest_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emotion_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intent_chains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users on suggest_keywords" ON public.suggest_keywords FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users on emotion_scores" ON public.emotion_scores FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users on intent_chains" ON public.intent_chains FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_suggest_query_id ON public.suggest_keywords(query_id);
CREATE INDEX IF NOT EXISTS idx_emotion_suggest_id ON public.emotion_scores(suggest_id);
CREATE INDEX IF NOT EXISTS idx_intent_session ON public.intent_chains(session_id);
