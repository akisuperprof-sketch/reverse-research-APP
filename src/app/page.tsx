"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { KeywordInputCard } from "@/components/dashboard/keyword-input";
import { SuggestKeywordCard } from "@/components/dashboard/related-keywords";
import { IntentStageMap } from "@/components/dashboard/intent-map";
import { ScoreBoard } from "@/components/dashboard/score-board";
import { AppIdeaBoard } from "@/components/dashboard/app-idea-board";
import { CompetitorRadar } from "@/components/dashboard/competitor-radar";
import { SpecGenerator } from "@/components/dashboard/spec-generator";
import { SeoVideoPackCard } from "@/components/dashboard/seo-video-pack";
import { RevenueSimulationCard } from "@/components/dashboard/revenue-simulation";
import { LaunchPlanCard } from "@/components/dashboard/launch-plan";
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
  appIdeas: []
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(mockInitialResult);
  const [history, setHistory] = useState<any[]>([]);

  // 履歴の取得
  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from("search_queries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);
    
    if (data) setHistory(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const mapApiData = (data: any, keyword: string): AnalysisResult => {
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
      mvpSpec: data.mvpSpec || data.generated_specs?.[0]?.content || "",
      seoPack: data.seoPack || data.seo_video_packs?.[0]?.seo_data || { title: "", description: "", h1: "" },
      videoIdeas: data.videoIdeas || data.seo_video_packs?.[0]?.video_ideas || [],
      launchPlan: data.launchPlan || []
    };
  };

  const handleSearch = async (keyword: string) => {
    setIsLoading(true);
    const toastId = toast.loading(`「${keyword}」を分析中...`);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        throw new Error(errorData.error || errorData.message || "分析に失敗しました");
      }

      const data = await res.json();
      setResult(mapApiData(data, keyword));
      toast.success("分析が完了し、Supabaseに保存されました", { id: toastId });
      fetchHistory(); // 履歴を更新
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
      const res = await fetch(`/api/history/${item.id}`);
      if (!res.ok) throw new Error("履歴の取得に失敗しました");

      const data = await res.json();
      setResult(mapApiData(data, item.keyword));
      toast.success("履歴を復元しました", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "エラーが発生しました", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar history={history} onLoadHistory={loadFromHistory} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KeywordInputCard onSearch={handleSearch} isLoading={isLoading} />
              <SuggestKeywordCard keywords={result.relatedKeywords} />
              <IntentStageMap stats={result.intentStats} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ScoreBoard
                score={result.score}
                demand={result.demandScore}
                pain={result.painScore}
                urgency={result.urgencyScore}
                monetization={result.monetizationScore}
                development={result.developmentScore}
              />
              <AppIdeaBoard ideas={result.appIdeas} />
              <CompetitorRadar insights={result.competitorInsights} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SpecGenerator content={result.mvpSpec} />
              <div className="space-y-6">
                <SeoVideoPackCard 
                  seoData={result.seoPack} 
                  videoIdeas={result.videoIdeas} 
                />
                <RevenueSimulationCard />
              </div>
            </div>

            <LaunchPlanCard steps={result.launchPlan} />
          </div>
        </main>
      </div>
    </div>
  );
}
