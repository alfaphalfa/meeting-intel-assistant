import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// In-memory session tracking for transcriptions (resets on server restart)
interface TranscriptionSessionData {
  usageCount: number;
  createdAt: number;
}

const transcriptionSessionStore = new Map<string, TranscriptionSessionData>();
const DEMO_TRANSCRIPTION_LIMIT = 5;
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB Whisper limit

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const sessionId = formData.get("sessionId") as string | null;
    const password = formData.get("password") as string | null;

    // Authentication and rate limiting
    let isAdmin = false;
    let remainingTranscriptions: number | string = 0;

    // Check if admin password provided
    if (password) {
      if (password === process.env.ADMIN_PASSWORD) {
        isAdmin = true;
        remainingTranscriptions = "unlimited";
      } else {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 401 }
        );
      }
    } else if (sessionId) {
      // Demo mode - check session limits
      const session = transcriptionSessionStore.get(sessionId) || {
        usageCount: 0,
        createdAt: Date.now(),
      };

      if (session.usageCount >= DEMO_TRANSCRIPTION_LIMIT) {
        return NextResponse.json(
          {
            error: `Demo limit reached. You've used all ${DEMO_TRANSCRIPTION_LIMIT} free transcriptions. Please use admin password for unlimited access.`,
          },
          { status: 429 }
        );
      }

      // Increment usage
      session.usageCount += 1;
      transcriptionSessionStore.set(sessionId, session);
      remainingTranscriptions = DEMO_TRANSCRIPTION_LIMIT - session.usageCount;
    } else {
      return NextResponse.json(
        {
          error:
            "Authentication required. Please provide sessionId or password.",
        },
        { status: 401 }
      );
    }

    // Validate file
    if (!file) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size is 25MB. Your file is ${(file.size / 1024 / 1024).toFixed(2)}MB.`,
        },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = [
      "audio/mpeg",
      "audio/mp3",
      "audio/wav",
      "audio/m4a",
      "audio/webm",
      "audio/mp4",
      "video/mp4",
      "video/webm",
      "audio/ogg",
      "audio/flac",
    ];

    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    const isValidType =
      allowedTypes.includes(fileType) ||
      fileName.endsWith(".mp3") ||
      fileName.endsWith(".mp4") ||
      fileName.endsWith(".wav") ||
      fileName.endsWith(".m4a") ||
      fileName.endsWith(".webm") ||
      fileName.endsWith(".ogg") ||
      fileName.endsWith(".flac");

    if (!isValidType) {
      return NextResponse.json(
        {
          error: `Unsupported file format. Supported formats: MP3, MP4, WAV, M4A, WebM, OGG, FLAC. You uploaded: ${file.type || "unknown"}`,
        },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Convert File to format OpenAI expects
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileBlob = new Blob([buffer], { type: file.type });
    const fileForOpenAI = new File([fileBlob], file.name, { type: file.type });

    // Transcribe using Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: fileForOpenAI,
      model: "whisper-1",
      language: "en", // Optional: can be removed to auto-detect
    });

    return NextResponse.json({
      text: transcription.text,
      remainingTranscriptions,
      isAdmin,
    });
  } catch (error) {
    console.error("Error transcribing audio:", error);

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to transcribe audio file" },
      { status: 500 }
    );
  }
}
