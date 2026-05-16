"use client";

import React from "react";
import { Rocket, Calendar, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const steps = [
  { day: "Day 1", title: "MVP開発", status: "current", desc: "コアロジックと1画面UIの実装" },
  { day: "Day 2", title: "ベータテスト", status: "upcoming", desc: "友人知人への公開とFB収集" },
  { day: "Day 3", title: "LP公開", status: "upcoming", desc: "SEO LPのデプロイ" },
  { day: "Day 4", title: "動画1本公開", status: "upcoming", desc: "問題認知向け動画の投稿" },
  { day: "Day 5", title: "動画2〜3本公開", status: "upcoming", desc: "解決策・比較動画の投稿" },
  { day: "Day 6", title: "分析・改善", status: "upcoming", desc: "アクセス解析とUI微調整" },
  { day: "Day 7", title: "正式ローンチ", status: "upcoming", desc: "SNS全体での拡散開始" },
];

export function LaunchPlanCard() {
  return (
    <Card className="bento-card col-span-full border-primary/20 bg-gradient-to-r from-white to-primary/5">
      <div className="flex items-center gap-2 mb-8">
        <Rocket className="w-5 h-5 text-primary" />
        <h2 className="font-bold text-lg">7日間ローンチプラン</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {steps.map((step, i) => (
          <div key={i} className="relative group">
            <div className={cn(
              "p-4 rounded-2xl border flex flex-col h-full transition-all group-hover:shadow-md",
              step.status === "current" ? "bg-primary text-primary-foreground border-primary" : "bg-white border-slate-100"
            )}>
              <span className={cn(
                "text-[10px] font-black uppercase mb-1",
                step.status === "current" ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {step.day}
              </span>
              <h3 className="text-sm font-bold mb-2">{step.title}</h3>
              <p className={cn(
                "text-[10px] leading-relaxed",
                step.status === "current" ? "text-primary-foreground/80" : "text-muted-foreground"
              )}>
                {step.desc}
              </p>
              
              <div className="mt-auto pt-4 flex items-center justify-between">
                {step.status === "current" ? (
                  <Clock className="w-3 h-3 animate-pulse" />
                ) : (
                  <CheckCircle className="w-3 h-3 text-slate-200" />
                )}
                {i < steps.length - 1 && (
                  <ArrowRight className={cn(
                    "w-3 h-3 hidden md:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-10",
                    step.status === "current" ? "text-primary" : "text-slate-200"
                  )} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
