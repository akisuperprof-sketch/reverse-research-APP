"use client";

import React from "react";
import { ListTree, Flame, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Keyword } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SuggestKeywordCardProps {
  keywords: Keyword[];
}

export function SuggestKeywordCard({ keywords }: SuggestKeywordCardProps) {
  const displayKeywords = keywords.length > 0 ? keywords : [
    { text: "入力待ち...", intent: "未検索", demand: "低", difficulty: "低" },
    { text: "入力待ち...", intent: "未検索", demand: "低", difficulty: "低" }
  ];

  return (
    <Card className="col-span-full lg:col-span-1 shadow-sm border-slate-200 bg-white overflow-hidden p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-800">
          <ListTree className="w-4 h-4 text-indigo-500" />
          <h2 className="font-bold text-sm">Pain Heatmap (関連タグ)</h2>
        </div>
        <span className="text-xs font-bold text-slate-400">
          {keywords.length}件
        </span>
      </div>

      <div className="flex-1 flex flex-wrap content-start gap-2 overflow-y-auto pr-2 pb-2">
        <AnimatePresence>
          {displayKeywords.map((kw, i) => {
            const isCriticalPain = kw.demand === "高" || kw.intent === "今すぐ買う";
            const isHighPain = kw.intent === "解決策探し";
            const colorClass = isCriticalPain 
              ? "bg-red-500 text-white border-red-600 shadow-md shadow-red-500/20"
              : isHighPain
              ? "bg-orange-500 text-white border-orange-600 shadow-sm shadow-orange-500/20"
              : kw.demand === "中"
              ? "bg-amber-50 text-amber-700 border-amber-200"
              : "bg-slate-50 text-slate-600 border-slate-200";

            return (
              <motion.div 
                key={kw.text + i}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-default",
                  colorClass
                )}
              >
                {(isCriticalPain || isHighPain) ? <Flame className={cn("w-3 h-3", isCriticalPain || isHighPain ? "text-white" : "text-red-500")} /> : <Activity className="w-3 h-3 opacity-50" />}
                {kw.text}
                <span className={cn(
                  "text-[9px] px-1 rounded-sm ml-1 opacity-90",
                  (isCriticalPain || isHighPain) ? "bg-black/20" : "bg-white/50"
                )}>
                  {kw.intent}
                </span>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </Card>
  );
}
