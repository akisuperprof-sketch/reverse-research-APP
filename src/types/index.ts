export interface Keyword {
  text: string;
  intent: "未認知" | "問題認知" | "解決策探し" | "選択肢比較" | "今すぐ買う";
  demand: "高" | "中" | "低";
  difficulty: "高" | "中" | "低";
}

export interface AppIdea {
  name: string;
  description: string;
  targetUser: string;
  features: string[];
  difficulty: string;
  days: string;
  monetization: string;
  winScore: number;
}

export interface AnalysisResult {
  keyword: string;
  score: number;
  demandScore: number;
  painScore: number;
  urgencyScore: number;
  monetizationScore: number;
  developmentScore: number;
  relatedKeywords: Keyword[];
  intentStats: Record<string, number>;
  appIdeas: AppIdea[];
}
