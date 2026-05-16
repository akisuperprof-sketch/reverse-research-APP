"use client";

import React from "react";
import { TrendingUp, DollarSign, Users, MousePointer2, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

const data = [
  { month: "1ヶ月", revenue: 0 },
  { month: "2ヶ月", revenue: 5000 },
  { month: "3ヶ月", revenue: 12000 },
  { month: "4ヶ月", revenue: 25000 },
  { month: "5ヶ月", revenue: 45000 },
  { month: "6ヶ月", revenue: 85000 },
];

export function RevenueSimulationCard() {
  return (
    <Card className="bento-card col-span-full lg:col-span-1">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-green-500" />
        <h2 className="font-bold text-lg">収益予測シミュレーション</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
          <p className="text-[10px] text-green-600 font-bold uppercase mb-1">想定月商 (6ヶ月後)</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-green-700">¥85,000</span>
            <span className="text-[10px] text-green-600">/月</span>
          </div>
        </div>
        <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100">
          <p className="text-[10px] text-blue-600 font-bold uppercase mb-1">損益分岐点</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-blue-700">2.5</span>
            <span className="text-[10px] text-blue-600">ヶ月</span>
          </div>
        </div>
      </div>

      <div className="h-32 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 'bold', fontSize: '10px' }}
              itemStyle={{ fontSize: '10px', fontWeight: 'bold', color: '#10b981' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#10b981" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="w-3 h-3" /> 月間PV
          </div>
          <span className="font-bold">12,000 PV</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MousePointer2 className="w-3 h-3" /> CVR (無料→有料)
          </div>
          <span className="font-bold">1.2%</span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <DollarSign className="w-3 h-3" /> 客単価
          </div>
          <span className="font-bold">¥500 /月</span>
        </div>
      </div>
    </Card>
  );
}
