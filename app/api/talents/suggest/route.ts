import { NextResponse } from "next/server";
import { generateTalentSuggestions } from "../../../../lib/ai";
import type { TalentSuggestionRequest, TalentSuggestionResponse } from "../../../../types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<TalentSuggestionRequest>;
    const requirements = (body?.requirements || [])
      .map((s) => s?.toString().trim())
      .filter(Boolean);
    if (!requirements.length) {
      return NextResponse.json(
        { error: "Provide 'requirements' as a non-empty array of strings." },
        { status: 400 }
      );
    }

    const talents = await generateTalentSuggestions({ requirements });
    const payload: TalentSuggestionResponse = { talents };
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON or server error." }, { status: 500 });
  }
}