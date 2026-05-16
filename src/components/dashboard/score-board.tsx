"use client";

import React from "react";
import { Award, Zap, ShieldCheck, DollarSign, Hammer, Search, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ScoreBoardProps {
  scores: {
    total: number;
    demand: number;
    pain: number;
    urgency: number;
    monetization: number;
    development: number;
    seo: number;
    risk: number;
  };
}

export function ScoreBoard({ scores }: ScoreBoardProps) {
  const getJudgment = (score: number) => {
    if (score >= 90) return { label: "即MVP作成", color: "text-green-600", bg: "bg-green-100" };
    if (score >= 75) return { label: "小さく検証", color: "text-blue-600", bg: "bg-blue-100" };
    if (score >= 60) return { label: "保留", color: "text-orange-600", bg: "bg-orange-100" };
    return { label: "作らない", color: "text-red-600", bg: "bg-red-100" };
  };

  const judgment = getJudgment(scores.total);

  const items = [
    { label: "検索需要", value: scores.demand, icon: Search },
    { label: "悩みの強さ", value: scores.pain, icon: AlertCircle },
    { label: "緊急度", value: scores.urgency, icon: Zap },
    { label: "収益性", value: scores.monetization, icon: DollarSign },
    { label: "作りやすさ", value: scores.development, icon: Hammer },
    { label: "リスク低さ", value: scores.risk, icon: ShieldCheck },
  ];

  return (
    <Card className="bento-card col-span-full lg:col-span-1 border-primary/5">
      <div className="flex items-center gap-2 mb-6">
        <Award className="w-5 h-5 text-yellow-500" />
        <h2 className="font-bold text-lg">悩みの強さ＆収益性スコア</h2>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative flex items-center justify-center">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              className="text-secondary"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray={364.4}
              strokeDashoffset={364.4 * (1 - scores.total / 100)}
              strokeLinecap="round"
              className={cn("transition-all duration-1000", judgment.color.replace("text-", "stroke-"))}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className={cn("text-4xl font-black", judgment.color)}>{scores.total}</span>
            <span className="text-[10px] text-muted-foreground font-bold">SCORE</span>
          </div>
        </div>
        <div className={cn("mt-4 px-4 py-1 rounded-full text-xs font-bold", judgment.bg, judgment.color)}>
          判定：{judgment.label}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <item.icon className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground">{item.label}</span>
              </div>
              <span className="text-xs font-bold">{item.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary/60 transition-all duration-1000"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
