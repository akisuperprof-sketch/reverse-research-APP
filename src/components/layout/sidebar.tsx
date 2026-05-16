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
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const menuItems = [
  { icon: LayoutDashboard, label: "ダッシュボード", active: true },
  { icon: Search, label: "キーワードハンター" },
  { icon: Map, label: "意図分析" },
  { icon: Radar, label: "競合レーダー" },
  { icon: Lightbulb, label: "アプリ案ボード" },
  { icon: FileText, label: "MVP生成" },
  { icon: Zap, label: "SEO/動画パック" },
  { icon: TrendingUp, label: "収益予測" },
  { icon: Rocket, label: "ローンチ管理" },
  { icon: Database, label: "データベース" },
  { icon: Settings, label: "設定" },
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-card flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="text-primary-foreground w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight">IntentOS</span>
        </div>

        <Button className="w-full justify-start gap-2 rounded-xl mb-4" variant="default">
          <PlusCircle className="w-4 h-4" />
          新プロジェクト
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                item.active 
                  ? "bg-primary/10 text-primary" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <Separator className="my-6 mx-3" />

        <div className="px-3 pb-4">
          <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            保存済みプロジェクト
          </h3>
          <div className="space-y-1">
            {["インスタ フォロー外し", "LINE ブロック確認", "PDF 変換ツール"].map((proj) => (
              <button
                key={proj}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors truncate"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                {proj}
              </button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto">
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
          <p className="text-xs font-semibold text-primary mb-1">PRO PLAN</p>
          <p className="text-xs text-muted-foreground mb-3">無制限の分析と生成をアンロック</p>
          <Button size="sm" className="w-full rounded-lg text-xs h-8">
            アップグレード
          </Button>
        </div>
      </div>
    </aside>
  );
}
