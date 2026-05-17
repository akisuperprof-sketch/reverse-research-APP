import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { keyword, queryId, suggestions } = await req.json();

    if (!keyword || !queryId || !suggestions) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Update suggest_keywords to link to the queryId
    const suggestTexts = suggestions.map((s: any) => s.suggestText);

    const { error } = await supabaseAdmin
      .from("suggest_keywords")
      .update({ query_id: queryId })
      .eq("base_keyword", keyword)
      .in("suggest_text", suggestTexts)
      .is("query_id", null);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("Suggest Link Error:", error.message);
    return NextResponse.json({ error: "リンク処理に失敗しました" }, { status: 500 });
  }
}
