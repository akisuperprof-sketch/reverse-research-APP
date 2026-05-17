"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, TrendingUp, Skull, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ClusterEngineCard() {
  const [clusters, setClusters] = useState([
    { id: "c1", name: "恋愛不安", density: 92, growth: "+45%", type: "pain", x: 20, y: 30 },
    { id: "c2", name: "副業焦り", density: 85, growth: "+20%", type: "opp", x: 70, y: 20 },
    { id: "c3", name: "健康恐怖", density: 78, growth: "+10%", type: "pain", x: 50, y: 70 },
    { id: "c4", name: "購入直前", density: 95, growth: "+80%", type: "opp", x: 85, y: 80 },
    { id: "c5", name: "孤独感", density: 88, growth: "+35%", type: "pain", x: 15, y: 80 },
  ]);

  // Simulate live cluster movement
  useEffect(() => {
    const interval = setInterval(() => {
      setClusters((prev) =>
        prev.map((c) => ({
          ...c,
          x: Math.max(5, Math.min(95, c.x + (Math.random() - 0.5) * 5)),
          y: Math.max(5, Math.min(95, c.y + (Math.random() - 0.5) * 5)),
          density: Math.max(50, Math.min(100, c.density + (Math.random() - 0.5) * 2)),
        }))
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="shadow-sm border-slate-200 bg-[#0F172A] p-4 h-full flex flex-col overflow-hidden relative group">
      <div className="flex items-center justify-between mb-2 relative z-10">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-emerald-400" />
          <h2 className="font-bold text-sm text-slate-100">Search Cluster Engine</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[9px] text-red-400 font-bold bg-red-500/10 px-1.5 py-0.5 rounded">
            <Skull className="w-2.5 h-2.5" /> High Pain
          </span>
          <span className="flex items-center gap-1 text-[9px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded">
            <Zap className="w-2.5 h-2.5" /> Opportunity
          </span>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden mt-2 bg-slate-900/50 rounded-lg border border-slate-800">
        {/* Network Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {clusters.map((c1, i) =>
            clusters.slice(i + 1).map((c2, j) => {
              // Draw lines only between close nodes to simulate clustering
              const dist = Math.hypot(c1.x - c2.x, c1.y - c2.y);
              if (dist > 50) return null;
              return (
                <motion.line
                  key={`${c1.id}-${c2.id}`}
                  x1={`${c1.x}%`}
                  y1={`${c1.y}%`}
                  x2={`${c2.x}%`}
                  y2={`${c2.y}%`}
                  stroke="rgba(99, 102, 241, 0.2)"
                  strokeWidth={1}
                  animate={{
                    x1: `${c1.x}%`,
                    y1: `${c1.y}%`,
                    x2: `${c2.x}%`,
                    y2: `${c2.y}%`,
                  }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              );
            })
          )}
        </svg>

        {/* Floating Nodes */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {clusters.map((cluster) => {
            const isPain = cluster.type === "pain";
            const colorClass = isPain 
              ? "bg-red-500/20 border-red-500/50 text-red-300" 
              : "bg-amber-500/20 border-amber-500/50 text-amber-300";
            
            // Size based on density
            const size = cluster.density / 2; 

            return (
              <motion.div
                key={cluster.id}
                animate={{
                  left: `${cluster.x}%`,
                  top: `${cluster.y}%`,
                }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-auto"
              >
                <div 
                  className={`rounded-full flex items-center justify-center border shadow-[0_0_15px_rgba(0,0,0,0.5)] backdrop-blur-sm ${colorClass}`}
                  style={{ width: size, height: size }}
                >
                  <span className="text-[8px] font-black opacity-80">{Math.round(cluster.density)}</span>
                </div>
                <div className="mt-1 flex flex-col items-center">
                  <span className="text-[9px] font-bold text-slate-200 whitespace-nowrap bg-slate-900/80 px-1 rounded">
                    {cluster.name}
                  </span>
                  <span className="text-[8px] font-bold text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-2 h-2" /> {cluster.growth}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
