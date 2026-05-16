"use client";

import React, { useState } from "react";
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

const mockInitialResult: AnalysisResult = {
  keyword: "インスタ フォロー外した人",
  score: 87,
  demandScore: 92,
  painScore: 88,
  urgencyScore: 85,
  monetizationScore: 75,
  developmentScore: 95,
  relatedKeywords: [
    { text: "インスタ フォロー外した人 わかるアプリ", intent: "解決策探し", demand: "高", difficulty: "中" },
    { text: "インスタ フォロー解除 チェック", intent: "今すぐ買う", demand: "高", difficulty: "低" },
    { text: "インスタ フォローチェック 無料", intent: "解決策探し", demand: "中", difficulty: "低" },
    { text: "フォロー外した人 見つけ方", intent: "問題認知", demand: "高", difficulty: "低" },
    { text: "インスタ 相互フォロー チェック", intent: "選択肢比較", demand: "中", difficulty: "中" },
  ],
  intentStats: {
    "未認知": 1,
    "問題認知": 3,
    "解決策探し": 6,
    "選択肢比較": 4,
    "今すぐ買う": 2,
  },
  appIdeas: [
    { 
      name: "InstaTrack Lite", 
      description: "フォロワーリストを貼るだけで差分を確認できるシンプルツール", 
      targetUser: "フォロワーの増減が気になる一般ユーザー",
      features: ["テキスト比較", "ログイン不要", "履歴保存"],
      difficulty: "低",
      days: "1-2日",
      monetization: "広告/投げ銭",
      winScore: 91
    },
    { 
      name: "Follower Analyzer Pro", 
      description: "複数アカウント対応、推移グラフ付きの詳細分析ツール", 
      targetUser: "インフルエンサー、店舗アカウント",
      features: ["グラフ表示", "複数垢", "エクスポート"],
      difficulty: "中",
      days: "3-5日",
      monetization: "サブスク",
      winScore: 84
    },
  ]
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(mockInitialResult);

  const handleSearch = (keyword: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        ...mockInitialResult,
        keyword,
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-8 bg-[#F9FAFB]">
          <div className="max-w-[1600px] mx-auto space-y-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-black tracking-tight">ダッシュボード</h1>
              <p className="text-muted-foreground text-sm">
                現在のプロジェクト: <span className="font-bold text-foreground">"{result.keyword}"</span>
              </p>
            </div>

            {/* Top Section: Inputs & Maps */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <KeywordInputCard onSearch={handleSearch} isLoading={isLoading} />
              <SuggestKeywordCard keywords={result.relatedKeywords} />
              <IntentStageMap stats={result.intentStats} />
            </div>

            {/* Middle Section: Scores & Ideas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <ScoreBoard scores={{
                total: result.score,
                demand: result.demandScore,
                pain: result.painScore,
                urgency: result.urgencyScore,
                monetization: result.monetizationScore,
                development: result.developmentScore,
                seo: 85,
                risk: 90
              }} />
              <AppIdeaBoard ideas={result.appIdeas} />
              <CompetitorRadar />
            </div>

            {/* Lower Section: Specs & Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SpecGenerator />
              <SeoVideoPackCard />
              <RevenueSimulationCard />
            </div>

            {/* Bottom Section: Launch Plan */}
            <div className="grid grid-cols-1 gap-6 pb-8">
              <LaunchPlanCard />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
