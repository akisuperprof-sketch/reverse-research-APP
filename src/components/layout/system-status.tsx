import React from "react";
import { CheckCircle2, AlertCircle, XCircle, Activity } from "lucide-react";

export function SystemStatusSidebar() {
  const systems = [
    { name: "Gemini 1.5 Flash", status: "online" },
    { name: "Supabase DB", status: "online" },
    { name: "Suggest API", status: "online" },
    { name: "Emotion Engine", status: "online" },
    { name: "History Sync", status: "online" },
  ];

  return (
    <div className="w-[320px] flex-shrink-0 border-l border-slate-200 bg-[#F8FAFC] flex flex-col h-full overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-white">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Activity className="w-4 h-4 text-blue-600" />
          システムステータス
        </h2>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto space-y-6">
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

        <div className="mt-8 bg-slate-900 rounded-xl p-4 relative overflow-hidden text-white shadow-md">
          <div className="relative z-10 flex flex-col items-center text-center space-y-2">
            <img src="/rever-var-1.png" alt="Rever" className="w-20 h-20 object-contain mb-1" />
            <h3 className="text-sm font-bold">REVER AI Console</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              全ての検索連鎖と感情データは最適化され、安全に保管されています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
