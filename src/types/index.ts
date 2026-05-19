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
  // Enhanced
  psychology?: string;
  despairLevel?: number; // 0-100
  dependencyLevel?: number; // 0-100
  isPurchaseReady?: boolean;
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
  // Enhanced
  whyWanted?: string;
  whyExistingFails?: string;
  emotionTrigger?: string;
  monetizationReason?: string;
  firstDayScope?: string;
  absoluteCut?: string[];
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
  // Enhanced
  bestOpener?: string;
  flameRate?: number; // 0-100
  saveRatePrediction?: number; // 0-100
  emotionDirection?: string;
  retentionPrediction?: number; // 0-100
  genderMode?: "female" | "male" | "unisex";
  clickbaitRisk?: number; // 0-100
}

export interface CompetitorGap {
  competitors: string[];
  weaknesses: string[];
  trustGap: string;
  uiGap: string;
  contentGap: string;
  winningAngle: string;
  // Enhanced
  emotionFrustration?: string;
  uiDistrust?: string;
  adAnnoyance?: string;
  infoFatigue?: string;
  trustShortage?: string;
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
  status: string; // 今すぐ作る / 小規模検証 / 広告だけ / 動画だけ / 捨てる
  score: number;
  reasons: string[];
  nextAction: string;
  // Enhanced
  revenueSpeed?: string; // 高/中/低
  snsVirality?: number; // 0-100
  aiGenerationEase?: string; // 高/中/低
  retentionRate?: number; // 0-100
  adCpc?: string; // 高/中/低
  affiliateFitness?: string; // 高/中/低
}
