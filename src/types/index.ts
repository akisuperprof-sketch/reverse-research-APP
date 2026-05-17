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
  id?: string;
  keyword: string;
  score: number;
  demandScore: number;
  painScore: number;
  urgencyScore: number;
  monetizationScore: number;
  developmentScore: number;
  seoScore: number;
  riskScore: number;
  scalabilityScore: number;
  competitionWeakness: string;
  competitorInsights?: { name: string; weakness: string; winnableReason: string }[];
  relatedKeywords: Keyword[];
  intentStats: Record<string, number>;
  appIdeas: AppIdea[];
  mvpSpec?: string;
  // Deep Emotion & Psychology Additions
  emotionReason?: string;
  urgencyLevel?: number;
  purchaseIntent?: number;
  futureSearches?: string[];
  painReason?: string;
  opportunityReason?: string;
  
  seoPack?: {
    title: string;
    description: string;
    h1: string;
    videos: { title: string; type: string }[];
  };
  videoIdeas?: { title: string; type: string }[];
  launchPlan?: { day: string; title: string; desc: string }[];
  createdAt?: string;
  // Suggest Collector Additions
  suggestions?: {
    suggestText: string;
    emotion: string;
    painScore: number;
    opportunityScore: number;
  }[];
  sessionId?: string;
}
