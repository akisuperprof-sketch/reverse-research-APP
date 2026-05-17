"use client";

import React, { useEffect, useState } from "react";
import { GitMerge, ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase/client";

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
    <Card className="shadow-sm border-slate-200 bg-white p-4 h-full flex flex-col overflow-hidden relative group">
      <div className="flex items-center gap-2 mb-4">
        <GitMerge className="w-4 h-4 text-indigo-500" />
        <h2 className="font-bold text-sm text-slate-800">検索連鎖 (Intent Chain)</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 relative">
        {displayChains.map((chain, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-center transition-colors hover:bg-indigo-50 hover:border-indigo-100 cursor-default">
              <span className="text-xs font-bold text-slate-700">{chain.current_keyword}</span>
            </div>
            {i < displayChains.length - 1 && (
              <div className="py-1">
                <ArrowDown className="w-3 h-3 text-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
