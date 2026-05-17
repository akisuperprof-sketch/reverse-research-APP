import React from "react";
import { Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnalysisResult } from "@/types";

interface SystemStatusSidebarProps {
  result?: AnalysisResult;
}

export function SystemStatusSidebar({ result }: SystemStatusSidebarProps) {
  const systems = [
    { name: "Gemini 1.5 Flash", status: "online" },
    { name: "Supabase DB", status: "online" },
    { name: "Suggest API", status: "online" },
    { name: "Emotion Engine", status: "online" },
    { name: "History Sync", status: "online" },
  ];

  // REVERの動的コメント生成
  const getReverComment = () => {
    if (!result || result.keyword === "未検索") {
      return "全ての検索連鎖と感情データは最適化され、安全に保管されています。";
    }
    
    if (result.purchaseIntent >= 80) return "購入直前キーワードです。今すぐマネタイズ可能な強い欲求を検出しました！";
    if (result.painScore >= 80) return "非常に強い不安感とペインを検出しました。この悩みを解決する機能が必要です。";
    if (result.demandScore >= 80) return "膨大な検索ボリュームです。ただし競合も多い可能性があります。";
    return "比較検討フェーズの検索意図です。ユーザーは複数の選択肢で迷っています。";
  };

  return (
    <div className="w-[320px] flex-shrink-0 border-l border-slate-200 bg-[#F8FAFC] flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-white">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" />
          システムステータス
        </h2>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-6">
        <div className="space-y-3">
          {systems.map((sys) => (
            <div key={sys.name} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
              <span className="text-xs font-medium text-slate-700">{sys.name}</span>
              <div className="flex items-center gap-1.5">
                {sys.status === "online" ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-600">稼働中</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-[10px] font-bold text-amber-600">調整中</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* AIキャラクター (REVER) */}
        <div className="mt-auto bg-slate-900 rounded-xl p-4 relative overflow-hidden text-white shadow-md">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img src="/rever-var-4.png" alt="Rever" className="w-24 h-24 object-contain mb-1" />
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={result?.keyword || "empty"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-slate-800/80 border border-slate-700 p-3 rounded-lg relative w-full"
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-t border-l border-slate-700 transform rotate-45" />
                <h3 className="text-xs font-bold text-blue-400 mb-1 relative z-10">REVER AI</h3>
                <p className="text-[11px] text-slate-300 leading-relaxed relative z-10">
                  {getReverComment()}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
