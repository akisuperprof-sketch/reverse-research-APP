"use client";

import React, { useEffect, useState } from "react";
import { Activity, Flame, Trophy, Terminal, Radar, Cpu, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisResult } from "@/types";
import { toast } from "sonner";

interface SystemStatusSidebarProps {
  result?: AnalysisResult;
}

export function SystemStatusSidebar({ result }: SystemStatusSidebarProps) {
  const [reverMessage, setReverMessage] = useState("自律監視モード起動中。未発掘のPain市場をスキャンしています。");
  const [thinkingLogs, setThinkingLogs] = useState<string[]>([]);

  // AI Thinking Stream Logic
  useEffect(() => {
    const logs = [
      "[SYS] Scanning TikTok organic trends...",
      "[AI] Analyzing emotion depth for 'loneliness'...",
      "[DB] Connecting to neural intent chain...",
      "[SYS] Detecting low-competition high-pain queries...",
      "[AI] Predicting search surge in 72 hours...",
      "[SYS] Updating Global Pain Ranking...",
      "[AI] Extracting purchasing intent from query...",
      "[DB] Storing opportunity scores...",
    ];

    const logInterval = setInterval(() => {
      const newLog = logs[Math.floor(Math.random() * logs.length)];
      setThinkingLogs(prev => {
        const updated = [newLog, ...prev];
        return updated.slice(0, 4); // Keep last 4 logs
      });
    }, 3000);

    return () => clearInterval(logInterval);
  }, []);

  // Opportunity Alerts
  useEffect(() => {
    const alerts = [
      { title: "新規市場検出", desc: "「20代 孤独感」の検索ボリューム急増" },
      { title: "高CV予測", desc: "競争率が低い高Pain市場を発見" },
      { title: "トレンド警告", desc: "TikTok流入による関連ワード増殖中" }
    ];

    const alertInterval = setInterval(() => {
      const alert = alerts[Math.floor(Math.random() * alerts.length)];
      toast.success(alert.title, {
        description: alert.desc,
        icon: <Cpu className="w-4 h-4 text-blue-500 animate-pulse" />,
        position: "top-right",
      });
    }, 45000); // Every 45 seconds

    return () => clearInterval(alertInterval);
  }, []);

  const [isHovered, setIsHovered] = useState(false);

  // AIの動的予測発話 (Live REVER OS)
  useEffect(() => {
    const cycleMessages = () => {
      const messages = [
        "現在、感情レベルが危険域にあるクエリを自律モニタリング中です。",
        "【Auto Insight】恋愛・孤独カテゴリのPainが急上昇しています。今見るべき市場です。",
        "女性ユーザーの深夜流入が増加傾向にあります。明日のトレンドを予測中...",
        "即時解決を求める『Painスコア90以上』が自動検知されました。",
        "【Cluster Alert】「副業焦り」クラスタが急増。マネタイズ機会（Opportunity）が極めて高い状態です。",
        "現在最も危険な感情クラスタ「孤独・健康恐怖」を監視ネットワークに追加しました。",
      ];
      
      if (result && result.keyword !== "未検索") {
        if (result.purchaseIntent >= 80) messages.push("購入直前キーワードです。今すぐマネタイズ可能な強い欲求を検出しました！");
        if (result.painScore >= 80) messages.push("非常に強い不安感とペインを検出しました。この悩みを解決する機能が必要です。");
      }

      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      setReverMessage(randomMsg);
    };

    const interval = setInterval(cycleMessages, 8000);
    cycleMessages();
    return () => clearInterval(interval);
  }, [result]);

  return (
    <>
      {/* 当たり判定（右エッジ） */}
      <div 
        className="absolute top-0 right-0 h-full w-2 z-40 cursor-w-resize flex flex-col justify-center items-center hover:bg-slate-700/50 transition-colors duration-300"
        onMouseEnter={() => setIsHovered(true)}
      >
        {!isHovered && (
          <div className="w-1 h-8 bg-slate-700 rounded-full mr-1" />
        )}
      </div>

      <aside 
        className={cn(
          "absolute top-0 right-0 h-full w-[320px] z-50 border-l border-slate-800 bg-[#0B1120]/95 backdrop-blur-xl flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] text-slate-300",
          isHovered ? "translate-x-0" : "translate-x-full"
        )}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4 border-b border-slate-800/50 bg-[#0B1120]/80 backdrop-blur-md">
          <h2 className="text-xs font-bold text-slate-100 flex items-center gap-2 tracking-widest uppercase">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            Autonomous OS Core
          </h2>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-5 hide-scrollbar">
          
          {/* Reverse Research Radar (SVG Base) */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 shadow-sm overflow-hidden flex flex-col relative p-3">
            <div className="flex items-center gap-2 mb-3">
              <Radar className="w-3.5 h-3.5 text-indigo-400" />
              <h3 className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">Market Radar</h3>
            </div>
            <div className="relative w-full h-32 flex items-center justify-center">
              {/* Simple CSS Radar Animation */}
              <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-full animate-[ping_3s_ease-out_infinite]" />
              <div className="absolute inset-4 border border-indigo-500/10 rounded-full" />
              <div className="absolute inset-8 border border-indigo-500/5 rounded-full" />
              <div className="w-full h-px bg-indigo-500/20 absolute" />
              <div className="w-px h-full bg-indigo-500/20 absolute" />
              
              {/* Categories */}
              <span className="absolute top-0 text-[8px] text-indigo-300">孤独</span>
              <span className="absolute bottom-0 text-[8px] text-indigo-300">副業</span>
              <span className="absolute left-0 text-[8px] text-indigo-300">恋愛</span>
              <span className="absolute right-0 text-[8px] text-indigo-300">金</span>
              <span className="absolute top-4 left-4 text-[8px] text-indigo-300">健康</span>
              <span className="absolute bottom-4 right-4 text-[8px] text-indigo-300">仕事</span>

              {/* Radar Sweep */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-1/2 h-1/2 bg-gradient-to-tr from-indigo-500/30 to-transparent origin-bottom-right"
                style={{ top: 0, left: 0, borderRadius: "100% 0 0 0" }}
              />
            </div>
          </div>

          {/* AI Thinking Stream */}
          <div className="bg-black/40 rounded-xl border border-slate-800 shadow-inner overflow-hidden flex flex-col font-mono text-[9px] relative">
            <div className="p-2 border-b border-slate-800 flex items-center gap-2 bg-slate-900/50">
              <Terminal className="w-3 h-3 text-green-500" />
              <span className="text-slate-400 tracking-wider">AI.THINKING.STREAM</span>
            </div>
            <div className="p-2 space-y-1 h-20 overflow-hidden relative">
              <AnimatePresence>
                {thinkingLogs.map((log, idx) => (
                  <motion.div 
                    key={log + idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1 - (idx * 0.25), x: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-green-400/80 truncate"
                  >
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Autonomous Discovery Engine (Ranking) */}
          <div className="bg-slate-900/50 rounded-xl border border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-2.5 border-b border-slate-800 flex items-center gap-2 bg-slate-800/20">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <h3 className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">Auto Discovery</h3>
            </div>
            <div className="p-1.5 space-y-0.5">
              {[
                { text: "マッチングアプリ 疲れた", tag: "NEW", color: "bg-blue-500" },
                { text: "退職代行 すぐ", tag: "急上昇", color: "bg-red-500" },
                { text: "副業 スマホ", tag: "競合薄", color: "bg-emerald-500" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-1.5 rounded-md hover:bg-slate-800/50 transition-colors">
                  <span className="text-[10px] text-slate-300 truncate pr-2">{item.text}</span>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded text-white ${item.color} flex-shrink-0`}>{item.tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AIキャラクター (REVER) */}
          <div className="mt-auto bg-slate-950 rounded-xl p-4 relative overflow-hidden text-white shadow-md border border-indigo-900/30 shrink-0">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <img src="/rever-var-4.png" alt="Rever" className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
              </motion.div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={reverMessage}
                  initial={{ opacity: 0, scale: 0.95, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900/90 backdrop-blur-md border border-blue-900/50 p-3 rounded-lg relative w-full shadow-lg"
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-t border-l border-blue-900/50 transform rotate-45" />
                  <h3 className="text-[9px] font-black text-blue-400 mb-1 relative z-10 tracking-widest flex justify-center items-center gap-1">
                    <Activity className="w-3 h-3 animate-pulse" /> REVER AUTO INSIGHT
                  </h3>
                  <p className="text-[10px] text-slate-300 leading-relaxed relative z-10 font-medium">
                    {reverMessage}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
