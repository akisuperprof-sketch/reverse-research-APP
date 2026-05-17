"use client";

import React from "react";
import { Lightbulb, Coins, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppIdea } from "@/types";

interface AppIdeaBoardProps {
  ideas: AppIdea[];
}

export function AppIdeaBoard({ ideas }: AppIdeaBoardProps) {
  const displayIdeas = ideas.slice(0, 2); // Show top 2 to save space

  return (
    <Card className="shadow-sm border-slate-200 bg-white p-4 flex flex-col overflow-hidden h-1/2">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-amber-500" />
        <h2 className="font-bold text-sm text-slate-800">MVP生成ボード</h2>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {displayIdeas.map((idea, i) => (
          <div 
            key={i} 
            className="p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-amber-200 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-xs group-hover:text-amber-600 transition-colors line-clamp-1">{idea.name}</h3>
                <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{idea.description}</p>
              </div>
              <Badge className="bg-amber-100 text-amber-700 border-none text-[9px] px-1.5 py-0">
                勝率 {idea.winScore}%
              </Badge>
            </div>

            <div className="flex items-center gap-3 text-[9px] text-slate-400">
              <span className="flex items-center gap-1"><Coins className="w-3 h-3" /> {idea.monetization}</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {idea.difficulty}</span>
            </div>
          </div>
        ))}
        {ideas.length === 0 && (
          <div className="h-full flex items-center justify-center text-slate-400 text-xs">
            分析するとアプリ案が生成されます
          </div>
        )}
      </div>
    </Card>
  );
}
