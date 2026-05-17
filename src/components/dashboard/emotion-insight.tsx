import React from "react";
import { Card } from "@/components/ui/card";
import { HeartPulse, Flame, Search, AlertCircle, Lightbulb, TrendingUp } from "lucide-react";
import { AnalysisResult } from "@/types";
import { Progress } from "@/components/ui/progress";

interface EmotionDeepInsightCardProps {
  data: AnalysisResult;
}

export function EmotionDeepInsightCard({ data }: EmotionDeepInsightCardProps) {
  if (!data.emotionReason || data.emotionReason === "検索してください") {
    return (
      <Card className="col-span-full shadow-sm border-slate-200 bg-white p-4 h-full flex items-center justify-center">
        <p className="text-sm text-slate-400">分析を実行すると深い感情データが表示されます。</p>
      </Card>
    );
  }

  return (
    <Card className="col-span-full shadow-sm border-slate-200 bg-white p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <HeartPulse className="w-4 h-4 text-rose-500" />
        <h2 className="font-bold text-sm text-slate-800">深い感情インサイト</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        
        {/* Core Emotion (Red/Orange) */}
        <div className="flex flex-col gap-3">
          <div className="bg-red-50 rounded-lg p-3 border border-red-100 flex-1">
            <div className="flex items-center gap-1.5 mb-1.5 text-red-700 font-bold text-xs">
              <AlertCircle className="w-3 h-3" />
              根本感情 (危険・怒り)
            </div>
            <p className="text-xs text-red-900/80 leading-relaxed line-clamp-3">
              {data.emotionReason}
            </p>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 flex-1">
            <div className="flex items-center gap-1.5 mb-1.5 text-orange-700 font-bold text-xs">
              <Flame className="w-3 h-3" />
              なぜ深い悩みなのか (不安・焦り)
            </div>
            <p className="text-xs text-orange-900/80 leading-relaxed line-clamp-3">
              {data.painReason}
            </p>
          </div>
        </div>

        {/* Purchase & Future (Green/Blue) */}
        <div className="flex flex-col gap-3">
          <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex-1 flex flex-col justify-center gap-2">
            <div className="flex justify-between items-center text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                <TrendingUp className="w-3 h-3" />
                購入直前度
              </div>
              <span className="font-bold text-emerald-900">{data.purchaseIntent}/100</span>
            </div>
            <Progress value={data.purchaseIntent} className="h-1.5 bg-emerald-200" />
            
            <div className="flex justify-between items-center text-xs mt-2">
              <div className="flex items-center gap-1.5 font-bold text-amber-700">
                <Lightbulb className="w-3 h-3" />
                緊急性
              </div>
              <span className="font-bold text-amber-900">{data.urgencyLevel}/100</span>
            </div>
            <Progress value={data.urgencyLevel} className="h-1.5 bg-amber-200" />
          </div>

          <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 flex-1 flex flex-col">
            <div className="flex items-center gap-1.5 mb-2 text-blue-700 font-bold text-xs">
              <Search className="w-3 h-3" />
              次検索予測 (比較・絶望)
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.futureSearches && data.futureSearches.map((kw, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-white text-blue-800 text-[10px] font-bold rounded-md border border-blue-200">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
