"use client";

import React from "react";
import { Video, Globe, Megaphone, CheckCircle, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SeoVideoPackCard() {
  const seoItems = [
    { label: "SEOタイトル", value: "インスタでフォロー外した人を確認する方法｜ログイン不要の無料チェック" },
    { label: "Meta Description", value: "インスタのフォロワーが減った？誰がフォローを外したか特定する最新の確認方法を解説。アプリ連携なしで安全に、無料でチェックできる神ツールも紹介。" },
    { label: "H1タグ", value: "インスタでフォロー外した人を特定する方法【2024年最新版】" },
  ];

  const videos = [
    { title: "インスタのフォロー外しを確認できる神アプリ", type: "問題認知" },
    { title: "フォロー外した人を一覧で見る方法", type: "解決策探し" },
    { title: "フォロー解除確認アプリ5選", type: "比較" },
    { title: "即効！フォロー外し検出アプリを使ってみた", type: "今すぐ使う" },
  ];

  return (
    <Card className="bento-card col-span-full lg:col-span-1">
      <div className="flex items-center gap-2 mb-6">
        <Megaphone className="w-5 h-5 text-green-500" />
        <h2 className="font-bold text-lg">SEO / 動画パック</h2>
      </div>

      <Tabs defaultValue="seo" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 rounded-xl bg-secondary/50 p-1">
          <TabsTrigger value="seo" className="rounded-lg text-xs gap-2">
            <Globe className="w-3 h-3" /> SEOセット
          </TabsTrigger>
            <TabsTrigger value="video" className="rounded-lg text-xs gap-2">
            <Video className="w-3 h-3" /> 動画構成
          </TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="space-y-4">
          {seoItems.map((item, i) => (
            <div key={i} className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</label>
              <div className="p-3 bg-secondary/30 rounded-xl text-xs border border-primary/5 group relative cursor-pointer">
                <span className="line-clamp-2">{item.value}</span>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">コピーする</span>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="video" className="space-y-3">
          {videos.map((vid, i) => (
            <div key={i} className="p-3 bg-red-50/50 border border-red-100 rounded-xl group cursor-pointer transition-all hover:bg-red-50">
              <div className="flex justify-between items-start mb-1">
                <Badge variant="outline" className="text-[8px] h-4 px-1.5 border-red-200 text-red-500 bg-white">
                  {vid.type}向け
                </Badge>
                <Video className="w-3 h-3 text-red-400 opacity-0 group-hover:opacity-100" />
              </div>
              <p className="text-xs font-bold leading-tight group-hover:text-red-600 transition-colors">{vid.title}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-6 pt-4 border-t border-dashed">
        <button className="w-full flex items-center justify-between text-xs font-bold text-primary hover:underline">
          <span>LP・台本全文を生成する</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </Card>
  );
}
