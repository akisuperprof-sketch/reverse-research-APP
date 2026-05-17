"use client";

import React from "react";
import { ListTree, Flame, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Keyword } from "@/types";
import { cn } from "@/lib/utils";

interface SuggestKeywordCardProps {
  keywords: Keyword[];
}

export function SuggestKeywordCard({ keywords }: SuggestKeywordCardProps) {
  // If no keywords, fallback to some mock tags just for visual structure (or show a beautiful empty state)
  const displayKeywords = keywords.length > 0 ? keywords : [
    { text: "入力待ち...", intent: "未検索", demand: "低", difficulty: "低" },
    { text: "入力待ち...", intent: "未検索", demand: "低", difficulty: "低" }
  ];

  return (
    <Card className="col-span-full lg:col-span-1 shadow-sm border-slate-200 bg-white overflow-hidden p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-slate-800">
          <ListTree className="w-4 h-4 text-indigo-500" />
          <h2 className="font-bold text-sm">関連キーワードクラウド</h2>
        </div>
        <span className="text-xs font-bold text-slate-400">
          {keywords.length}件
        </span>
      </div>

      <div className="flex-1 flex flex-wrap content-start gap-2 overflow-y-auto pr-2 pb-2">
        {displayKeywords.map((kw, i) => {
          // Determine color based on intent or demand
          const isHighPain = kw.demand === "高" || kw.intent === "今すぐ買う" || kw.intent === "解決策探し";
          const colorClass = isHighPain 
            ? "bg-red-50 text-red-700 border-red-200"
            : kw.demand === "中"
            ? "bg-amber-50 text-amber-700 border-amber-200"
            : "bg-slate-50 text-slate-600 border-slate-200";

          return (
            <div 
              key={i}
              className={cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors hover:shadow-sm cursor-default",
                colorClass
              )}
            >
              {isHighPain ? <Flame className="w-3 h-3 text-red-500" /> : <Activity className="w-3 h-3 opacity-50" />}
              {kw.text}
              <span className="text-[9px] bg-white/50 px-1 rounded-sm ml-1 opacity-80">{kw.intent}</span>
            </div>
          )
        })}
      </div>
    </Card>
  );
}
