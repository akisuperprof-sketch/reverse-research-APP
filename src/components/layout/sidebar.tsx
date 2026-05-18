"use client";

import React, { useState } from "react";
import { LayoutDashboard, Compass, GitMerge, Lightbulb, Radar, Zap, TrendingUp, Rocket, Database, Settings, Search, PlusCircle, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "ダッシュボード", active: true },
  { icon: Compass, label: "キーワードハンター", active: false },
  { icon: Search, label: "深い感情分析", active: false },
  { icon: GitMerge, label: "検索連鎖 (Intent)", active: false },
  { icon: Lightbulb, label: "MVP生成ボード", active: false },
  { icon: Radar, label: "競合レーダー", disabled: true },
  { icon: Zap, label: "SEO動画パック", disabled: true },
  { icon: TrendingUp, label: "収益予測", disabled: true },
  { icon: Rocket, label: "ローンチ管理", disabled: true },
  { icon: Database, label: "データベース", disabled: true },
  { icon: Settings, label: "設定", disabled: true },
];

interface SidebarProps {
  history?: any[];
  onLoadHistory?: (item: any) => void;
}

export function Sidebar({ history = [], onLoadHistory }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute top-0 left-0 h-full z-50 flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 当たり判定＆薄いエッジバー（折りたたみ時） */}
      <div 
        className={cn(
          "h-full w-2 flex flex-col justify-center items-center bg-transparent cursor-e-resize transition-colors duration-300",
          !isHovered && "hover:bg-slate-300/50"
        )}
      >
        {!isHovered && (
          <div className="w-1 h-8 bg-slate-300 rounded-full flex items-center justify-center -ml-1">
            <ChevronRight className="w-3 h-3 text-white opacity-0" />
          </div>
        )}
      </div>

      {/* サイドバー本体 */}
      <aside 
        className={cn(
          "absolute top-0 left-0 h-full w-[240px] border-r border-slate-200 bg-white/95 backdrop-blur-xl flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isHovered ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-5 w-full">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo-rever.png" alt="reverse research" className="w-16 h-16 rounded-xl shadow-sm border border-slate-100 object-cover" />
            <span className="text-lg font-bold tracking-tight text-slate-800 leading-tight">reverse<br/>research</span>
          </div>

          <Button className="w-full justify-start gap-2 rounded-xl mb-2 bg-slate-900 hover:bg-slate-800 text-white shadow-sm" variant="default">
            <PlusCircle className="w-4 h-4" />
            新プロジェクト
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3">
          <nav className="flex flex-col gap-1 pb-4">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    item.active 
                      ? "bg-indigo-50 text-indigo-600 shadow-sm" 
                      : item.disabled
                        ? "text-slate-400 opacity-50 cursor-not-allowed"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                  )}
                >
                  <Icon className={cn("w-4 h-4", item.active ? "text-indigo-600" : "text-slate-400")} />
                  {item.label}
                  {item.disabled && (
                    <span className="ml-auto text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">設定中</span>
                  )}
                </div>
              );
            })}
          </nav>

          {/* History Section */}
          <div className="px-3 pt-6 pb-2">
            <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              保存済み履歴
            </h3>
            <div className="flex flex-col gap-1">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onLoadHistory?.(item)}
                  className="flex items-center gap-2 px-2 py-2 w-full text-left rounded-lg text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                  <span className="truncate flex-1" title={item.keyword}>{item.keyword}</span>
                </button>
              ))}
              {history.length === 0 && (
                <p className="text-xs text-slate-400 pl-2">履歴がありません</p>
              )}
            </div>
          </div>
        </ScrollArea>
      </aside>
    </div>
  );
}
