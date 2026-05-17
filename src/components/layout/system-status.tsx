"use client";

import React, { useEffect, useState } from "react";
import { Activity, Flame, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisResult } from "@/types";

interface SystemStatusSidebarProps {
  result?: AnalysisResult;
}

export function SystemStatusSidebar({ result }: SystemStatusSidebarProps) {
  const [reverMessage, setReverMessage] = useState("全ての検索連鎖と感情データは最適化され、安全に保管されています。");

  const systems = [
    { name: "Gemini 1.5 Flash", status: "online" },
    { name: "Supabase DB", status: "online" },
    { name: "Suggest API", status: "online" },
    { name: "Emotion Engine", status: "online" },
  ];

  const painRanking = [
    { text: "インスタ フォロー外した人", score: 98 },
    { text: "LINE ブロック 確認", score: 92 },
    { text: "退職代行 すぐ", score: 89 },
    { text: "消費者金融 やばい", score: 85 },
  ];

  // AIの動的予測発話 (Live REVER OS)
  useEffect(() => {
    const cycleMessages = () => {
      const messages = [
        "現在、感情レベルが危険域にあるクエリをモニタリング中です。",
        "このキーワードは3日以内に競争が激化する予測が出ています。",
        "女性ユーザーの深夜流入が増加傾向にあります。",
        "即時解決を求める『Painスコア90以上』が急増しています。",
      ];
      
      if (result && result.keyword !== "未検索") {
        if (result.purchaseIntent >= 80) messages.push("購入直前キーワードです。今すぐマネタイズ可能な強い欲求を検出しました！");
        if (result.painScore >= 80) messages.push("非常に強い不安感とペインを検出しました。この悩みを解決する機能が必要です。");
        messages.push(`「${result.keyword}」の次検索ネットワークを予測構築しました。`);
      }

      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setReverMessage(randomMsg);
    };

    const interval = setInterval(cycleMessages, 8000);
    cycleMessages(); // initial call
    return () => clearInterval(interval);
  }, [result]);

  return (
    <div className="w-[320px] flex-shrink-0 border-l border-slate-200 bg-[#F8FAFC] flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-white">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" />
          システムステータス
        </h2>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-6 hide-scrollbar">
        {/* System Nodes */}
        <div className="space-y-2">
          {systems.map((sys) => (
            <div key={sys.name} className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-100 shadow-sm">
              <span className="text-xs font-medium text-slate-700">{sys.name}</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold text-emerald-600">稼働中</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Pain Ranking */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
            <Trophy className="w-4 h-4 text-red-500" />
            <h3 className="text-xs font-bold text-slate-800">Global Pain Ranking</h3>
          </div>
          <div className="p-2 space-y-1">
            {painRanking.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-md hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className={`text-[10px] font-black ${idx === 0 ? 'text-red-500' : 'text-slate-400'}`}>#{idx + 1}</span>
                  <span className="text-xs text-slate-700 font-medium truncate">{item.text}</span>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Flame className="w-3 h-3 text-red-500" />
                  <span className="text-[10px] font-bold text-red-600">{item.score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AIキャラクター (REVER) */}
        <div className="mt-auto bg-slate-900 rounded-xl p-4 relative overflow-hidden text-white shadow-md border border-slate-800 shrink-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/rever-var-4.png" alt="Rever" className="w-20 h-20 object-contain drop-shadow-2xl" />
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={reverMessage}
                initial={{ opacity: 0, scale: 0.95, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-800/80 backdrop-blur-md border border-slate-700/50 p-3 rounded-lg relative w-full shadow-lg"
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-t border-l border-slate-700/50 transform rotate-45" />
                <h3 className="text-[10px] font-black text-blue-400 mb-1 relative z-10 tracking-widest flex justify-center items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" /> REVER OS
                </h3>
                <p className="text-[11px] text-slate-300 leading-relaxed relative z-10 font-medium">
                  {reverMessage}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
