"use client";

import React from "react";
import { Lightbulb, Calendar, Coins, Zap, Trophy, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppIdea } from "@/types";

interface AppIdeaBoardProps {
  ideas: AppIdea[];
}

export function AppIdeaBoard({ ideas }: AppIdeaBoardProps) {
  return (
    <Card className="bento-card col-span-full lg:col-span-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <h2 className="font-bold text-lg">アプリ案ボード</h2>
        </div>
      </div>

      <div className="space-y-4">
        {ideas.map((idea, i) => (
          <div 
            key={i} 
            className="p-5 rounded-2xl bg-gradient-to-br from-white to-secondary/30 border border-secondary hover:border-primary/20 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-base group-hover:text-primary transition-colors">{idea.name}</h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{idea.description}</p>
              </div>
              <Badge className="bg-primary/10 text-primary border-none text-[10px] px-2 font-black">
                勝率 {idea.winScore}%
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="flex flex-col items-center p-2 rounded-xl bg-white/50 border border-slate-100">
                <Calendar className="w-3 h-3 text-muted-foreground mb-1" />
                <span className="text-[10px] text-muted-foreground">開発日数</span>
                <span className="text-[10px] font-bold">{idea.days}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-white/50 border border-slate-100">
                <Coins className="w-3 h-3 text-muted-foreground mb-1" />
                <span className="text-[10px] text-muted-foreground">モデル</span>
                <span className="text-[10px] font-bold">{idea.monetization}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-xl bg-white/50 border border-slate-100">
                <Zap className="w-3 h-3 text-muted-foreground mb-1" />
                <span className="text-[10px] text-muted-foreground">難易度</span>
                <span className="text-[10px] font-bold">{idea.difficulty}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px]">
              <div className="flex -space-x-1">
                {idea.features.slice(0, 3).map((f, idx) => (
                  <div key={idx} className="bg-slate-100 border border-white px-2 py-0.5 rounded-full text-muted-foreground">
                    {f}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1 text-primary font-bold">
                詳細 <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
        {ideas.length === 0 && (
          <div className="h-48 flex items-center justify-center text-muted-foreground italic text-sm">
            分析するとアプリ案が生成されます
          </div>
        )}
      </div>
    </Card>
  );
}
