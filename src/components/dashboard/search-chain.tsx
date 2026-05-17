import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Link2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface SearchChainCardProps {
  sessionId?: string;
}

export function SearchChainCard({ sessionId }: SearchChainCardProps) {
  const [chains, setChains] = useState<{ parent_keyword: string | null; child_keyword: string }[]>([]);

  useEffect(() => {
    const fetchChains = async () => {
      if (!sessionId) return;
      const { data } = await supabase
        .from("intent_chains")
        .select("parent_keyword, child_keyword")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });
        
      if (data) setChains(data);
    };
    
    fetchChains();
  }, [sessionId]);

  if (!chains || chains.length <= 1) {
    return null; // Don't show if there's no chain yet
  }

  // Deduplicate and flatten the chain
  const keywords = [];
  if (chains[0].parent_keyword) keywords.push(chains[0].parent_keyword);
  chains.forEach(c => keywords.push(c.child_keyword));
  const uniqueChain = Array.from(new Set(keywords));

  return (
    <Card className="col-span-full shadow-sm border-gray-200 bg-white/50 backdrop-blur-sm">
      <CardHeader className="pb-3 border-b border-gray-100">
        <CardTitle className="flex items-center gap-2 text-lg text-gray-900">
          <Link2 className="w-5 h-5 text-ai-purple" />
          Intent Chain Graph
        </CardTitle>
        <CardDescription>現在のセッションでの検索連鎖（コンテキスト遷移）</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-wrap items-center gap-2">
          {uniqueChain.map((keyword, idx) => (
            <React.Fragment key={idx}>
              <div className="px-3 py-1.5 bg-ai-purple/10 text-ai-purple text-sm font-medium rounded-full border border-ai-purple/20">
                {keyword}
              </div>
              {idx < uniqueChain.length - 1 && (
                <ArrowRight className="w-4 h-4 text-gray-400" />
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
