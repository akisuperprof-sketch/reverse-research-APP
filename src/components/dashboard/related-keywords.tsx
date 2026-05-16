"use client";

import React from "react";
import { ListTree, TrendingUp, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Keyword } from "@/types";
import { cn } from "@/lib/utils";

interface SuggestKeywordCardProps {
  keywords: Keyword[];
}

export function SuggestKeywordCard({ keywords }: SuggestKeywordCardProps) {
  return (
    <Card className="bento-card col-span-full lg:col-span-1">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ListTree className="w-5 h-5 text-blue-500" />
          <h2 className="font-bold text-lg">関連キーワード</h2>
        </div>
        <Badge variant="secondary" className="rounded-lg">
          {keywords.length}件見つかりました
        </Badge>
      </div>

      <ScrollArea className="h-[280px] pr-4">
        <div className="space-y-3">
          {keywords.map((kw, i) => (
            <div 
              key={i}
              className="flex items-center justify-between p-3 rounded-2xl bg-secondary/30 border border-transparent hover:border-primary/10 transition-all group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold group-hover:text-primary transition-colors">{kw.text}</span>
                <div className="flex gap-2">
                  <span className="text-[10px] text-muted-foreground bg-white px-1.5 py-0.5 rounded border">
                    {kw.intent}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase">需要</p>
                  <p className={cn(
                    "text-xs font-bold",
                    kw.demand === "高" ? "text-green-600" : kw.demand === "中" ? "text-orange-500" : "text-slate-400"
                  )}>
                    {kw.demand}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase">難易度</p>
                  <p className={cn(
                    "text-xs font-bold",
                    kw.difficulty === "低" ? "text-green-600" : kw.difficulty === "中" ? "text-orange-500" : "text-red-500"
                  )}>
                    {kw.difficulty}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {keywords.length === 0 && (
            <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
              <Search className="w-10 h-10 mb-2 opacity-20" />
              <p className="text-sm">キーワードを分析すると表示されます</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
