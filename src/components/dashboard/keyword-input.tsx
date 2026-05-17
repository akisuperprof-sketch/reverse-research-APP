"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
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
    <Card className="shadow-sm border-slate-200 bg-white p-4 relative overflow-hidden flex-shrink-0">
      <div className="absolute top-[-20px] right-[-20px] opacity-5 pointer-events-none">
        <img src="/rever-var-2.png" alt="Rever" className="w-48 h-48 object-contain" />
      </div>
      
      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-3">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="悩み、ジャンル、キーワードを入力..." 
              className="pl-9 h-11 bg-slate-50 border-slate-200 rounded-lg text-sm focus-visible:ring-blue-500"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !value.trim()}
            className="h-11 px-6 rounded-lg text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
          >
            {isLoading ? "分析中..." : "AI OSを起動して分析開始"}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">クイック入力例:</span>
          <div className="flex flex-wrap gap-1.5">
            {examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => {
                  setValue(ex);
                  onSearch(ex);
                }}
                className="text-[10px] px-2 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-colors text-slate-500 font-medium border border-transparent hover:border-blue-200"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </form>
    </Card>
  );
}
