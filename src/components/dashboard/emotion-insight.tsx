import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Brain, HeartPulse, Flame, Search, AlertCircle, Lightbulb } from "lucide-react";
import { AnalysisResult } from "@/types";
import { Progress } from "@/components/ui/progress";

interface EmotionDeepInsightCardProps {
  data: AnalysisResult;
}

export function EmotionDeepInsightCard({ data }: EmotionDeepInsightCardProps) {
  // Hide if no data yet (e.g. before search)
  if (!data.emotionReason || data.emotionReason === "検索してください") {
    return null;
  }

  return (
    <Card className="col-span-full shadow-sm border-gray-200 bg-white/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3 border-b border-gray-100 bg-gradient-to-r from-ai-purple/5 to-transparent">
        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
          <Brain className="w-5 h-5 text-ai-purple" />
          Deep Emotion Insight
        </CardTitle>
        <CardDescription>検索キーワードの背後にある「人間の深い感情と緊急性」の解析結果</CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Core Emotion & Pain */}
        <div className="space-y-4">
          <div className="bg-red-50/50 rounded-xl p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-2 text-red-700 font-semibold text-sm">
              <HeartPulse className="w-4 h-4" />
              根本感情とその理由 (Emotion)
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              {data.emotionReason}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
              <AlertCircle className="w-4 h-4" />
              なぜ深い悩みなのか (Pain)
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.painReason}
            </p>
          </div>
        </div>

        {/* Urgency & Purchase Intent */}
        <div className="space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 font-medium text-orange-600">
                <Flame className="w-4 h-4" />
                緊急性 (Urgency)
              </div>
              <span className="font-bold text-gray-900">{data.urgencyLevel} / 100</span>
            </div>
            <Progress value={data.urgencyLevel} className="h-2 bg-orange-100" />
            <p className="text-xs text-gray-500 text-right">スコアが高いほど今すぐ解決したい課題</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2 font-medium text-emerald-600">
                <Lightbulb className="w-4 h-4" />
                購入直前感 (Purchase Intent)
              </div>
              <span className="font-bold text-gray-900">{data.purchaseIntent} / 100</span>
            </div>
            <Progress value={data.purchaseIntent} className="h-2 bg-emerald-100" />
            <p className="text-xs text-gray-500 text-right">スコアが高いほどお金を払う確率が高い</p>
          </div>
        </div>

        {/* Future Searches & Opportunity */}
        <div className="space-y-4">
          <div className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3 text-blue-700 font-semibold text-sm">
              <Search className="w-4 h-4" />
              次に検索しそうな言葉 (Future Search)
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.futureSearches && data.futureSearches.map((kw, idx) => (
                <span key={idx} className="px-2.5 py-1 bg-white text-blue-800 text-xs font-medium rounded-md border border-blue-200">
                  {kw}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-3 border-t border-blue-100 flex gap-3">
              <img src="/rever-var-4.png" alt="Rever Tip" className="w-12 h-12 object-contain" />
              <div>
                <div className="text-xs font-bold text-blue-800 mb-1">リバが教える：ここを狙えば勝てるアプリ。</div>
                <p className="text-xs text-blue-900/80 leading-relaxed font-medium">
                  {data.opportunityReason}
                </p>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
