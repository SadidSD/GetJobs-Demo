import { NextResponse } from "next/server";
import { generateJobSuggestions } from "../../../../lib/ai";
import type { JobSuggestionRequest, JobSuggestionResponse } from "../../../../types";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<JobSuggestionRequest>;
    const skills = (body?.skills || []).map((s) => s?.toString().trim()).filter(Boolean);
    if (!skills.length) {
      return NextResponse.json(
        { error: "Provide 'skills' as a non-empty array of strings." },
        { status: 400 }
      );
    }

    const jobs = await generateJobSuggestions({ skills });
    const payload: JobSuggestionResponse = { jobs };
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON or server error." }, { status: 500 });
  }
}