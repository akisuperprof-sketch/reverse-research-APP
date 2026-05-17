"use client";

import React from "react";
import { RadioTower, Sparkles, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SuggestStreamCardProps {
  suggestions?: any[];
}

export function SuggestStreamCard({ suggestions = [] }: SuggestStreamCardProps) {
  const displaySuggestions = suggestions.length > 0 ? suggestions.slice(0, 5) : [
    { suggestText: "関連キーワード1", emotion: "不明", painScore: 0, opportunityScore: 0 },
    { suggestText: "関連キーワード2", emotion: "不明", painScore: 0, opportunityScore: 0 },
  ];

  return (
    <Card className="shadow-sm border-slate-200 bg-white p-4 flex flex-col overflow-hidden h-1/2 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <RadioTower className="w-4 h-4 text-purple-500" />
        <h2 className="font-bold text-sm text-slate-800">Suggest Stream</h2>
        <span className="ml-auto flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
        </span>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto pr-1">
        {displaySuggestions.map((s, i) => (
          <div key={i} className="flex flex-col gap-1.5 p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:bg-purple-50 transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">{s.suggestText}</span>
              <span className="text-[9px] bg-white border px-1.5 py-0.5 rounded text-slate-500">{s.emotion}</span>
            </div>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-red-500 font-medium">
                <AlertTriangle className="w-3 h-3" /> Pain {s.painScore}
              </span>
              <span className="flex items-center gap-1 text-emerald-500 font-medium">
                <Sparkles className="w-3 h-3" /> Opp {s.opportunityScore}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
