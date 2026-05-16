"use client";

import React from "react";
import { FileText, Copy, Download, Zap, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function SpecGenerator() {
  const specMarkdown = `## アプリ概要: InstaTrack Lite
フォロワーリストを貼るだけで差分を確認できるシンプルツール

### 1. 目的
ユーザーが自分のフォロワーリストから、誰がフォローを外したのかを迅速かつ安全（ログイン不要）に特定すること。

### 2. 対象ユーザー
- インスタのフォロワー増減が気になる個人
- アプリ連携を怖がるセキュリティ意識の高い層

### 3. 主要機能
- 前回のフォロワーリスト（テキスト）の貼り付け
- 今回のフォロワーリスト（テキスト）の貼り付け
- 差分分析（フォロー外した人、新しくフォローしてくれた人の抽出）
- 履歴のローカル保存（localStorage）

### 4. UI要件
- Bento GridスタイルのクリーンなUI
- 2つの巨大なテキストエリア
- 比較実行ボタン（1クリック）
- 結果のリスト表示とコピー機能
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(specMarkdown);
  };

  const handleDownload = () => {
    const blob = new Blob([specMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "intent-os-spec.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bento-card col-span-full lg:col-span-2 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-500" />
          <h2 className="font-bold text-lg">MVP仕様書生成</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl gap-2 h-8 text-xs" onClick={handleCopy}>
            <Copy className="w-3.5 h-3.5" />
            コピー
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl gap-2 h-8 text-xs" onClick={handleDownload}>
            <Download className="w-3.5 h-3.5" />
            MD
          </Button>
          <Button size="sm" className="rounded-xl gap-2 h-8 text-xs bg-black hover:bg-zinc-800">
            <Terminal className="w-3.5 h-3.5" />
            Antigravityで実装
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 rounded-xl bg-secondary/50 p-1 mb-4">
          <TabsTrigger value="overview" className="rounded-lg text-xs">概要</TabsTrigger>
          <TabsTrigger value="ui" className="rounded-lg text-xs">UI/画面</TabsTrigger>
          <TabsTrigger value="logic" className="rounded-lg text-xs">ロジック</TabsTrigger>
          <TabsTrigger value="data" className="rounded-lg text-xs">データ/API</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1 bg-secondary/20 rounded-2xl p-6 border border-primary/5 font-mono text-xs leading-relaxed">
          <TabsContent value="overview" className="mt-0">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold border-b border-primary/10 pb-2">
                <Zap className="w-3 h-3 fill-current" /> アプリ概要
              </div>
              <pre className="whitespace-pre-wrap font-sans text-sm">
                {specMarkdown}
              </pre>
            </div>
          </TabsContent>
          <TabsContent value="ui" className="mt-0">
            <p className="text-muted-foreground italic">UI仕様書を生成中...</p>
          </TabsContent>
          <TabsContent value="logic" className="mt-0">
            <p className="text-muted-foreground italic">ロジック仕様書を生成中...</p>
          </TabsContent>
          <TabsContent value="data" className="mt-0">
            <p className="text-muted-foreground italic">データ構造定義を生成中...</p>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </Card>
  );
}
