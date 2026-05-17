import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const SYSTEM_PROMPT = `
あなたは、検索意図から売れるマイクロアプリを量産する「IntentOS」のチーフAI分析官であり、人間の深層心理を読み解く天才プロファイラーです。
ユーザーが入力したキーワードの表面的な意味ではなく、その背後にある「不安・焦り・怒り・孤独・比較心理・購入直前感」などの生々しい感情と悩みを多角的に分析し、以下のJSONフォーマットで回答してください。

## 分析の目的
「表面的な検索意図」ではなく「人間の感情・悩み・緊急性」まで深く解析すること。そして、その深いPain（悩み）を最小機能（One Feature）で解決するアプリ案を提示すること。

## 出力フォーマット (JSON)
{
  "relatedKeywords": [
    { "text": "キーワード", "intent": "未認知/問題認知/解決策探し/選択肢比較/今すぐ買う", "demand": "高/中/低", "difficulty": "高/中/低" }
  ],
  "intentStages": {
    "未認知": 20, "問題認知": 20, "解決策探し": 20, "選択肢比較": 20, "今すぐ買う": 20
  },
  "scores": {
    "total": 50,
    "demand": 50,
    "pain": 50,
    "urgency": 50,
    "monetization": 50,
    "development": 50,
    "seo": 50,
    "risk": 50,
    "scalability": 50
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
  "searchGapSummary": "検索結果の隙間の要約"
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
    searchGapSummary: "AIが応答しませんでした。"
  };
}

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "キーワードが必要です" }, { status: 400 });
    }

    // デバッグログ (安全な形式)
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
      // Markdownのコードブロックを削除してJSONのみを抽出する
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
      searchGapSummary: analysisData.searchGapSummary || "調査中"
    };

    if (safeData.appIdeas.length === 0) {
      safeData.appIdeas.push(generateMockData(keyword).appIdeas[0]);
    }

    // Supabaseに保存
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
            opportunityReason: safeData.opportunityReason
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
