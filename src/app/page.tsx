"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { SystemStatusSidebar } from "@/components/layout/system-status";
import { KeywordInputCard } from "@/components/dashboard/keyword-input";
import { SuggestKeywordCard } from "@/components/dashboard/related-keywords";
import { ScoreBoard } from "@/components/dashboard/score-board";
import { AppIdeaBoard } from "@/components/dashboard/app-idea-board";
import { SuggestStreamCard } from "@/components/dashboard/suggest-stream";
import { SearchChainCard } from "@/components/dashboard/search-chain";
import { ClusterEngineCard } from "@/components/dashboard/cluster-engine";
import { EmotionDeepInsightCard } from "@/components/dashboard/emotion-insight";
import { AIBootSequence } from "@/components/dashboard/boot-sequence";
import { LiveTicker } from "@/components/layout/live-ticker";
import { AnalysisResult } from "@/types";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/client";
import { Compass, TrendingUp, Lightbulb, Zap, ShieldCheck, Video, Database, CheckCircle2, AlertTriangle } from "lucide-react";

// ==========================================
// NEW Premium High-Density Bento Cards (Core Value Refocus)
// ==========================================

const NextSearchMapCard = ({ nextSearchMap, legacyRelatedKeywords, searchChainNode }: { nextSearchMap?: any[], legacyRelatedKeywords: any[], searchChainNode: React.ReactNode }) => {
  const [tab, setTab] = useState<"next" | "legacy" | "chain">("next");
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden text-slate-800 text-[11px] p-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <Compass className="w-3.5 h-3.5 text-blue-500" />
          <span>Next Search Map</span>
        </div>
        <div className="flex bg-slate-100 rounded p-0.5 text-[9px] gap-0.5">
          <button onClick={() => setTab("next")} className={`px-2 py-0.5 rounded transition-all ${tab === "next" ? "bg-white font-bold shadow-xs text-blue-600" : "text-slate-500 hover:text-slate-800"}`}>次検索</button>
          <button onClick={() => setTab("legacy")} className={`px-2 py-0.5 rounded transition-all ${tab === "legacy" ? "bg-white font-bold shadow-xs text-blue-600" : "text-slate-500 hover:text-slate-800"}`}>サジェスト</button>
          <button onClick={() => setTab("chain")} className={`px-2 py-0.5 rounded transition-all ${tab === "chain" ? "bg-white font-bold shadow-xs text-blue-600" : "text-slate-500 hover:text-slate-800"}`}>意図連鎖</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar min-h-0">
        {tab === "next" ? (
          <div className="space-y-1.5">
            {(!nextSearchMap || nextSearchMap.length === 0) ? (
              <div className="text-slate-400 text-center py-4">分析データを読み込んでください</div>
            ) : (
              nextSearchMap.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded-lg bg-slate-50/50 hover:bg-slate-50 border border-slate-100/80 transition-colors">
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-slate-800 truncate">{item.keyword}</span>
                    <span className="text-[9px] text-slate-500 flex items-center gap-1">
                      <span>{item.stage}</span> • <span className="text-indigo-500 font-medium">{item.emotion}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="bg-blue-50 text-blue-600 text-[8px] font-black px-1.5 py-0.5 rounded">MVP {item.mvpPotential}%</span>
                    <span className="bg-amber-50 text-amber-600 text-[8px] font-bold px-1 py-0.5 rounded">優先 {item.priority}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : tab === "legacy" ? (
          <SuggestKeywordCard keywords={legacyRelatedKeywords} />
        ) : (
          <div className="h-full min-h-0">{searchChainNode}</div>
        )}
      </div>
    </div>
  );
};

const HighDensityScoreBoard = ({ result, emotionNode }: { result: AnalysisResult, emotionNode: React.ReactNode }) => {
  const [tab, setTab] = useState<"scores" | "emotion">("scores");
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden text-slate-800 text-[11px] p-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
          <span>Pain & Intent Scores</span>
        </div>
        <div className="flex bg-slate-100 rounded p-0.5 text-[9px] gap-0.5">
          <button onClick={() => setTab("scores")} className={`px-2 py-0.5 rounded transition-all ${tab === "scores" ? "bg-white font-bold shadow-xs text-indigo-600" : "text-slate-500 hover:text-slate-800"}`}>スコア</button>
          <button onClick={() => setTab("emotion")} className={`px-2 py-0.5 rounded transition-all ${tab === "emotion" ? "bg-white font-bold shadow-xs text-indigo-600" : "text-slate-500 hover:text-slate-800"}`}>深層心理</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar min-h-0">
        {tab === "scores" ? (
          <div className="flex items-center justify-around h-full py-2">
            <div className="flex flex-col items-center">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-slate-100" strokeWidth="4" fill="transparent" />
                  <circle cx="28" cy="28" r="24" className="stroke-rose-500 transition-all duration-500" strokeWidth="4" fill="transparent" strokeDasharray={2 * Math.PI * 24} strokeDashoffset={2 * Math.PI * 24 * (1 - (result.painScore || 0) / 100)} />
                </svg>
                <span className="absolute text-[11px] font-black text-rose-600">{result.painScore || 0}</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 mt-1 text-center">悩みの深さ<br/>(Pain)</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-slate-100" strokeWidth="4" fill="transparent" />
                  <circle cx="28" cy="28" r="24" className="stroke-emerald-500 transition-all duration-500" strokeWidth="4" fill="transparent" strokeDasharray={2 * Math.PI * 24} strokeDashoffset={2 * Math.PI * 24 * (1 - (result.purchaseIntent || 50) / 100)} />
                </svg>
                <span className="absolute text-[11px] font-black text-emerald-600">{result.purchaseIntent || 50}</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 mt-1 text-center">購入意図<br/>(Purchase)</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-slate-100" strokeWidth="4" fill="transparent" />
                  <circle cx="28" cy="28" r="24" className="stroke-amber-500 transition-all duration-500" strokeWidth="4" fill="transparent" strokeDasharray={2 * Math.PI * 24} strokeDashoffset={2 * Math.PI * 24 * (1 - (result.urgencyLevel || 50) / 100)} />
                </svg>
                <span className="absolute text-[11px] font-black text-amber-600">{result.urgencyLevel || 50}</span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 mt-1 text-center">緊急度<br/>(Urgency)</span>
            </div>
          </div>
        ) : (
          <div className="h-full min-h-0 flex flex-col gap-2">
            <div className="space-y-1.5 p-2 bg-slate-50 rounded-lg overflow-y-auto">
              <div className="font-bold text-indigo-600 text-[9px] uppercase tracking-wider">感情トリガー</div>
              <p className="text-[10px] text-slate-600 leading-normal">{result.emotionReason || "データなし"}</p>
            </div>
            <div className="flex-1 min-h-0 overflow-hidden">{emotionNode}</div>
          </div>
        )}
      </div>
    </div>
  );
};

const WantedAppPanel = ({ wantedApp }: { wantedApp?: any }) => {
  return (
    <div className="bg-[#0B1120] text-slate-300 rounded-xl border border-slate-800 shadow-xl flex flex-col h-full overflow-hidden text-[11px] p-3">
      <div className="flex items-center gap-1.5 font-bold text-slate-100 border-b border-slate-800 pb-1.5 mb-2 flex-shrink-0">
        <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
        <span>Wanted App Panel</span>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2 min-h-0">
        {!wantedApp ? (
          <div className="text-slate-500 text-center py-4">分析完了後に表示されます</div>
        ) : (
          <>
            <div>
              <span className="text-[9px] text-blue-400 font-bold block">アプリ案名称</span>
              <span className="text-[12px] font-black text-white">{wantedApp.name}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-[8px] text-slate-500 block">ターゲット</span>
                <span className="text-[9px] text-slate-300 font-bold truncate block">{wantedApp.targetUser}</span>
              </div>
              <div>
                <span className="text-[8px] text-slate-500 block">推定開発期間 / 難易度</span>
                <span className="text-[9px] text-slate-300 font-bold block">{wantedApp.estimatedDays} ({wantedApp.difficulty})</span>
              </div>
            </div>
            <div>
              <span className="text-[9px] text-rose-400 font-bold block">解決する最大の問題</span>
              <p className="text-[10px] text-slate-300 leading-snug">{wantedApp.coreProblem}</p>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 rounded p-1.5 flex-shrink-0">
              <span className="text-[8px] text-rose-300 font-black block flex items-center gap-1">
                <AlertTriangle className="w-2.5 h-2.5" /> 作ってはいけない機能
              </span>
              <ul className="list-disc list-inside text-[9px] text-rose-200 mt-0.5 space-y-0.5">
                {wantedApp.doNotBuild?.map((item: string, i: number) => (
                  <li key={i} className="truncate">{item}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MvpOneFeatureCard = ({ mvpOneFeature }: { mvpOneFeature?: any }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden text-slate-800 text-[11px] p-3">
      <div className="flex items-center gap-1.5 font-bold text-slate-700 border-b border-slate-100 pb-1.5 mb-2 flex-shrink-0">
        <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
        <span>MVP 1 Feature</span>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2 min-h-0">
        {!mvpOneFeature ? (
          <div className="text-slate-400 text-center py-4">分析完了後に表示されます</div>
        ) : (
          <>
            <div className="bg-amber-50 border border-amber-200/80 rounded p-1.5">
              <span className="text-[9px] text-amber-700 font-black block">作るべき唯一の機能</span>
              <span className="text-[11px] font-bold text-slate-800 block mt-0.5 leading-snug">{mvpOneFeature.build}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/80 rounded p-1.5">
              <span className="text-[9px] text-slate-500 font-bold block">MVPから削るべき機能</span>
              <ul className="text-[9px] text-slate-400 mt-0.5 space-y-0.5">
                {mvpOneFeature.remove?.map((item: string, i: number) => (
                  <li key={i} className="line-through flex items-center gap-1">
                    <span>• {item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-[8px] text-indigo-500 font-bold block">最初の30秒の感動体験</span>
              <p className="text-[9px] text-slate-600 leading-snug">{mvpOneFeature.first30secExperience}</p>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[9px]">
              <div className="bg-emerald-50/50 p-1 rounded">
                <span className="text-emerald-700 font-bold block">無料で見せる価値</span>
                <span className="text-[8px] text-slate-600 block leading-tight">{mvpOneFeature.freeValue}</span>
              </div>
              <div className="bg-blue-50/50 p-1 rounded">
                <span className="text-blue-700 font-bold block">有料課金ポイント</span>
                <span className="text-[8px] text-slate-600 block leading-tight">{mvpOneFeature.paidValue}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CompetitorGapCard = ({ competitorGap, legacyClusterEngine }: { competitorGap?: any, legacyClusterEngine: React.ReactNode }) => {
  const [tab, setTab] = useState<"gap" | "cluster">("gap");
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden text-slate-800 text-[11px] p-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Competitor Gap</span>
        </div>
        <div className="flex bg-slate-100 rounded p-0.5 text-[9px] gap-0.5">
          <button onClick={() => setTab("gap")} className={`px-2 py-0.5 rounded transition-all ${tab === "gap" ? "bg-white font-bold shadow-xs text-emerald-600" : "text-slate-500 hover:text-slate-800"}`}>隙間・強み</button>
          <button onClick={() => setTab("cluster")} className={`px-2 py-0.5 rounded transition-all ${tab === "cluster" ? "bg-white font-bold shadow-xs text-emerald-600" : "text-slate-500 hover:text-slate-800"}`}>感情クラスタ</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar min-h-0">
        {tab === "gap" ? (
          !competitorGap ? (
            <div className="text-slate-400 text-center py-4">分析完了後に表示されます</div>
          ) : (
            <div className="space-y-1.5">
              <div>
                <span className="text-[8px] text-slate-500 block">主要競合 / 弱点</span>
                <div className="text-[9px] text-slate-700 font-medium leading-snug">
                  {competitorGap.competitors?.join(", ")} の弱点: {competitorGap.weaknesses?.join(" • ")}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-1.5 bg-slate-50 p-1.5 rounded border border-slate-100">
                <div>
                  <span className="text-[8px] text-indigo-500 font-bold block">UI差別化</span>
                  <span className="text-[9px] text-slate-600 block leading-snug">{competitorGap.uiGap}</span>
                </div>
                <div>
                  <span className="text-[8px] text-emerald-500 font-bold block">信頼性差別化</span>
                  <span className="text-[9px] text-slate-600 block leading-snug">{competitorGap.trustGap}</span>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded p-1.5 flex-shrink-0">
                <span className="text-[8px] text-emerald-700 font-black block">勝てる切り口</span>
                <span className="text-[9px] text-slate-800 font-bold block mt-0.5 leading-snug">{competitorGap.winningAngle}</span>
              </div>
            </div>
          )
        ) : (
          <div className="h-full min-h-0 overflow-hidden">{legacyClusterEngine}</div>
        )}
      </div>
    </div>
  );
};

const VideoHookCard = ({ videoHooks, suggestStreamNode }: { videoHooks?: any, suggestStreamNode: React.ReactNode }) => {
  const [tab, setTab] = useState<"video" | "suggest">("video");
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden text-slate-800 text-[11px] p-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <Video className="w-3.5 h-3.5 text-rose-500" />
          <span>Video Hook Panel</span>
        </div>
        <div className="flex bg-slate-100 rounded p-0.5 text-[9px] gap-0.5">
          <button onClick={() => setTab("video")} className={`px-2 py-0.5 rounded transition-all ${tab === "video" ? "bg-white font-bold shadow-xs text-rose-600" : "text-slate-500 hover:text-slate-800"}`}>動画フック</button>
          <button onClick={() => setTab("suggest")} className={`px-2 py-0.5 rounded transition-all ${tab === "suggest" ? "bg-white font-bold shadow-xs text-rose-600" : "text-slate-500 hover:text-slate-800"}`}>サジェスト流</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar min-h-0">
        {tab === "video" ? (
          !videoHooks ? (
            <div className="text-slate-400 text-center py-4">分析完了後に表示されます</div>
          ) : (
            <div className="space-y-2">
              <div>
                <span className="text-[8px] text-slate-500 font-bold block">TikTok / Reels タイトル案</span>
                <span className="text-[9.5px] font-black text-rose-600 block truncate">{videoHooks.tiktokTitles?.[0] || "タイトル生成中"}</span>
                <span className="text-[8px] text-slate-400 block truncate">{videoHooks.tiktokTitles?.[1]}</span>
              </div>
              <div>
                <span className="text-[8px] text-indigo-500 font-bold block">冒頭3秒強烈フック</span>
                <span className="text-[9.5px] font-bold text-slate-800 block bg-slate-50 p-1 rounded border border-slate-100 leading-snug">{videoHooks.first3secHooks?.[0]}</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 bg-rose-50/50 p-1.5 rounded border border-rose-100">
                <div>
                  <span className="text-[8px] text-rose-700 font-bold block">15秒構成</span>
                  <span className="text-[8px] text-slate-600 block leading-tight">{videoHooks.fifteenSecStructure}</span>
                </div>
                <div>
                  <span className="text-[8px] text-rose-700 font-bold block">30秒構成</span>
                  <span className="text-[8px] text-slate-600 block leading-tight">{videoHooks.thirtySecStructure}</span>
                </div>
              </div>
              <div>
                <span className="text-[8px] text-emerald-600 font-bold block">行動喚起 (CTA)</span>
                <span className="text-[9px] text-slate-700 font-bold block truncate">{videoHooks.cta}</span>
              </div>
            </div>
          )
        ) : (
          <div className="h-full min-h-0 overflow-hidden">{suggestStreamNode}</div>
        )}
      </div>
    </div>
  );
};

const AppSpecPreviewCard = ({ appSpecPreview, legacyAppIdeas, legacyMvpSpec }: { appSpecPreview?: any, legacyAppIdeas: any[], legacyMvpSpec?: string }) => {
  const [tab, setTab] = useState<"spec" | "ideas" | "markdown">("spec");
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden text-slate-800 text-[11px] p-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2 flex-shrink-0">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <Database className="w-3.5 h-3.5 text-blue-500" />
          <span>App Spec Preview (Google Antigravity用仕様書)</span>
        </div>
        <div className="flex bg-slate-100 rounded p-0.5 text-[9px] gap-0.5">
          <button onClick={() => setTab("spec")} className={`px-2 py-0.5 rounded transition-all ${tab === "spec" ? "bg-white font-bold shadow-xs text-blue-600" : "text-slate-500 hover:text-slate-800"}`}>簡易仕様書</button>
          <button onClick={() => setTab("ideas")} className={`px-2 py-0.5 rounded transition-all ${tab === "ideas" ? "bg-white font-bold shadow-xs text-blue-600" : "text-slate-500 hover:text-slate-800"}`}>他アプリ案</button>
          <button onClick={() => setTab("markdown")} className={`px-2 py-0.5 rounded transition-all ${tab === "markdown" ? "bg-white font-bold shadow-xs text-blue-600" : "text-slate-500 hover:text-slate-800"}`}>MD仕様書</button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar min-h-0">
        {tab === "spec" ? (
          !appSpecPreview ? (
            <div className="text-slate-400 text-center py-4">分析完了後に表示されます</div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div>
                  <span className="text-[8px] text-blue-500 font-bold block">目的</span>
                  <p className="text-[9.5px] text-slate-700 leading-snug">{appSpecPreview.purpose}</p>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 font-bold block">対象ユーザー</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {appSpecPreview.targetUsers?.map((u: string, i: number) => (
                      <span key={i} className="bg-slate-100 text-slate-600 px-1 py-0.5 rounded text-[8px]">{u}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[8px] text-indigo-500 font-bold block">コア機能定義</span>
                  <ul className="list-disc list-inside text-[9px] text-slate-600 space-y-0.5">
                    {appSpecPreview.features?.map((f: string, i: number) => (
                      <li key={i} className="truncate">{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-1.5">
                <div>
                  <span className="text-[8px] text-emerald-500 font-bold block">画面構成</span>
                  <ul className="list-disc list-inside text-[9px] text-slate-600 space-y-0.5">
                    {appSpecPreview.screens?.map((s: string, i: number) => (
                      <li key={i} className="truncate">{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span className="text-[8px] text-amber-500 font-bold block">安全設計・禁止事項</span>
                  <ul className="list-disc list-inside text-[9px] text-slate-600 space-y-0.5">
                    {appSpecPreview.safetyDesign?.map((d: string, i: number) => (
                      <li key={i} className="truncate text-slate-600">{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )
        ) : tab === "ideas" ? (
          <AppIdeaBoard ideas={legacyAppIdeas} />
        ) : (
          <div className="bg-slate-50 rounded border border-slate-200 p-2 font-mono text-[9px] text-slate-600 whitespace-pre-wrap leading-normal h-full overflow-y-auto">
            {legacyMvpSpec || "仕様書はありません"}
          </div>
        )}
      </div>
    </div>
  );
};

const DecisionCard = ({ decision }: { decision?: any }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden text-slate-800 text-[11px] p-3">
      <div className="flex items-center gap-1.5 font-bold text-slate-700 border-b border-slate-100 pb-1.5 mb-2 flex-shrink-0">
        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
        <span>Decision Card</span>
      </div>
      <div className="flex-1 overflow-y-auto hide-scrollbar space-y-2 flex flex-col min-h-0">
        {!decision ? (
          <div className="text-slate-400 text-center py-4">分析完了後に表示されます</div>
        ) : (
          <>
            <div className="flex items-center justify-between flex-shrink-0">
              <div>
                <span className="text-[8px] text-slate-500 block">総合ジャッジ</span>
                <span className={`text-[12px] font-black px-2 py-0.5 rounded text-white inline-block mt-0.5 animate-pulse ${
                  decision.status?.includes("今すぐ") ? "bg-emerald-500" :
                  decision.status?.includes("小さく") ? "bg-amber-500" :
                  decision.status?.includes("保留") ? "bg-slate-500" : "bg-rose-500"
                }`}>
                  {decision.status}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[8px] text-slate-500 block">勝算スコア</span>
                <span className="text-[16px] font-black text-slate-800">{decision.score}点</span>
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded p-1.5 flex-1 min-h-0 overflow-y-auto">
              <span className="text-[8px] text-slate-500 font-bold block">判断理由</span>
              <ul className="list-disc list-inside text-[9.5px] text-slate-600 mt-0.5 space-y-1">
                {decision.reasons?.map((item: string, i: number) => (
                  <li key={i} className="leading-snug">{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded p-1.5 flex-shrink-0">
              <span className="text-[8px] text-blue-700 font-black block">NEXT ACTION</span>
              <span className="text-[10px] text-slate-800 font-bold block mt-0.5 leading-snug">{decision.nextAction}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ==========================================
// Dashboard Component
// ==========================================

const mockInitialResult: AnalysisResult = {
  keyword: "未検索",
  score: 0,
  demandScore: 0,
  painScore: 0,
  urgencyScore: 0,
  monetizationScore: 0,
  developmentScore: 0,
  seoScore: 0,
  riskScore: 0,
  scalabilityScore: 0,
  competitionWeakness: "-",
  relatedKeywords: [],
  intentStats: { "未認知": 0, "問題認知": 0, "解決策探し": 0, "選択肢比較": 0, "今すぐ買う": 0 },
  appIdeas: [],
  suggestions: [],
  emotionReason: "検索してください",
  urgencyLevel: 0,
  purchaseIntent: 0,
  futureSearches: [],
  painReason: "検索してください",
  opportunityReason: "検索してください",
  
  // 新設属性
  nextSearchMap: [],
  wantedApp: undefined,
  mvpOneFeature: undefined,
  videoHooks: undefined,
  competitorGap: undefined,
  appSpecPreview: undefined,
  decision: undefined
};

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult>(mockInitialResult);
  const [history, setHistory] = useState<any[]>([]);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
  const [previousKeyword, setPreviousKeyword] = useState<string | null>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("search_queries")
        .select("id, keyword, total_score, created_at")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setHistory(data || []);
    } catch (err) {
      console.error("Fetch history error:", err);
    }
  };

  const mapApiData = (data: any, defaultKeyword: string = "未検索", suggestionsData?: any): AnalysisResult => {
    return {
      id: data.id,
      keyword: data.keyword || defaultKeyword,
      score: data.scores?.total || data.score || 0,
      demandScore: data.scores?.demand || data.demandScore || 0,
      painScore: data.scores?.pain || data.painScore || 0,
      urgencyScore: data.scores?.urgency || data.urgencyScore || 0,
      monetizationScore: data.scores?.monetization || data.monetizationScore || 0,
      developmentScore: data.scores?.development || data.developmentScore || 0,
      seoScore: data.scores?.seo || data.seoScore || 0,
      riskScore: data.scores?.risk || data.riskScore || 0,
      scalabilityScore: data.scores?.scalability || data.scalabilityScore || 0,
      competitionWeakness: data.searchGapSummary || data.competitionWeakness || "",
      relatedKeywords: data.relatedKeywords || [],
      intentStats: data.intentStages || data.intentStats || {},
      appIdeas: data.appIdeas || data.generated_apps || [],
      competitorInsights: data.competitorInsights || [],
      emotionReason: data.emotionReason || data.raw_json?.emotionReason || data.emotion_data?.emotionReason || "",
      urgencyLevel: data.urgencyLevel || data.raw_json?.urgencyLevel || data.emotion_data?.urgencyLevel || 50,
      purchaseIntent: data.purchaseIntent || data.raw_json?.purchaseIntent || data.emotion_data?.purchaseIntent || 50,
      futureSearches: data.futureSearches || data.raw_json?.futureSearches || data.emotion_data?.futureSearches || [],
      painReason: data.painReason || data.raw_json?.painReason || data.emotion_data?.painReason || "",
      opportunityReason: data.opportunityReason || data.raw_json?.opportunityReason || data.emotion_data?.opportunityReason || "",
      mvpSpec: data.mvpSpec || data.generated_specs?.[0]?.content || data.raw_json?.mvpSpec || "",
      seoPack: data.seoPack || data.seo_video_packs?.[0]?.seo_data || data.raw_json?.seoPack || { title: "", description: "", h1: "" },
      videoIdeas: data.videoIdeas || data.seo_video_packs?.[0]?.video_ideas || data.raw_json?.videoIdeas || [],
      launchPlan: data.launchPlan || data.raw_json?.launchPlan || [],
      suggestions: suggestionsData?.suggestions || [],
      
      // 新設Core Value属性の追加 (安全にフォールバック)
      nextSearchMap: data.nextSearchMap || data.emotion_data?.nextSearchMap || [],
      wantedApp: data.wantedApp || data.emotion_data?.wantedApp || null,
      mvpOneFeature: data.mvpOneFeature || data.emotion_data?.mvpOneFeature || null,
      videoHooks: data.videoHooks || data.emotion_data?.videoHooks || null,
      competitorGap: data.competitorGap || data.emotion_data?.competitorGap || null,
      appSpecPreview: data.appSpecPreview || data.emotion_data?.appSpecPreview || null,
      decision: data.decision || data.emotion_data?.decision || null
    };
  };

  const handleSearch = async (keyword: string) => {
    setIsLoading(true);
    const toastId = toast.loading(`「${keyword}」を分析中...`);

    try {
      const [resAnalyze, resSuggest] = await Promise.all([
        fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword }),
        }),
        fetch("/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ keyword, sessionId, previousKeyword }),
        }).catch(() => null)
      ]);

      if (!resAnalyze.ok) {
        const errorData = await resAnalyze.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || "分析に失敗しました");
      }

      const dataAnalyze = await resAnalyze.json();
      let dataSuggest = { suggestions: [] };
      
      if (resSuggest && resSuggest.ok) {
        dataSuggest = await resSuggest.json();
        
        if (dataAnalyze.id && dataSuggest.suggestions?.length > 0) {
          fetch("/api/suggest/link", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ keyword, queryId: dataAnalyze.id, suggestions: dataSuggest.suggestions })
          }).catch(() => {});
        }
      }

      setResult(mapApiData(dataAnalyze, keyword, dataSuggest));
      setPreviousKeyword(keyword);
      toast.success("分析が完了し、Supabaseに保存されました", { id: toastId });
      fetchHistory();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "エラーが発生しました", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = async (item: any) => {
    setIsLoading(true);
    const toastId = toast.loading(`「${item.keyword}」の分析履歴を復元中...`);

    try {
      const resHistoryPromise = fetch(`/api/history/${item.id}`);
      const resSuggestsDbPromise = supabase.from("suggest_keywords").select("*, emotion_scores(*)").eq("query_id", item.id).then(res => res, err => ({ data: null, error: err }));

      const [resHistory, resSuggestsDb] = await Promise.all([
        resHistoryPromise,
        resSuggestsDbPromise
      ]);
      
      if (!resHistory.ok) throw new Error("履歴の取得に失敗しました");

      const data = await resHistory.json();
      
      let suggestions = [];
      if (resSuggestsDb && resSuggestsDb.data) {
         suggestions = resSuggestsDb.data.map((s: any) => ({
            suggestText: s.suggest_text,
            emotion: s.emotion_scores?.[0]?.emotion_category || "調査",
            painScore: s.emotion_scores?.[0]?.pain_score || 50,
            opportunityScore: s.emotion_scores?.[0]?.opportunity_score || 50
         }));
      }

      setResult(mapApiData(data, item.keyword, { suggestions }));
      setPreviousKeyword(item.keyword);
      toast.success("履歴を復元しました", { id: toastId });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "エラーが発生しました", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC] font-sans relative">
      <Sidebar history={history} onLoadHistory={loadFromHistory} />
      
      {/* 左右にサイドバー呼び出し用のアフォーダンス領域（パディング）を設ける */}
      <div className="flex-1 flex flex-col min-w-0 py-2.5 px-8 gap-3 h-full overflow-hidden">
        <LiveTicker />
        
        {/* 上段 (Top Row): 入力、次検索、高密度スコアボード */}
        <div className="grid grid-cols-3 gap-3 flex-shrink-0">
          <div className="flex flex-col gap-2">
            <KeywordInputCard onSearch={handleSearch} isLoading={isLoading} />
          </div>
          <div className="h-[105px]">
            <NextSearchMapCard 
              nextSearchMap={result.nextSearchMap} 
              legacyRelatedKeywords={result.relatedKeywords} 
              searchChainNode={<SearchChainCard sessionId={sessionId} />}
            />
          </div>
          <div className="h-[105px]">
            <HighDensityScoreBoard 
              result={result} 
              emotionNode={<EmotionDeepInsightCard data={result} />}
            />
          </div>
        </div>
        
        {/* 中段 (Middle Row): 求められるアプリ、最小MVP、競合弱点、動画フック */}
        <div className="grid grid-cols-4 gap-3 flex-1 min-h-0">
          <div className="h-full">
            <WantedAppPanel wantedApp={result.wantedApp} />
          </div>
          <div className="h-full">
            <MvpOneFeatureCard mvpOneFeature={result.mvpOneFeature} />
          </div>
          <div className="h-full">
            <CompetitorGapCard 
              competitorGap={result.competitorGap} 
              legacyClusterEngine={<ClusterEngineCard />}
            />
          </div>
          <div className="h-full">
            <VideoHookCard 
              videoHooks={result.videoHooks} 
              suggestStreamNode={<SuggestStreamCard suggestions={result.suggestions} />}
            />
          </div>
        </div>

        {/* 下段 (Bottom Row): アプリ仕様書、意思決定判断 */}
        <div className="grid grid-cols-3 gap-3 h-[180px] flex-shrink-0">
          <div className="col-span-2 h-full">
            <AppSpecPreviewCard 
              appSpecPreview={result.appSpecPreview} 
              legacyAppIdeas={result.appIdeas}
              legacyMvpSpec={result.mvpSpec}
            />
          </div>
          <div className="h-full">
            <DecisionCard decision={result.decision} />
          </div>
        </div>
      </div>

      <AIBootSequence isLoading={isLoading} keyword={previousKeyword || "新規解析"} />
      <SystemStatusSidebar result={result} />
    </div>
  );
}
