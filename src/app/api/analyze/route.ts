import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
あなたは、検索意図から売れるマイクロアプリを量産する「IntentOS」のチーフAI分析官です。
ユーザーが入力したキーワードを多角的に分析し、以下のJSONフォーマットで回答してください。

## 分析の目的
「思いつきでアプリを作る」のではなく、検索需要の隙間（Search Gap）を見つけ、最小機能（One Feature）で解決するアプリ案を提示すること。

## 出力フォーマット (JSON)
{
  "relatedKeywords": [
    { "text": "キーワード", "intent": "未認知/問題認知/解決策探し/選択肢比較/今すぐ買う", "demand": "高/中/低", "difficulty": "高/中/低" }
  ],
  "intentStages": {
    "未認知": 割合(%), "問題認知": 割合(%), "解決策探し": 割合(%), "選択肢比較": 割合(%), "今すぐ買う": 割合(%)
  },
  "scores": {
    "total": 総合点(0-100),
    "demand": 検索需要(0-100),
    "pain": 悩みの強さ(0-100),
    "urgency": 緊急度(0-100),
    "monetization": 収益性(0-100),
    "development": 作りやすさ(0-100),
    "seo": SEO適性(0-100),
    "risk": リスク低さ(0-100)
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
      "winScore": 勝利確率(0-100)
    }
  ],
  "competitorInsights": [
    { "name": "競合名", "weakness": "弱点", "winnableReason": "勝てる理由" }
  ],
  "mvpSpec": "## MVP仕様書のMarkdown...",
  "seoPack": {
    "title": "SEOタイトル",
    "description": "メタ説明文",
    "h1": "H1見出し"
  },
  "videoIdeas": [
    { "title": "動画タイトル", "type": "ターゲット層" }
  ],
  "launchPlan": [
    { "day": "Day 1", "title": "...", "desc": "..." }
  ],
  "risks": ["リスク1", "リスク2"],
  "oneFeatureRecommendation": "このアプリの核となる『たった一つの機能』の提案",
  "searchGapSummary": "検索結果のどこに隙間があるかの要約"
}

## 制約
- 必ず有効なJSONのみを返してください。
- 日本語で回答してください。
- アプリ案は1〜3日で作れる「マイクロアプリ」に限定してください。
`;

export async function POST(req: Request) {
  try {
    const { keyword } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "キーワードが必要です" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `${SYSTEM_PROMPT}\n\n分析対象キーワード: ${keyword}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let analysisData;
    try {
      // JSONの抽出 (Markdownのコードブロックで囲まれている場合を考慮)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("JSON not found");
      analysisData = JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("JSON Parse Error. Raw text:", text);
      throw new Error("AIの回答を解析できませんでした。もう一度お試しください。");
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
      mvpSpec: analysisData.mvpSpec || `## ${keyword} のMVP仕様書\nAIが詳細な仕様書を生成できませんでした。以下のアプリ案を確認してください。`,
      seoPack: analysisData.seoPack || { title: "", description: "", h1: "" },
      videoIdeas: analysisData.videoIdeas || [],
      launchPlan: analysisData.launchPlan || [],
      oneFeatureRecommendation: analysisData.oneFeatureRecommendation || "機能の絞り込み",
      searchGapSummary: analysisData.searchGapSummary || "競合調査中"
    };

    if (safeData.appIdeas.length === 0) {
      safeData.appIdeas.push({
        name: `${keyword} 解決ツール`,
        description: "シンプルな解決ツール",
        targetUser: "検索ユーザー",
        features: ["基本機能"],
        difficulty: "低",
        days: "1日",
        monetization: "無料",
        winScore: 50
      });
    }

    // Supabaseに保存
    const { data: queryData, error: queryError } = await supabaseAdmin
      .from("search_queries")
      .insert([{ 
        keyword, 
        total_score: safeData.scores.total,
        intent_stages: safeData.intentStages,
        scores: safeData.scores,
        search_gap_summary: safeData.searchGapSummary,
        one_feature_recommendation: safeData.oneFeatureRecommendation
      }])
      .select()
      .single();

    if (queryError) {
      console.error("Query Save Error:", queryError);
    } else if (queryData) {
      const queryId = queryData.id;

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
      ]);
    }

    return NextResponse.json({
      ...safeData,
      id: queryData?.id,
      keyword
    });

  } catch (error: any) {
    console.error("Analysis Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
