"use client";

import React, { useEffect, useState } from "react";
import { GitMerge } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

interface SearchChainCardProps {
  sessionId?: string;
}

export function SearchChainCard({ sessionId }: SearchChainCardProps) {
  const [chains, setChains] = useState<any[]>([]);

  useEffect(() => {
    if (!sessionId) return;
    const fetchChains = async () => {
      const { data } = await supabase
        .from("intent_chains")
        .select("*")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });
      
      if (data) setChains(data);
    };
    fetchChains();

    const channel = supabase
      .channel(`intent_chains_${sessionId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "intent_chains", filter: `session_id=eq.${sessionId}` },
        (payload) => {
          setChains((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [sessionId]);

  const mockChains = [
    { current_keyword: "インスタ フォロー外した人" },
    { current_keyword: "フォロー外した人 アプリ" },
    { current_keyword: "バレずに確認" }
  ];

  const displayChains = chains.length > 0 ? chains : mockChains;

  return (
    <Card className="shadow-sm border-slate-200 bg-[#0F172A] p-4 h-full flex flex-col overflow-hidden relative group">
      <div className="flex items-center gap-2 mb-2 relative z-10">
        <GitMerge className="w-4 h-4 text-indigo-400" />
        <h2 className="font-bold text-sm text-slate-100">検索連鎖 (Intent Network)</h2>
      </div>

      <div className="flex-1 relative overflow-hidden mt-4">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {displayChains.map((_, i) => {
            if (i === displayChains.length - 1) return null;
            // Draw a simple path between nodes. In a real graph, positions are calculated.
            // Here we just use fixed relative vertical flow with a slight zig-zag for network feel
            const x1 = i % 2 === 0 ? "30%" : "70%";
            const x2 = (i + 1) % 2 === 0 ? "30%" : "70%";
            const y1 = `${(i * 30) + 15}%`;
            const y2 = `${((i + 1) * 30) + 15}%`;
            
            return (
              <motion.line
                key={`line-${i}`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 1, delay: i * 0.5 }}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#6366f1"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="relative w-full h-full z-10">
          <AnimatePresence>
            {displayChains.map((chain, i) => {
              const align = i % 2 === 0 ? "flex-start" : "flex-end";
              const paddingX = i % 2 === 0 ? "pl-4" : "pr-4";
              
              return (
                <motion.div
                  key={chain.current_keyword + i}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.5 }}
                  className={`absolute w-full flex justify-${align === 'flex-start' ? 'start' : 'end'} ${paddingX}`}
                  style={{ top: `${i * 30}%` }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-md border border-indigo-500/30 rounded-xl p-2.5 max-w-[80%] shadow-lg shadow-indigo-500/10">
                    <span className="text-[10px] font-bold text-indigo-300 block mb-0.5">Node {i + 1}</span>
                    <span className="text-xs font-bold text-slate-100">{chain.current_keyword}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
