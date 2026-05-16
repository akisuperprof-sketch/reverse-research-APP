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

  const handleSearch = async (keyword: string) => {
    setIsLoading(true);
    const toastId = toast.loading(`「${keyword}」を分析中...`);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword }),
      });

      if (!res.ok) throw new Error("分析に失敗しました");

      const data = await res.json();
      setResult(data);
      toast.success("分析が完了し、Supabaseに保存されました", { id: toastId });
      fetchHistory(); // 履歴を更新
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "エラーが発生しました", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = (item: any) => {
    handleSearch(item.keyword);
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
