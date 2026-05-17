"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Activity, Flame, Lightbulb, TrendingUp, GitMerge, HeartPulse } from "lucide-react";

interface ScoreBoardProps {
  score?: number;
  demand?: number;
  pain?: number;
  urgency?: number;
  monetization?: number;
  development?: number;
}

export function ScoreBoard({
  score = 50,
  pain = 50,
}: ScoreBoardProps) {
  
  const metrics = [
    { label: "分析プロジェクト", value: "1", icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "高Painキーワード", value: pain >= 70 ? "発見" : "通常", icon: Flame, color: "text-red-500", bg: "bg-red-50" },
    { label: "MVP候補数", value: "3", icon: Lightbulb, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "予測収益", value: "計算中", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "検索連鎖", value: "アクティブ", icon: GitMerge, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "総合感情強度", value: `${score}`, icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-50" },
  ];

  return (
    <Card className="col-span-full shadow-sm border-slate-200 bg-white overflow-hidden p-3 w-full">
      <div className="flex items-center justify-between gap-2">
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-1 items-center gap-3 px-3 border-r last:border-0 border-slate-100">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.bg}`}>
              <m.icon className={`w-4 h-4 ${m.color}`} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{m.label}</p>
              <p className="text-sm font-bold text-slate-800">{m.value}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
