import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface ActionItem {
  task: string;
  owner: string;
  deadline?: string;
}

interface RiskFlag {
  type: string;
  description: string;
  severity: "low" | "medium" | "high";
}

interface AnalysisResult {
  keyDecisions: string[];
  actionItems: ActionItem[];
  openQuestions: string[];
  riskFlags: RiskFlag[];
  nextSteps: string[];
}

// In-memory session tracking (resets on server restart)
interface SessionData {
  usageCount: number;
  createdAt: number;
}

const sessionStore = new Map<string, SessionData>();
const DEMO_LIMIT = 5;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Support both 'transcript' and 'meetingText' for backward compatibility
    const transcript = body.transcript || body.meetingText;
    const { sessionId, password } = body;

    // Authentication and rate limiting
    let isAdmin = false;
    let remainingUses = 0;

    // Check if admin password provided
    if (password) {
      if (password === process.env.ADMIN_PASSWORD) {
        isAdmin = true;
        remainingUses = -1; // Unlimited
      } else {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 401 }
        );
      }
    } else if (sessionId) {
      // Demo mode - check session limits
      const session = sessionStore.get(sessionId) || {
        usageCount: 0,
        createdAt: Date.now(),
      };

      if (session.usageCount >= DEMO_LIMIT) {
        return NextResponse.json(
          { error: "Demo limit reached. Please use admin password for unlimited access." },
          { status: 429 }
        );
      }

      // Increment usage
      session.usageCount += 1;
      sessionStore.set(sessionId, session);
      remainingUses = DEMO_LIMIT - session.usageCount;
    } else {
      return NextResponse.json(
        { error: "Authentication required. Please provide sessionId or password." },
        { status: 401 }
      );
    }

    if (!transcript || typeof transcript !== "string") {
      return NextResponse.json(
        { error: "Meeting transcript is required" },
        { status: 400 }
      );
    }

    if (transcript.trim().length < 10) {
      return NextResponse.json(
        { error: "Meeting transcript is too short" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const prompt = `You are analyzing a meeting transcript or notes. Extract structured information and return ONLY valid JSON (no markdown, no code blocks).

Analyze this meeting:
${transcript}

Return JSON with these exact keys:
{
  "keyDecisions": ["decision 1", "decision 2"],
  "actionItems": [
    {"task": "description", "owner": "person name", "deadline": "date or null"}
  ],
  "openQuestions": ["question 1", "question 2"],
  "riskFlags": [
    {"type": "blocker|conflict|unclear", "description": "...", "severity": "high|medium|low"}
  ],
  "nextSteps": ["step 1 with timeline", "step 2"]
}

Be specific and extract actual details from the meeting. If a category has no items, use an empty array.`;

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Extract JSON from the response
    let analysisResult: AnalysisResult;
    try {
      // Try to parse the entire response as JSON
      analysisResult = JSON.parse(content.text);
    } catch {
      // If that fails, try to extract JSON from markdown code blocks
      const jsonMatch = content.text.match(/```(?:json)?\s*(\{[\s\S]*\})\s*```/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[1]);
      } else {
        // Last attempt: look for JSON object anywhere in the text
        const objectMatch = content.text.match(/\{[\s\S]*\}/);
        if (objectMatch) {
          analysisResult = JSON.parse(objectMatch[0]);
        } else {
          throw new Error("Could not parse analysis result");
        }
      }
    }

    // Validate structure
    const validatedResult: AnalysisResult = {
      keyDecisions: Array.isArray(analysisResult.keyDecisions) ? analysisResult.keyDecisions : [],
      actionItems: Array.isArray(analysisResult.actionItems) ? analysisResult.actionItems : [],
      openQuestions: Array.isArray(analysisResult.openQuestions) ? analysisResult.openQuestions : [],
      riskFlags: Array.isArray(analysisResult.riskFlags) ? analysisResult.riskFlags : [],
      nextSteps: Array.isArray(analysisResult.nextSteps) ? analysisResult.nextSteps : [],
    };

    return NextResponse.json({
      ...validatedResult,
      remainingUses,
      isAdmin,
    });
  } catch (error) {
    console.error("Error analyzing meeting:", error);

    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: `API Error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze meeting transcript" },
      { status: 500 }
    );
  }
}
