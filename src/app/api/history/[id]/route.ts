import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: queryId } = await params;

    if (!queryId) {
      return NextResponse.json({ error: "IDが必要です" }, { status: 400 });
    }

    // 1. 基本情報を取得
    const { data: query, error: queryError } = await supabaseAdmin
      .from("search_queries")
      .select("*")
      .eq("id", queryId)
      .single();

    if (queryError || !query) {
      return NextResponse.json({ error: "分析結果が見つかりません" }, { status: 404 });
    }

    // 2. 関連データを並列で取得
    const [appsRes, specRes, seoRes] = await Promise.all([
      supabaseAdmin.from("generated_apps").select("*").eq("query_id", queryId),
      supabaseAdmin.from("generated_specs").select("*").eq("query_id", queryId).single(),
      supabaseAdmin.from("seo_video_packs").select("*").eq("query_id", queryId).single(),
    ]);

    // 3. 型を統合して返す
    const result = {
      id: query.id,
      keyword: query.keyword,
      score: query.total_score,
      demandScore: query.scores?.demand || 0,
      painScore: query.scores?.pain || 0,
      urgencyScore: query.scores?.urgency || 0,
      monetizationScore: query.scores?.monetization || 0,
      developmentScore: query.scores?.development || 0,
      seoScore: query.scores?.seo || 0,
      riskScore: query.scores?.risk || 0,
      scalabilityScore: query.scores?.scalability || 0,
      competitionWeakness: query.search_gap_summary || "",
      emotionReason: query.emotion_data?.emotionReason || "データなし",
      urgencyLevel: query.emotion_data?.urgencyLevel || 50,
      purchaseIntent: query.emotion_data?.purchaseIntent || 50,
      futureSearches: query.emotion_data?.futureSearches || [],
      painReason: query.emotion_data?.painReason || "データなし",
      opportunityReason: query.emotion_data?.opportunityReason || "データなし",
      intentStats: query.intent_stages || {},
      appIdeas: appsRes.data || [],
      mvpSpec: specRes.data?.content || "",
      seoPack: seoRes.data?.seo_data || {},
      videoIdeas: seoRes.data?.video_ideas || [],
      createdAt: query.created_at
    };

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("History Fetch Error:", error);
    return NextResponse.json({ error: "データの取得に失敗しました" }, { status: 500 });
  }
}
