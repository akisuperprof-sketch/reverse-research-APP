"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { SystemStatusSidebar } from "@/components/layout/system-status";
import { KeywordInputCard } from "@/components/dashboard/keyword-input";
import { SuggestKeywordCard } from "@/components/dashboard/related-keywords";
import { ScoreBoard } from "@/components/dashboard/score-board";
import { AppIdeaBoard } from "@/components/dashboard/app-idea-board";
import { SuggestStreamCard } from "@/components/dashboard/suggest-stream";
import { SearchChainCard } from "@/components/dashboard/search-chain";
import { EmotionDeepInsightCard } from "@/components/dashboard/emotion-insight";
import { AIBootSequence } from "@/components/dashboard/boot-sequence";
import { AnalysisResult } from "@/types";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";

const mockInitialResult: AnalysisResult = {
  keyword: "未検索",
  score: 0,
  demandScore: 0,
  painScore: 0,
  urgencyScore: 0,
  monetizationScore: 0,
  developmentScore: 0,
  seoScore: 0,
  riskScore: 0,
  scalabilityScore: 0,
  competitionWeakness: "-",
  relatedKeywords: [],
  intentStats: { "未認知": 0, "問題認知": 0, "解決策探し": 0, "選択肢比較": 0, "今すぐ買う": 0 },
  appIdeas: [],
  suggestions: [],
  emotionReason: "検索してください",
  urgencyLevel: 0,
  purchaseIntent: 0,
  futureSearches: [],
  painReason: "検索してください",
  opportunityReason: "検索してください"
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(mockInitialResult);
  const [history, setHistory] = useState<any[]>([]);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
  const [previousKeyword, setPreviousKeyword] = useState<string | null>(null);

  const fetchHistory = async () => {
    const { data } = await supabase
      .from("search_queries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    
    if (data) setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const mapApiData = (data: any, keyword: string, suggestionsData?: any): AnalysisResult => {
    return {
      keyword: data.keyword || keyword,
      score: data.scores?.total || 50,
      demandScore: data.scores?.demand || 50,
      painScore: data.scores?.pain || 50,
      urgencyScore: data.scores?.urgency || 50,
      monetizationScore: data.scores?.monetization || 50,
      developmentScore: data.scores?.development || 50,
      seoScore: data.scores?.seo || 50,
      riskScore: data.scores?.risk || 50,
      scalabilityScore: data.scores?.scalability || 50,
      competitionWeakness: data.searchGapSummary || "調査中",
      relatedKeywords: data.relatedKeywords || [],
      intentStats: data.intentStages || data.intent_stages || { "未認知": 0, "問題認知": 0, "解決策探し": 0, "選択肢比較": 0, "今すぐ買う": 0 },
      appIdeas: data.appIdeas || data.generated_apps || [],
      competitorInsights: data.competitorInsights || [],
      emotionReason: data.emotionReason || data.raw_json?.emotionReason || "",
      urgencyLevel: data.urgencyLevel || data.raw_json?.urgencyLevel || 50,
      purchaseIntent: data.purchaseIntent || data.raw_json?.purchaseIntent || 50,
      futureSearches: data.futureSearches || data.raw_json?.futureSearches || [],
      painReason: data.painReason || data.raw_json?.painReason || "",
      opportunityReason: data.opportunityReason || data.raw_json?.opportunityReason || "",
      mvpSpec: data.mvpSpec || data.generated_specs?.[0]?.content || "",
      seoPack: data.seoPack || data.seo_video_packs?.[0]?.seo_data || { title: "", description: "", h1: "" },
      videoIdeas: data.videoIdeas || data.seo_video_packs?.[0]?.video_ideas || [],
      launchPlan: data.launchPlan || [],
      suggestions: suggestionsData?.suggestions || []
    };
  };

  const handleSearch = async (keyword: string) => {
    setIsLoading(true);
    const toastId = toast.loading(`「${keyword}」を分析中...`);

    try {
      const [resAnalyze, resSuggest] = await Promise.all([
        fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        }),
        fetch("/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword, sessionId, previousKeyword }),
        }).catch(() => null)
      ]);

      if (!resAnalyze.ok) {
        const errorData = await resAnalyze.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "分析に失敗しました");
      }

      const dataAnalyze = await resAnalyze.json();
      let dataSuggest = { suggestions: [] };
      
      if (resSuggest && resSuggest.ok) {
        dataSuggest = await resSuggest.json();
        
        if (dataAnalyze.id && dataSuggest.suggestions?.length > 0) {
          fetch("/api/suggest/link", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ keyword, queryId: dataAnalyze.id, suggestions: dataSuggest.suggestions })
          }).catch(() => {});
        }
      }

      setResult(mapApiData(dataAnalyze, keyword, dataSuggest));
      setPreviousKeyword(keyword);
      toast.success("分析が完了し、Supabaseに保存されました", { id: toastId });
      fetchHistory();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "エラーが発生しました", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = async (item: any) => {
    setIsLoading(true);
    const toastId = toast.loading(`「${item.keyword}」の分析履歴を復元中...`);

    try {
      const [resHistory, resSuggestsDb] = await Promise.all([
        fetch(`/api/history/${item.id}`),
        supabase.from("suggest_keywords").select("*, emotion_scores(*)").eq("query_id", item.id).catch(() => ({ data: null }))
      ]);
      
      if (!resHistory.ok) throw new Error("履歴の取得に失敗しました");

      const data = await resHistory.json();
      
      let suggestions = [];
      if (resSuggestsDb && resSuggestsDb.data) {
         suggestions = resSuggestsDb.data.map((s: any) => ({
            suggestText: s.suggest_text,
            emotion: s.emotion_scores?.[0]?.emotion_category || "調査",
            painScore: s.emotion_scores?.[0]?.pain_score || 50,
            opportunityScore: s.emotion_scores?.[0]?.opportunity_score || 50
         }));
      }

      setResult(mapApiData(data, item.keyword, { suggestions }));
      setPreviousKeyword(item.keyword);
      toast.success("履歴を復元しました", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "エラーが発生しました", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] font-sans">
      <Sidebar history={history} onLoadHistory={loadFromHistory} />
      
      <div className="flex-1 flex flex-col min-w-0 p-4 gap-4 h-full overflow-hidden">
        <KeywordInputCard onSearch={handleSearch} isLoading={isLoading} />
        <ScoreBoard score={result.score} pain={result.painScore} />
        
        <div className="flex-1 min-h-0 grid grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col gap-4 min-h-0 h-full">
            <div className="h-1/2 min-h-0">
              <EmotionDeepInsightCard data={result} />
            </div>
            <div className="h-1/2 min-h-0">
              <SuggestKeywordCard keywords={result.relatedKeywords} />
            </div>
          </div>

          <div className="col-span-1 flex flex-col gap-4 min-h-0 h-full">
            <SearchChainCard sessionId={sessionId} />
          </div>

          <div className="col-span-1 flex flex-col gap-4 min-h-0 h-full">
            <AppIdeaBoard ideas={result.appIdeas} />
            <SuggestStreamCard suggestions={result.suggestions} />
          </div>
        </div>
      </div>

      <AIBootSequence isLoading={isLoading} keyword={previousKeyword || "新規解析"} />
      <SystemStatusSidebar result={result} />
    </div>
  );
}
