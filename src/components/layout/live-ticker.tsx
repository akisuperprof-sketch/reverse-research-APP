"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Moon, Activity, Flame } from "lucide-react";

export function LiveTicker() {
  const feedItems = [
    { text: "Pain急上昇中", detail: "美容系・深夜", icon: Flame, color: "text-red-500", bg: "bg-red-500/10" },
    { text: "孤独系ワード増加", detail: "20代男性", icon: Moon, color: "text-purple-500", bg: "bg-purple-500/10" },
    { text: "購入直前キーワード", detail: "即コンバージョン", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { text: "比較検討急増", detail: "金融・乗り換え", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
    { text: "危険域トラフィック", detail: "詐欺被害", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex items-center h-8 flex-shrink-0 shadow-sm relative">
      <div className="bg-blue-600 h-full px-3 flex items-center justify-center font-black text-[10px] text-white tracking-widest uppercase z-10 shrink-0">
        <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 animate-pulse" /> LIVE</span>
      </div>
      
      <div className="flex-1 overflow-hidden relative h-full flex items-center">
        {/* Fading edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-slate-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 to-transparent z-10" />
        
        <motion.div 
          className="flex items-center gap-8 whitespace-nowrap pl-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 20, repeat: Infinity }}
        >
          {/* Double the array for seamless loop */}
          {[...feedItems, ...feedItems].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`p-1 rounded-sm ${item.bg}`}>
                <item.icon className={`w-3 h-3 ${item.color}`} />
              </div>
              <span className="text-[11px] font-bold text-slate-300">{item.text}</span>
              <span className="text-[10px] text-slate-500">[{item.detail}]</span>
              <span className="text-slate-700 mx-2">/</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
