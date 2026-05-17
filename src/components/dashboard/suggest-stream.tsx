import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, AlertCircle, Search, HelpCircle, ShoppingCart } from "lucide-react";

interface SuggestStreamProps {
  suggestions?: {
    suggestText: string;
    emotion: string;
    painScore: number;
    opportunityScore: number;
  }[];
}

const emotionColorMap: Record<string, string> = {
  "不安": "bg-red-500/10 text-red-600 border-red-500/20",
  "比較": "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "怒り": "bg-orange-500/10 text-orange-600 border-orange-500/20",
  "緊急": "bg-rose-500/10 text-rose-600 border-rose-500/20",
  "購入直前": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  "悩み": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "調査": "bg-gray-500/10 text-gray-600 border-gray-500/20"
};

const emotionIconMap: Record<string, React.ReactNode> = {
  "不安": <AlertCircle className="w-3 h-3" />,
  "比較": <Search className="w-3 h-3" />,
  "怒り": <Zap className="w-3 h-3" />,
  "緊急": <Zap className="w-3 h-3" />,
  "購入直前": <ShoppingCart className="w-3 h-3" />,
  "悩み": <HelpCircle className="w-3 h-3" />,
  "調査": <Search className="w-3 h-3" />
};

export function SuggestStreamCard({ suggestions = [] }: SuggestStreamProps) {
  if (!suggestions || suggestions.length === 0) {
    return (
      <Card className="col-span-full xl:col-span-2 shadow-sm border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="w-5 h-5 text-ai-blue" />
            Suggest Stream
          </CardTitle>
          <CardDescription>リアルタイムサジェスト感情解析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center text-sm text-gray-500">
            データがありません
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full xl:col-span-2 shadow-sm border-gray-200 bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
              <Search className="w-5 h-5 text-ai-blue" />
              Suggest Stream
            </CardTitle>
            <CardDescription className="mt-1">
              Googleサジェストとユーザー感情・ペインスコア
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-ai-blue/10 text-ai-blue border-ai-blue/20">
            {suggestions.length} Keywords
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {suggestions.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/80 border border-gray-100 hover:shadow-sm transition-shadow group">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={`flex items-center gap-1.5 px-2 py-1 ${emotionColorMap[item.emotion] || emotionColorMap["調査"]}`}>
                  {emotionIconMap[item.emotion] || <Search className="w-3 h-3" />}
                  {item.emotion}
                </Badge>
                <span className="font-medium text-gray-800 text-sm">{item.suggestText}</span>
              </div>
              
              <div className="flex items-center gap-4 text-xs font-medium">
                <div className="flex flex-col items-end">
                  <span className="text-gray-400 mb-1">Pain</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500" style={{ width: `${item.painScore}%` }} />
                    </div>
                    <span className="text-gray-600 w-5 text-right">{item.painScore}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="text-gray-400 mb-1">Opportunity</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${item.opportunityScore}%` }} />
                    </div>
                    <span className="text-gray-600 w-5 text-right">{item.opportunityScore}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
