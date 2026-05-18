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

  // Next-Gen Core Value Additions (REVERSE-RESEARCH-CORE-VALUE-REFOCUS-001)
  nextSearchMap?: NextSearchMapItem[];
  wantedApp?: WantedApp;
  mvpOneFeature?: MvpOneFeature;
  videoHooks?: VideoHooks;
  competitorGap?: CompetitorGap;
  appSpecPreview?: AppSpecPreview;
  decision?: Decision;
}

export interface NextSearchMapItem {
  keyword: string;
  stage: string;
  emotion: string;
  intent: string;
  priority: number;
  mvpPotential: number;
}

export interface WantedApp {
  name: string;
  targetUser: string;
  coreProblem: string;
  oneFeature: string;
  doNotBuild: string[];
  difficulty: string;
  estimatedDays: string;
  winRate: number;
}

export interface MvpOneFeature {
  build: string;
  remove: string[];
  first30secExperience: string;
  freeValue: string;
  paidValue: string;
}

export interface VideoHooks {
  tiktokTitles: string[];
  shortsTitles: string[];
  first3secHooks: string[];
  fifteenSecStructure: string;
  thirtySecStructure: string;
  cta: string;
  riskNotes: string;
}

export interface CompetitorGap {
  competitors: string[];
  weaknesses: string[];
  trustGap: string;
  uiGap: string;
  contentGap: string;
  winningAngle: string;
}

export interface AppSpecPreview {
  purpose: string;
  targetUsers: string[];
  features: string[];
  screens: string[];
  dataStructure: string[];
  prohibited: string[];
  safetyDesign: string[];
  testItems: string[];
}

export interface Decision {
  status: string;
  score: number;
  reasons: string[];
  nextAction: string;
}
