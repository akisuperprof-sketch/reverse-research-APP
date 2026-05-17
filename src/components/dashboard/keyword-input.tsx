"use client";

import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface KeywordInputCardProps {
  onSearch: (keyword: string) => void;
  isLoading: boolean;
}

const examples = ["インスタ フォロー外した人", "LINE ブロック確認", "TikTok 保存ランキング", "領収書 PDF 変換", "メルカリ 説明文"];

export function KeywordInputCard({ onSearch, isLoading }: KeywordInputCardProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
    }
  };

  return (
    <Card className="bento-card col-span-full lg:col-span-1 border-primary/10 bg-gradient-to-br from-white to-primary/5 relative overflow-hidden">
      <div className="absolute top-[-20px] right-[-20px] opacity-10 pointer-events-none">
        <img src="/rever-var-2.png" alt="Rever" className="w-48 h-48 object-contain" />
      </div>
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <img src="/rever-icon.png" alt="Rever Icon" className="w-6 h-6 rounded-md shadow-sm border border-gray-200" />
        <h2 className="font-bold text-lg">キーワード分析</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="悩み、ジャンル、キーワードを入力..." 
            className="pl-10 h-12 bg-white/50 border-primary/10 rounded-2xl text-base"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading || !value.trim()}
          className="w-full h-12 rounded-2xl text-base font-bold gap-2 shadow-lg shadow-primary/20"
        >
          {isLoading ? "分析中..." : "AI OSを起動して分析開始"}
        </Button>
      </form>

      <div className="mt-6">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">クイック入力例</p>
        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => {
                setValue(ex);
                onSearch(ex);
              }}
              className="text-xs px-3 py-1.5 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
            >
              {ex}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
