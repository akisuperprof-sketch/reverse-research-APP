import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const SYSTEM_PROMPT = `
あなたは、検索意図から売れる単機能マイクロアプリを企画・量産する「reverse research」のチーフAI分析官であり、人間の心理・行動・課金欲求を読み解く天才プロファイラーです。
ユーザーが入力したキーワードの背後にある「不安・焦り・怒り・孤独・比較心理・購入直前感」などの感情を深く解析し、以下のJSONフォーマットで回答してください。

## 分析の目的
表面的な関連語の提示を超え、「人間の悩み → 行動 → 課金」という一連のライフサイクルに特化し、「時系列の次検索予測」「ユーザーが本当に欲しい最小機能の特定」「心理的な競合ギャップ」「SNS動画フックの視聴維持率予測」「アフィリエイト・広告等の実行判断」までを自動生成・特定すること。
AI OS風の演出よりも、売れるアプリを決めるための『極めて精緻な企画立案データ値』の算出を最優先してください。

## 重要：セキュリティ・安全性・利用規約上の制約 (絶対に遵守してください)
特にSNS、LINE、Instagram、TikTok、メルカリなどのプラットフォームに関連する提案を行う場合：
- ログイン情報（ID/PW/アクセストークン等）の取得や入力を求める機能を絶対に提案しないでください。
- スクレイピング（自動データ収集）を前提とした設計にしないでください。
- 相手（第三者）を特定する、監視する、追跡するなどのプライバシー侵害になり得る機能を絶対に提案しないでください。
- 各種サービスの利用規約違反やAPI規約違反になる連携を提案しないでください。
- 「確定ブロック診断」などの断定的な機能を避け、不安を過剰に煽らないよう配慮してください。
- 安全で合法的、かつ心理的な負担を和らげる「代替MVP」へ変換してください。
  (例: NG「LINEブロックを完全に特定・判定するアプリ」 → OK「状況の心理的整理と対話ログ分析から次の行動を提示する診断ナビアプリ」)

## 出力フォーマット (JSON)
{
  "relatedKeywords": [
    { "text": "キーワード", "intent": "未認知/問題認知/解決策探し/選択肢比較/今すぐ買う", "demand": "高/中/低", "difficulty": "高/中/低" }
  ],
  "intentStages": {
    "未認知": 20, "問題認知": 20, "解決策探し": 20, "選択肢比較": 20, "今すぐ買う": 20
  },
  "scores": {
    "total": 50, "demand": 50, "pain": 50, "urgency": 50, "monetization": 50, "development": 50, "seo": 50, "risk": 50, "scalability": 50
  },
  "appIdeas": [
    {
      "name": "アプリ名",
      "description": "一言説明",
      "targetUser": "想定ユーザー",
      "features": ["機能1", "機能2"],
      "difficulty": "低/中/高",
      "days": "開発日数",
      "monetization": "収益モデル",
      "winScore": 50
    }
  ],
  "competitorInsights": [
    { "name": "競合名", "weakness": "弱点", "winnableReason": "勝てる理由" }
  ],
  "emotionReason": "ユーザーがなぜこの検索に至ったか、背後にある不安や焦り、怒りなどの根本感情とその理由",
  "urgencyLevel": 50,
  "purchaseIntent": 50,
  "futureSearches": ["数日後に検索しそうなキーワード1", "キーワード2", "キーワード3"],
  "painReason": "なぜこれが深い悩み（ペイン）なのかの理由",
  "opportunityReason": "なぜこれがビジネス・MVP化のチャンスになるのかの理由",
  "mvpSpec": "## MVP仕様書のMarkdown",
  "seoPack": {
    "title": "SEOタイトル",
    "description": "メタ説明文",
    "h1": "H1見出し"
  },
  "videoIdeas": [
    { "title": "動画タイトル", "type": "ターゲット層" }
  ],
  "launchPlan": [
    { "day": "Day 1", "title": "タスク名", "desc": "内容" }
  ],
  "risks": ["リスク1", "リスク2"],
  "oneFeatureRecommendation": "たった一つのコア機能",
  "searchGapSummary": "検索結果の隙間の要約",

  "nextSearchMap": [
    {
      "keyword": "時系列で次に検索する関連ワード",
      "stage": "検索段階(未認知/問題認知/解決策探し/選択肢比較/今すぐ買う)",
      "emotion": "その時の感情",
      "intent": "検索の目的・知りたいこと",
      "priority": 1から5の優先数値,
      "mvpPotential": 0から100のMVP化潜在率数値,
      "psychology": "そのワードへ遷移した時の詳細な心理変化（例：理由を知りたい → 諦めきれない → 依存的手段への傾倒）",
      "despairLevel": 0から100の絶望度数値,
      "dependencyLevel": 0から100の執着・依存度数値,
      "isPurchaseReady": trueまたはfalse(悩みが深まり課金直前フェーズに達しているか)
    }
  ],
  "wantedApp": {
    "name": "本当に求められている単機能アプリ名",
    "targetUser": "明確なターゲットユーザー層",
    "coreProblem": "解決するべき唯一かつ最大の悩み・問題",
    "oneFeature": "ユーザーが本当に欲しい唯一無二の最小機能",
    "doNotBuild": ["絶対に作ってはいけない機能スコープ"],
    "difficulty": "低/中/高",
    "estimatedDays": "開発日数",
    "winRate": 0から100の勝率数値,
    "whyWanted": "なぜそれが欲しいのかの根本的な行動心理",
    "whyExistingFails": "なぜ既存の解決策（検索結果や競合アプリ）ではダメなのか（UI不信感や広告多すぎ、安心感の決定的な不足）",
    "emotionTrigger": "ユーザーが利用を開始・熱狂する感情トリガー",
    "monetizationReason": "なぜお金を払うのかの具体的な課金理由",
    "firstDayScope": "初日に絶対に作るべき極小MVPの開発範囲・機能要件",
    "absoluteCut": ["初日から容赦なく削り取るべき機能リスト"]
  },
  "mvpOneFeature": {
    "build": "MVPで唯一作るべき超具体的な1つの機能",
    "remove": ["MVPから容赦なく削るべき機能リスト"],
    "first30secExperience": "ユーザーが最初の30秒で体験するアハ・モーメント（感動体験）",
    "freeValue": "完全無料で見せる価値・診断結果などの範囲",
    "paidValue": "有料化・プレミアムプランで提供すべき具体的な価値"
  },
  "videoHooks": {
    "tiktokTitles": ["TikTok向けタイトル案(3本)"],
    "shortsTitles": ["YouTube Shorts向けタイトル案(3本)"],
    "first3secHooks": ["冒頭3秒の強烈なフック言葉(3パターン)"],
    "fifteenSecStructure": "15秒版の起承転結・構成案",
    "thirtySecStructure": "30秒版の起承転結・構成案",
    "cta": "強力な行動喚起(CTA)文句",
    "riskNotes": "不安の過剰な煽りや炎上を防ぐためのリスク注意点・健全な啓発方針",
    "bestOpener": "最強の冒頭一言セリフ",
    "flameRate": 0から100のコメント炎上率予想数値,
    "saveRatePrediction": 0から100の保存率予想数値,
    "emotionDirection": "ユーザーの誘導先感情（安心/共感/冷静化/恐怖など）",
    "retentionPrediction": 0から100の平均視聴維持率予想数値,
    "genderMode": "female / male / unisex",
    "clickbaitRisk": 0から100の煽り危険度・シャドウバンリスク数値
  },
  "competitorGap": {
    "competitors": ["想定される競合"],
    "weaknesses": ["競合の最大の弱点"],
    "trustGap": "競合が満たせていない「信頼性の欠如」をどう埋めるか",
    "uiGap": "競合の「UIの古さや操作の面倒さ」に対してどう差別化するか",
    "contentGap": "既存情報の内容の薄さに対してどう圧倒するか",
    "winningAngle": "今回のMVPが競合に100%勝利するためのポジショニング・切り口",
    "emotionFrustration": "既存競合が引き起こしているユーザーの感情的ストレス・イライラ",
    "uiDistrust": "既存サイトのUIから感じる不信感・怪しさの具体内容（例：フィッシングっぽい、ログイン強要など）",
    "adAnnoyance": "既存情報の広告のうざさ、邪魔さのレベルの記述",
    "infoFatigue": "情報過多によるユーザーの疲れ、混乱ポイント",
    "trustShortage": "既存の解決手段において決定的に不足している『安心感』の要素"
  },
  "appSpecPreview": {
    "purpose": "アプリの明確な開発目的",
    "targetUsers": ["利用対象ユーザー"],
    "features": ["コア機能の一覧（絞り込む）"],
    "screens": ["想定されるシンプルな画面構成（例: 診断入力画面、結果表示画面）"],
    "dataStructure": ["簡易的なデータ構造（例: localStorageに保存するログデータ構造など）"],
    "prohibited": ["仕様上絶対に禁止する事項（例: サーバーへの個人情報保存の禁止など）"],
    "safetyDesign": ["利用規約やセキュリティを考慮した安全設計"],
    "testItems": ["仕様を満たしているか確認するためのテスト項目"]
  },
  "decision": {
    "status": "今すぐ作る / 小規模検証 / 広告だけ / 動画だけ / 捨てる",
    "score": 85,
    "reasons": ["判断に至った具体的な理由"],
    "nextAction": "次に実行するべき具体的なファーストステップ",
    "revenueSpeed": "高 / 中 / 低",
    "snsVirality": 0から100のSNS拡散性スコア数値,
    "aiGenerationEase": "高 / 中 / 低",
    "retentionRate": 0から100の推定継続率数値,
    "adCpc": "高 / 中 / 低",
    "affiliateFitness": "高 / 中 / 低"
  }
}

## 制約
- 必ず有効なJSONのみを返してください。
- Markdownのコードブロック(\`\`\`json)などは含めず、純粋なJSONテキストのみ出力してください。
- 日本語で回答してください。
- アプリ案は1〜3日で作れる「マイクロアプリ」に限定してください。
`;

function generateMockData(keyword: string) {
  return {
    relatedKeywords: [{ text: `${keyword} ツール`, intent: "解決策探し", demand: "中", difficulty: "中" }],
    intentStages: { "未認知": 20, "問題認知": 20, "解決策探し": 20, "選択肢比較": 20, "今すぐ買う": 20 },
    scores: { total: 50, demand: 50, pain: 50, urgency: 50, monetization: 50, development: 50, seo: 50, risk: 50, scalability: 50 },
    appIdeas: [
      {
        name: `${keyword} サポートツール`,
        description: "AIの分析が失敗したため、モックデータを表示しています。",
        targetUser: "検索ユーザー",
        features: ["基本機能1", "基本機能2"],
        difficulty: "中",
        days: "3日",
        monetization: "無料",
        winScore: 50
      }
    ],
    competitorInsights: [{ name: "既存ツール", weakness: "特になし", winnableReason: "特になし" }],
    emotionReason: "AIの分析が失敗したため、感情の理由は不明です。",
    urgencyLevel: 50,
    purchaseIntent: 50,
    futureSearches: ["モックデータ1", "モックデータ2"],
    painReason: "ペインの理由は解析できませんでした。",
    opportunityReason: "チャンスの理由は解析できませんでした。",
    mvpSpec: `## ${keyword} のMVP仕様書\nAIの分析が失敗したためモックを表示しています。`,
    seoPack: { title: `${keyword}のおすすめツール`, description: "モックディスクリプション", h1: `${keyword}について` },
    videoIdeas: [{ title: `${keyword}の解決法`, type: "Shorts" }],
    launchPlan: [{ day: "Day 1", title: "設計", desc: "設計開始" }],
    oneFeatureRecommendation: "検索機能",
    searchGapSummary: "AIが応答しませんでした。",

    nextSearchMap: [
      {
        keyword: `${keyword} 対処法`,
        stage: "解決策探し",
        emotion: "不安",
        intent: "安全な代替案を知りたい",
        priority: 4,
        mvpPotential: 75,
        psychology: "安心したい心理へのシフト",
        despairLevel: 45,
        dependencyLevel: 60,
        isPurchaseReady: false
      }
    ],
    wantedApp: {
      name: `${keyword} 状況整理シミュレーター`,
      targetUser: "モヤモヤしている検索ユーザー",
      coreProblem: "正確な情報がわからず不安が膨らんでいること",
      oneFeature: "対話型で状況を入力し客観的な可能性を提示するシミュレーション機能",
      doNotBuild: ["個人アカウントのハック", "利用規約に反する直接判定"],
      difficulty: "低",
      estimatedDays: "2日",
      winRate: 80,
      whyWanted: "自己解決できない漠然とした不安を客観的に可視化・沈静化させたいから",
      whyExistingFails: "既存サイトはアフィリエイト広告や怪しいツールへの登録強要が多いため",
      emotionTrigger: "「匿名で3秒で現状の心のモヤモヤが晴れる」という即時安心感",
      monetizationReason: "安心感の強化として専門的な対話スクリプトや冷徹な可能性スコアのPDF出力",
      firstDayScope: "3つの質問のステップと冷徹な診断ロジックだけの静的SPA",
      absoluteCut: ["ユーザー登録", "サーバー連携", "リアルタイムAPI接続"]
    },
    mvpOneFeature: {
      build: "3クリックで簡易診断できるジェネレーター",
      remove: ["外部API連携", "ユーザー登録機能", "データベース保存"],
      first30secExperience: "最初の質問に答えるだけで、即座に客観的な冷静な分析コメントが表示されること",
      freeValue: "基本診断とアドバイス",
      paidValue: "より深い個別シチュエーションごとの対話シミュレーションスクリプト"
    },
    videoHooks: {
      tiktokTitles: ["【絶対にやるな】これが起きた時の正しい対処法", "LINEブロックされたか不安な時にすぐできること"],
      shortsTitles: ["知らないと損する、不安の解消法", "ブロックされたかも？と感じた時のチェックシート"],
      first3secHooks: ["既読がつかなくて不安になっていませんか？", "実は、それ完全に勘違いかもしれません！"],
      fifteenSecStructure: "起: 不安の共感 → 承: 誤解の原因 → 転: 簡単なチェック方法 → 結: 診断ナビへ",
      thirtySecStructure: "起: 深夜のモヤモヤ解決 → 承: 既存のやり方は規約違反が多い危険 → 転: 安全に自分の心を整理する方法がある → 結: 診断ツールへの誘導",
      cta: "プロフィールのリンクから30秒でできる安全診断ナビを使ってみて！",
      riskNotes: "不安を過剰に煽らず、法的に安全で健全な方法を推奨するクリーンなブランディングを行う",
      bestOpener: "「既読無視するあの人、ブロックされたか調べる安全な方法知ってる？」",
      flameRate: 15,
      saveRatePrediction: 72,
      emotionDirection: "安心と自己省察",
      retentionPrediction: 65,
      genderMode: "unisex",
      clickbaitRisk: 25
    },
    competitorGap: {
      competitors: ["既存のフィッシング紛いの検証アプリ", "広告だらけの解説記事"],
      weaknesses: ["広告が多すぎて使いづらい", "判定精度が怪しい上に個人情報を求められる"],
      trustGap: "一切のログイン不要、完全匿名でユーザー自身の入力情報だけを整理して安心感を提供する",
      uiGap: "極限まで要素を削ぎ落としたスタイリッシュでクリーンなApple風1カラムUI",
      contentGap: "単なる解説ではなく、対話形式で今やるべき具体的なアクションプランをPDF化して持ち帰れる",
      winningAngle: "「判定する」のではなく「ユーザー自身の心を整理する」という健全・安全なポジショニング",
      emotionFrustration: "判定できずに個人情報だけ抜かれるかもしれないという怪しさ・ストレス",
      uiDistrust: "古臭いフォント、点滅する広告、ログイン強要から感じる危険な雰囲気",
      adAnnoyance: "「判定はこちら」と騙されて無駄なアフィリンクやアダルト広告を何度も踏まされる嫌悪感",
      infoFatigue: "長々としたSEO対策の引き伸ばし文章が多く、結局どうすればいいか一言でわからない混乱",
      trustShortage: "怪しいログイン認証をせずに、100%ローカル（端末内）で完結する安全設計の絶対的不足"
    },
    appSpecPreview: {
      purpose: "LINE等のコミュニケーション上の不安を客観的に整理し、健全な解決ステップを支援する",
      targetUsers: ["人間関係で不安や焦りを感じているスマホユーザー"],
      features: ["ステップ式カウンセリング診断機能", "診断結果に応じた次のアクションプラン表示機能"],
      screens: ["1. 診断開始トップ", "2. カウンセリング質問画面(3ステップ)", "3. 診断結果＆行動提案画面"],
      dataStructure: ["sessionState: { answers: string[], score: number }"],
      prohibited: ["SNSログイン情報やパスワードの入力要求の禁止", "外部サーバーへの診断データ送信"],
      safetyDesign: ["完全クライアントサイド動作による個人情報漏洩ゼロ設計"],
      testItems: ["質問を全回答して結果画面に正しく遷移すること", "診断ログがローカルで安全に完結していること"]
    },
    decision: {
      status: "小さく検証",
      score: 85,
      reasons: ["Painは深夜帯に極めて深い", "既存の競合は広告過多でUXが崩壊している", "完全匿名＆クライアント完結型のため規約リスクが完全にゼロで構築可能"],
      nextAction: "診断シミュレータのMVP画面（3ステップのモックアップ）を作成し、拡散動画の企画を進める",
      revenueSpeed: "中",
      snsVirality: 85,
      aiGenerationEase: "高",
      retentionRate: 40,
      adCpc: "中",
      affiliateFitness: "高"
    }
  };
}

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "キーワードが必要です" }, { status: 400 });
    }

    console.log("Analyze API Check:", {
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
      hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    });

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "GEMINI_API_KEYが設定されていません。" }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `${SYSTEM_PROMPT}\n\n分析対象キーワード: ${keyword}`;

    let analysisData;
    let geminiStatus = "success";
    let geminiErrorMsg = "";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text || "";
      const jsonText = text.replace(/```(json)?/g, "").replace(/```/g, "").trim();
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Valid JSON not found in response");
      
      analysisData = JSON.parse(jsonMatch[0]);
    } catch (e: any) {
      console.error("Gemini API or Parse Error:", e.message);
      geminiStatus = "error";
      geminiErrorMsg = e.message;
      analysisData = generateMockData(keyword);
    }

    // データバリデーション & 補完
    const fallback = generateMockData(keyword);
    const safeData = {
      relatedKeywords: Array.isArray(analysisData.relatedKeywords) ? analysisData.relatedKeywords : [],
      intentStages: analysisData.intentStages || { "未認知": 20, "問題認知": 20, "解決策探し": 20, "選択肢比較": 20, "今すぐ買う": 20 },
      scores: {
        total: Math.min(100, Math.max(0, analysisData.scores?.total || 50)),
        demand: Math.min(100, Math.max(0, analysisData.scores?.demand || 50)),
        pain: Math.min(100, Math.max(0, analysisData.scores?.pain || 50)),
        urgency: Math.min(100, Math.max(0, analysisData.scores?.urgency || 50)),
        monetization: Math.min(100, Math.max(0, analysisData.scores?.monetization || 50)),
        development: Math.min(100, Math.max(0, analysisData.scores?.development || 50)),
        seo: Math.min(100, Math.max(0, analysisData.scores?.seo || 50)),
        risk: Math.min(100, Math.max(0, analysisData.scores?.risk || 50)),
        scalability: Math.min(100, Math.max(0, analysisData.scores?.scalability || 50)),
      },
      appIdeas: (Array.isArray(analysisData.appIdeas) ? analysisData.appIdeas : []).slice(0, 5),
      competitorInsights: Array.isArray(analysisData.competitorInsights) ? analysisData.competitorInsights : [],
      emotionReason: analysisData.emotionReason || "未解析",
      urgencyLevel: Math.min(100, Math.max(0, analysisData.urgencyLevel || 50)),
      purchaseIntent: Math.min(100, Math.max(0, analysisData.purchaseIntent || 50)),
      futureSearches: Array.isArray(analysisData.futureSearches) ? analysisData.futureSearches : [],
      painReason: analysisData.painReason || "未解析",
      opportunityReason: analysisData.opportunityReason || "未解析",
      mvpSpec: analysisData.mvpSpec || `## ${keyword} のMVP仕様書\n仕様書が生成されませんでした。`,
      seoPack: analysisData.seoPack || { title: "", description: "", h1: "" },
      videoIdeas: analysisData.videoIdeas || [],
      launchPlan: analysisData.launchPlan || [],
      oneFeatureRecommendation: analysisData.oneFeatureRecommendation || "機能の絞り込み",
      searchGapSummary: analysisData.searchGapSummary || "調査中",

      // 新設Core Value属性 ＆ 拡張心理学属性 (安全にフォールバック)
      nextSearchMap: (Array.isArray(analysisData.nextSearchMap) ? analysisData.nextSearchMap : fallback.nextSearchMap).map((item: any, i: number) => {
        const itemFallback = fallback.nextSearchMap[i] || fallback.nextSearchMap[0];
        return {
          keyword: item.keyword || itemFallback.keyword,
          stage: item.stage || itemFallback.stage,
          emotion: item.emotion || itemFallback.emotion,
          intent: item.intent || itemFallback.intent,
          priority: item.priority || itemFallback.priority,
          mvpPotential: item.mvpPotential || itemFallback.mvpPotential,
          psychology: item.psychology || itemFallback.psychology,
          despairLevel: item.despairLevel !== undefined ? item.despairLevel : itemFallback.despairLevel,
          dependencyLevel: item.dependencyLevel !== undefined ? item.dependencyLevel : itemFallback.dependencyLevel,
          isPurchaseReady: item.isPurchaseReady !== undefined ? item.isPurchaseReady : itemFallback.isPurchaseReady,
        };
      }),
      wantedApp: {
        ...(analysisData.wantedApp || fallback.wantedApp),
        whyWanted: analysisData.wantedApp?.whyWanted || fallback.wantedApp.whyWanted,
        whyExistingFails: analysisData.wantedApp?.whyExistingFails || fallback.wantedApp.whyExistingFails,
        emotionTrigger: analysisData.wantedApp?.emotionTrigger || fallback.wantedApp.emotionTrigger,
        monetizationReason: analysisData.wantedApp?.monetizationReason || fallback.wantedApp.monetizationReason,
        firstDayScope: analysisData.wantedApp?.firstDayScope || fallback.wantedApp.firstDayScope,
        absoluteCut: analysisData.wantedApp?.absoluteCut || fallback.wantedApp.absoluteCut
      },
      mvpOneFeature: analysisData.mvpOneFeature || fallback.mvpOneFeature,
      videoHooks: {
        ...(analysisData.videoHooks || fallback.videoHooks),
        bestOpener: analysisData.videoHooks?.bestOpener || fallback.videoHooks.bestOpener,
        flameRate: analysisData.videoHooks?.flameRate !== undefined ? analysisData.videoHooks.flameRate : fallback.videoHooks.flameRate,
        saveRatePrediction: analysisData.videoHooks?.saveRatePrediction !== undefined ? analysisData.videoHooks.saveRatePrediction : fallback.videoHooks.saveRatePrediction,
        emotionDirection: analysisData.videoHooks?.emotionDirection || fallback.videoHooks.emotionDirection,
        retentionPrediction: analysisData.videoHooks?.retentionPrediction !== undefined ? analysisData.videoHooks.retentionPrediction : fallback.videoHooks.retentionPrediction,
        genderMode: analysisData.videoHooks?.genderMode || fallback.videoHooks.genderMode,
        clickbaitRisk: analysisData.videoHooks?.clickbaitRisk !== undefined ? analysisData.videoHooks.clickbaitRisk : fallback.videoHooks.clickbaitRisk
      },
      competitorGap: {
        ...(analysisData.competitorGap || fallback.competitorGap),
        emotionFrustration: analysisData.competitorGap?.emotionFrustration || fallback.competitorGap.emotionFrustration,
        uiDistrust: analysisData.competitorGap?.uiDistrust || fallback.competitorGap.uiDistrust,
        adAnnoyance: analysisData.competitorGap?.adAnnoyance || fallback.competitorGap.adAnnoyance,
        infoFatigue: analysisData.competitorGap?.infoFatigue || fallback.competitorGap.infoFatigue,
        trustShortage: analysisData.competitorGap?.trustShortage || fallback.competitorGap.trustShortage
      },
      appSpecPreview: analysisData.appSpecPreview || fallback.appSpecPreview,
      decision: {
        ...(analysisData.decision || fallback.decision),
        revenueSpeed: analysisData.decision?.revenueSpeed || fallback.decision.revenueSpeed,
        snsVirality: analysisData.decision?.snsVirality !== undefined ? analysisData.decision.snsVirality : fallback.decision.snsVirality,
        aiGenerationEase: analysisData.decision?.aiGenerationEase || fallback.decision.aiGenerationEase,
        retentionRate: analysisData.decision?.retentionRate !== undefined ? analysisData.decision.retentionRate : fallback.decision.retentionRate,
        adCpc: analysisData.decision?.adCpc || fallback.decision.adCpc,
        affiliateFitness: analysisData.decision?.affiliateFitness || fallback.decision.affiliateFitness
      }
    };

    if (safeData.appIdeas.length === 0) {
      safeData.appIdeas.push(generateMockData(keyword).appIdeas[0]);
    }

    // Supabaseに保存 (JSONB emotion_data 内部にすべて入れ込むことでスキーマ互換性を完全維持)
    let queryId: string | undefined;
    let supabaseStatus = "success";
    try {
      const { data: queryData, error: queryError } = await supabaseAdmin
        .from("search_queries")
        .insert([{ 
          keyword, 
          total_score: safeData.scores.total,
          intent_stages: safeData.intentStages,
          scores: safeData.scores,
          search_gap_summary: safeData.searchGapSummary,
          one_feature_recommendation: safeData.oneFeatureRecommendation,
          emotion_data: {
            emotionReason: safeData.emotionReason,
            urgencyLevel: safeData.urgencyLevel,
            purchaseIntent: safeData.purchaseIntent,
            futureSearches: safeData.futureSearches,
            painReason: safeData.painReason,
            opportunityReason: safeData.opportunityReason,
            
            // 新設項目をemotion_dataの中にラップ
            nextSearchMap: safeData.nextSearchMap,
            wantedApp: safeData.wantedApp,
            mvpOneFeature: safeData.mvpOneFeature,
            videoHooks: safeData.videoHooks,
            competitorGap: safeData.competitorGap,
            appSpecPreview: safeData.appSpecPreview,
            decision: safeData.decision
          }
        }])
        .select()
        .single();

      if (queryError) throw queryError;
      queryId = queryData.id;

      await Promise.all([
        supabaseAdmin.from("generated_apps").insert(
          safeData.appIdeas.map((app: any) => ({ 
            query_id: queryId, 
            ...app 
          }))
        ),
        supabaseAdmin.from("generated_specs").insert([{ 
          query_id: queryId, 
          content: safeData.mvpSpec 
        }]),
        supabaseAdmin.from("seo_video_packs").insert([{ 
          query_id: queryId, 
          seo_data: safeData.seoPack,
          video_ideas: safeData.videoIdeas
        }]),
        supabaseAdmin.from("analysis_logs").insert([{
          query_id: queryId,
          event_type: "ANALYSIS_COMPLETED",
          message: `Keyword: ${keyword} analyzed. Gemini Status: ${geminiStatus}`
        }])
      ]);
    } catch (dbError: any) {
      console.error("Supabase Error:", dbError.message);
      supabaseStatus = "error";
    }

    console.log(`Analysis Finished. Gemini: ${geminiStatus}, Supabase: ${supabaseStatus}`);

    return NextResponse.json({
      ...safeData,
      id: queryId,
      keyword,
      _debug: {
        geminiStatus,
        supabaseStatus,
        geminiErrorMsg
      }
    });

  } catch (error: any) {
    console.error("Fatal Route Error:", error.message);
    return NextResponse.json({ 
      error: "予期せぬエラーが発生しました",
      details: error.message
    }, { status: 500 });
  }
}
