"use client";

import React from "react";
import { Map, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stages = [
  { id: 1, label: "未認知", color: "bg-slate-200", textColor: "text-slate-600" },
  { id: 2, label: "問題認知", color: "bg-orange-200", textColor: "text-orange-600" },
  { id: 3, label: "解決策探し", color: "bg-blue-200", textColor: "text-blue-600" },
  { id: 4, label: "選択肢比較", color: "bg-indigo-200", textColor: "text-indigo-600" },
  { id: 5, label: "今すぐ買う", color: "bg-green-200", textColor: "text-green-600" },
];

interface IntentStageMapProps {
  stats: Record<string, number>;
}

export function IntentStageMap({ stats }: IntentStageMapProps) {
  const total = Object.values(stats).reduce((a, b) => a + b, 0) || 1;

  return (
    <Card className="bento-card col-span-full lg:col-span-1">
      <div className="flex items-center gap-2 mb-6">
        <Map className="w-5 h-5 text-indigo-500" />
        <h2 className="font-bold text-lg">認識の5段階マップ</h2>
      </div>

      <div className="space-y-5">
        {stages.map((stage) => {
          const count = stats[stage.label] || 0;
          const percentage = Math.round((count / total) * 100);
          
          return (
            <div key={stage.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className={cn("px-2 py-0.5 rounded-full", stage.color, stage.textColor)}>
                  {stage.label}
                </span>
                <span className="text-muted-foreground">{count} キーワード ({percentage}%)</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                  className={cn("h-full transition-all duration-1000", stage.color.replace("-200", "-500"))}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-secondary/30 rounded-2xl border border-dashed border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-primary" />
          <p className="text-xs font-bold text-primary">推奨戦略</p>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {stats["今すぐ買う"] > stats["問題認知"] 
            ? "「今すぐ買う」層が多いため、CVR重視の単機能アプリとLPで即収益化を狙いましょう。" 
            : "「問題認知」層が多いため、まずは悩みを解決する教育的コンテンツとSNS誘導が有効です。"}
        </p>
      </div>
    </Card>
  );
}
