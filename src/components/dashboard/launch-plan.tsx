"use client";

import React from "react";
import { Rocket, Calendar, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface LaunchPlanCardProps {
  steps?: { day: string; title: string; desc: string }[];
}

export function LaunchPlanCard({ steps: initialSteps }: LaunchPlanCardProps) {
  const displaySteps = initialSteps || [
    { day: "Day 1", title: "MVP開発", desc: "コアロジックと1画面UIの実装" },
    { day: "Day 2", title: "ベータテスト", desc: "友人知人への公開とFB収集" },
    { day: "Day 3", title: "LP公開", desc: "SEO LPのデプロイ" },
    { day: "Day 4", title: "動画1本公開", desc: "問題認知向け動画の投稿" },
    { day: "Day 5", title: "動画2〜3本公開", desc: "解決策・比較動画の投稿" },
    { day: "Day 6", title: "分析・改善", desc: "アクセス解析とUI微調整" },
    { day: "Day 7", title: "正式ローンチ", desc: "SNS全体での拡散開始" },
  ];
  return (
    <Card className="bento-card col-span-full border-primary/20 bg-gradient-to-r from-white to-primary/5">
      <div className="flex items-center gap-2 mb-8">
        <Rocket className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-lg">7日間ローンチプラン</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {displaySteps.map((step, i) => {
          const isCurrent = i === 0; // 簡易的に初日を現在とする
          return (
            <div key={i} className="relative group">
              <div className={cn(
                "p-4 rounded-2xl border flex flex-col h-full transition-all group-hover:shadow-md",
                isCurrent ? "bg-primary text-primary-foreground border-primary" : "bg-white border-slate-100"
              )}>
                <span className={cn(
                  "text-[10px] font-black uppercase mb-1",
                  isCurrent ? "text-primary-foreground/70" : "text-muted-foreground"
                )}>
                  {step.day}
                </span>
                <h3 className="text-sm font-bold mb-2">{step.title}</h3>
                <p className={cn(
                  "text-[10px] leading-relaxed",
                  isCurrent ? "text-primary-foreground/80" : "text-muted-foreground"
                )}>
                  {step.desc}
                </p>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  {isCurrent ? (
                    <Clock className="w-3 h-3 animate-pulse" />
                  ) : (
                    <CheckCircle className="w-3 h-3 text-slate-200" />
                  )}
                  {i < displaySteps.length - 1 && (
                    <ArrowRight className={cn(
                      "w-3 h-3 hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10",
                      isCurrent ? "text-primary" : "text-slate-200"
                    )} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
