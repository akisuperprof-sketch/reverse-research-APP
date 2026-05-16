"use client";

import React from "react";
import { Radar, AlertTriangle, ShieldCheck, ExternalLink, Minus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockCompetitors = [
  { name: "FollowerCheck", type: "Web", weakness: "広告が多い", strength: 80, ui: 40, pricing: "無料", winnable: "UI刷新と広告なしで勝てる" },
  { name: "InstaPlus", type: "iOS/Android", weakness: "ログインが必要で怖い", strength: 92, ui: 85, pricing: "月額980円", winnable: "ログイン不要の安全性で勝てる" },
  { name: "F-Analyzer", type: "Web", weakness: "日本語非対応", strength: 65, ui: 50, pricing: "無料", winnable: "完全日本語化で圧倒できる" },
];

export function CompetitorRadar() {
  return (
    <Card className="bento-card col-span-full lg:col-span-1">
      <div className="flex items-center gap-2 mb-6">
        <Radar className="w-5 h-5 text-red-500" />
        <h2 className="font-bold text-lg">競合レーダー</h2>
      </div>

      <div className="space-y-4">
        {mockCompetitors.map((comp, i) => (
          <div key={i} className="p-4 rounded-2xl bg-secondary/30 border border-transparent hover:border-red-200 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{comp.name}</span>
                <Badge variant="outline" className="text-[10px] h-4 px-1.5">{comp.type}</Badge>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                強さ {comp.strength}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3 h-3 text-orange-500 mt-1 shrink-0" />
                <p className="text-[11px] text-muted-foreground">
                  <span className="font-bold text-foreground">弱点：</span>{comp.weakness}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                <p className="text-[11px] text-muted-foreground">
                  <span className="font-bold text-foreground">勝てる理由：</span>{comp.winnable}
                </p>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between pt-3 border-t border-dashed border-slate-200">
              <span className="text-[10px] text-muted-foreground">{comp.pricing}</span>
              <button className="text-[10px] text-primary flex items-center gap-1 font-bold">
                サイトを見る <ExternalLink className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="w-full h-1 bg-gradient-to-r from-green-500 via-orange-500 to-red-500 rounded-full opacity-20 mb-2" />
        <p className="text-[10px] text-muted-foreground">参入障壁：<span className="text-orange-500 font-bold">中（スピード勝負）</span></p>
      </div>
    </Card>
  );
}
