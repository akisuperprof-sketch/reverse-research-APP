"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Search, 
  Map, 
  Radar, 
  Lightbulb, 
  FileText, 
  Rocket, 
  TrendingUp, 
  Settings, 
  Database,
  PlusCircle,
  Zap,
  Activity,
  GitMerge,
  HeartPulse
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { icon: LayoutDashboard, label: "ダッシュボード", active: true },
  { icon: Search, label: "キーワードハンター", active: false },
  { icon: HeartPulse, label: "深い感情分析", active: false },
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
  return (
    <aside className="w-[240px] flex-shrink-0 border-r border-slate-200 bg-white flex flex-col h-full z-10">
      <div className="p-5">
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
        <div className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.label} className="relative group">
              <button
                disabled={item.disabled}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  item.active 
                    ? "bg-blue-50 text-blue-700" 
                    : item.disabled
                      ? "text-slate-400 opacity-60 cursor-not-allowed"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon className={cn("w-4 h-4", item.active ? "text-blue-600" : item.disabled ? "text-slate-400" : "text-slate-500")} />
                {item.label}
              </button>
              {item.disabled && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-100 text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded-sm opacity-80 pointer-events-none">
                  設定中
                </span>
              )}
            </div>
          ))}
        </div>

        <Separator className="my-5 mx-3 w-auto bg-slate-100" />

        <div className="px-3 pb-4">
          <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            保存済み履歴
          </h3>
          <div className="space-y-1">
            {history.length > 0 ? (
              history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onLoadHistory?.(item)}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors truncate"
                >
                  <Search className="w-3 h-3 inline-block mr-2 opacity-50" />
                  {item.keyword}
                </button>
              ))
            ) : (
              <p className="text-xs text-slate-400 px-3 py-2">分析履歴がありません</p>
            )}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
