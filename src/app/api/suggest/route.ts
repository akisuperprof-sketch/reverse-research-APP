import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

const SYSTEM_PROMPT = `
あなたは検索意図分析の専門家です。
ユーザーが検索窓に入力したベースキーワードに関連する「サジェストキーワード群」が与えられます。
それぞれのサジェストキーワードに対して、背後にあるユーザーの心理を分析し、以下のJSON形式の配列で返してください。

## 出力フォーマット（JSONの配列のみを出力）
[
  {
    "suggestText": "サジェストキーワード",
    "emotion": "不安/比較/怒り/緊急/購入直前/悩み/調査",
    "painScore": 0から100の整数 (悩みの深さ・切実さ),
    "opportunityScore": 0から100の整数 (ビジネス・MVP化のチャンス度)
  }
]

## 制約
- 必ず有効なJSON配列のみを出力してください。Markdownのコードブロックは不要です。
- 全ての入力サジェストキーワードを網羅してください。
`;

export async function POST(req: Request) {
  try {
    const { keyword, queryId, sessionId, previousKeyword } = await req.json();

    if (!keyword) {
      return NextResponse.json({ error: "キーワードが必要です" }, { status: 400 });
    }

    // 1. Google Suggest APIから軽量にサジェストを取得（ラッコキーワード等の代用として最も高速・安定）
    const suggestRes = await fetch(`http://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(keyword)}`);
    if (!suggestRes.ok) {
      throw new Error("Suggest API failed");
    }
    const suggestData = await suggestRes.json();
    const suggestions: string[] = suggestData[1] || [];
    
    // 最大10件に絞る
    const topSuggestions = suggestions.slice(0, 10);

    let analyzedSuggestions = [];
    let geminiStatus = "success";
    
    if (topSuggestions.length > 0) {
      // 2. Geminiで感情分類とスコアリング
      if (!process.env.GEMINI_API_KEY) {
         throw new Error("GEMINI_API_KEY not set");
      }
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `${SYSTEM_PROMPT}\n\n対象キーワード群:\n${topSuggestions.join("\n")}`;

      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        const text = response.text || "";
        const jsonText = text.replace(/```(json)?/g, "").replace(/```/g, "").trim();
        const jsonMatch = jsonText.match(/\[[\s\S]*\]/);
        
        if (jsonMatch) {
          analyzedSuggestions = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error("Invalid JSON array");
        }
      } catch (e: any) {
        console.error("Gemini Suggest Analysis Error:", e.message);
        geminiStatus = "error";
        // フォールバック
        analyzedSuggestions = topSuggestions.map(text => ({
          suggestText: text,
          emotion: "調査",
          painScore: 50,
          opportunityScore: 50
        }));
      }
    }

    // 3. Supabaseへ保存 (Additive Only)
    let dbStatus = "success";
    try {
      // Intent Chain
      if (sessionId && previousKeyword) {
        await supabaseAdmin.from("intent_chains").insert([{
          session_id: sessionId,
          parent_keyword: previousKeyword,
          child_keyword: keyword
        }]);
      }

      // Suggest & Emotions
      if (queryId && analyzedSuggestions.length > 0) {
        const suggestInserts = analyzedSuggestions.map((item: any) => ({
          query_id: queryId,
          base_keyword: keyword,
          suggest_text: item.suggestText || item.suggest_text,
          source: 'google_suggest'
        }));

        const { data: insertedSuggests, error: suggestError } = await supabaseAdmin
          .from("suggest_keywords")
          .insert(suggestInserts)
          .select();

        if (suggestError) throw suggestError;

        if (insertedSuggests && insertedSuggests.length > 0) {
          const emotionInserts = analyzedSuggestions.map((item: any, idx: number) => ({
            suggest_id: insertedSuggests[idx].id,
            emotion_category: item.emotion || "調査",
            pain_score: Math.min(100, Math.max(0, item.painScore || 50)),
            opportunity_score: Math.min(100, Math.max(0, item.opportunityScore || 50))
          }));

          await supabaseAdmin.from("emotion_scores").insert(emotionInserts);
        }
      }
    } catch (dbError: any) {
      console.error("Supabase Suggest Save Error:", dbError.message);
      dbStatus = "error";
    }

    return NextResponse.json({
      success: true,
      suggestions: analyzedSuggestions,
      _debug: { geminiStatus, dbStatus }
    });

  } catch (error: any) {
    console.error("Suggest API Fatal Error:", error.message);
    return NextResponse.json({ error: "サジェスト取得に失敗しました", details: error.message }, { status: 500 });
  }
}
