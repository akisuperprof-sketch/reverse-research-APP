import React from "react";
import { Card } from "@/components/ui/card";
import { HeartPulse, Flame, Search, AlertCircle, Lightbulb, TrendingUp, Grid3X3 } from "lucide-react";
import { AnalysisResult } from "@/types";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

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

  // Intent Heatmap Generator (Mock data based on scores to show density)
  const generateHeatmapGrid = () => {
    const grid = [];
    for (let i = 0; i < 35; i++) {
      const intensity = Math.random();
      let colorClass = "bg-slate-100";
      
      if (data.painScore > 70) {
        if (intensity > 0.8) colorClass = "bg-red-500";
        else if (intensity > 0.5) colorClass = "bg-red-400";
        else if (intensity > 0.2) colorClass = "bg-red-200";
      } else if (data.urgencyLevel > 70) {
        if (intensity > 0.8) colorClass = "bg-amber-500";
        else if (intensity > 0.5) colorClass = "bg-amber-400";
        else if (intensity > 0.2) colorClass = "bg-amber-200";
      } else {
        if (intensity > 0.8) colorClass = "bg-blue-500";
        else if (intensity > 0.5) colorClass = "bg-blue-400";
        else if (intensity > 0.2) colorClass = "bg-blue-200";
      }
      
      grid.push(
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: i * 0.02 }}
          className={`w-full h-full rounded-sm ${colorClass}`}
        />
      );
    }
    return grid;
  };

  return (
    <Card className="col-span-full shadow-sm border-slate-200 bg-white p-4 h-full flex flex-col overflow-hidden relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-rose-500" />
          <h2 className="font-bold text-sm text-slate-800">深い感情インサイト</h2>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto pr-1 hide-scrollbar">
        
        {/* Core Emotion & Intent Heatmap */}
        <div className="flex flex-col gap-3">
          <div className="bg-red-50 rounded-lg p-3 border border-red-100 flex-1 relative overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1.5 text-red-700 font-bold text-xs relative z-10">
              <AlertCircle className="w-3 h-3" />
              根本感情 (危険・怒り)
            </div>
            <p className="text-xs text-red-900/80 leading-relaxed line-clamp-2 relative z-10">
              {data.emotionReason}
            </p>
          </div>
          
          <div className="bg-slate-900 rounded-lg p-3 border border-slate-800 flex flex-col gap-2 relative">
            <div className="flex items-center justify-between text-slate-300 font-bold text-[10px] uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Grid3X3 className="w-3 h-3 text-indigo-400" /> Intent Heatmap</span>
              <span>Density</span>
            </div>
            <div className="grid grid-cols-7 gap-1 h-12">
              {generateHeatmapGrid()}
            </div>
          </div>
        </div>

        {/* Purchase & Future Prediction */}
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
            
            <div className="flex justify-between items-center text-xs mt-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-700">
                <Lightbulb className="w-3 h-3" />
                緊急性
              </div>
              <span className="font-bold text-amber-900">{data.urgencyLevel}/100</span>
            </div>
            <Progress value={data.urgencyLevel} className="h-1.5 bg-amber-200" />
          </div>

          <div className="bg-blue-50/50 rounded-lg p-3 border border-blue-100 flex-1 flex flex-col relative overflow-hidden">
            <div className="flex items-center gap-1.5 mb-2 text-blue-700 font-bold text-xs relative z-10">
              <Search className="w-3 h-3" />
              Trend Prediction (未来予測)
            </div>
            
            <div className="flex flex-col gap-2 relative z-10">
              <div className="flex flex-wrap gap-1.5">
                {[
                  { text: "3日後急増予測", color: "bg-red-500 text-white" },
                  { text: "TikTok流入増", color: "bg-black text-white" },
                  { text: "女性流入予測", color: "bg-pink-500 text-white" },
                  { text: "検索増殖率 180%", color: "bg-blue-500 text-white" },
                ].map((badge, idx) => (
                  <motion.span 
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`px-2 py-0.5 text-[9px] font-bold rounded shadow-sm ${badge.color}`}
                  >
                    {badge.text}
                  </motion.span>
                ))}
              </div>

              <div className="w-full h-px bg-blue-100 my-1" />

              <div className="flex flex-wrap gap-1.5">
                <span className="text-[9px] text-blue-600 font-bold w-full">次検索予測ネットワーク:</span>
                {data.futureSearches && data.futureSearches.map((kw, idx) => (
                  <motion.span 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 + 0.4 }}
                    className="px-1.5 py-0.5 bg-white text-blue-800 text-[9px] font-bold rounded-md border border-blue-200 shadow-sm"
                  >
                    {kw}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
