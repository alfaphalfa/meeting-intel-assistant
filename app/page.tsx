"use client";

import { useState } from "react";
import { Loader2, Trash2, FileText } from "lucide-react";
import MeetingResults from "@/components/MeetingResults";
import DocQA from "@/components/DocQA";
import MetricsDashboard from "@/components/MetricsDashboard";
import { SAMPLE_MEETING } from "@/lib/sampleMeeting";

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

export default function Home() {
  const [meetingText, setMeetingText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Metrics tracking - initialized with demo numbers
  const [totalMeetings, setTotalMeetings] = useState(10);
  const [totalActionItems, setTotalActionItems] = useState(45);

  const analyzeMeeting = async () => {
    if (!meetingText.trim()) {
      setError("Please enter meeting text to analyze");
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meetingText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze meeting");
      }

      const data = await response.json();
      setResults(data);

      // Update metrics
      setTotalMeetings((prev) => prev + 1);
      setTotalActionItems((prev) => prev + (data.actionItems?.length || 0));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const clearAll = () => {
    setMeetingText("");
    setResults(null);
    setError(null);
  };

  const loadSample = () => {
    setMeetingText(SAMPLE_MEETING);
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-netflix-black flex flex-col">
      {/* Header */}
      <header className="border-b border-netflix-gray/30 bg-netflix-black/95 backdrop-blur-md sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              <span className="text-white">Meeting Intelligence</span>{" "}
              <span className="text-netflix-red">Assistant</span>
            </h1>
            <p className="text-lg sm:text-xl text-netflix-gray mt-3 font-light leading-relaxed">
              AI-Powered Productivity Demo for Netflix
            </p>
            <div className="mt-4 w-24 h-1 bg-gradient-to-r from-netflix-red via-netflix-red to-transparent mx-auto rounded-full"></div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Input Section */}
        <div className="bg-netflix-black border border-netflix-gray/30 rounded-xl p-6 sm:p-8 mb-10 hover:border-netflix-gray/50 transition-all duration-300 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
            <div>
              <label className="text-2xl font-bold text-white block leading-tight">
                Meeting Transcript
              </label>
              <p className="text-base text-netflix-gray mt-2 leading-relaxed">
                Paste meeting notes, transcripts, or recordings (500-5000 characters recommended)
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-sm font-medium ${
                meetingText.length > 5000 ? 'text-yellow-400' :
                meetingText.length > 500 ? 'text-green-400' :
                'text-netflix-gray'
              }`}>
                {meetingText.length.toLocaleString()} chars
              </span>
              <button
                onClick={loadSample}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-netflix-gray/20 hover:bg-netflix-gray/30 text-white rounded-md transition-all duration-200 hover:scale-105"
              >
                <FileText className="w-4 h-4" />
                Load Sample
              </button>
              <button
                onClick={clearAll}
                disabled={!meetingText && !results}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-netflix-gray/20 hover:bg-netflix-gray/30 text-white rounded-md transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Trash2 className="w-4 h-4" />
                Clear
              </button>
            </div>
          </div>

          <textarea
            value={meetingText}
            onChange={(e) => setMeetingText(e.target.value)}
            placeholder="Paste your meeting transcript or notes here...&#10;&#10;Example:&#10;Meeting: Product Planning&#10;Date: Oct 2, 2024&#10;&#10;Sarah: Let's discuss the Q4 launch timeline...&#10;Mike: We need 3 more weeks for optimization..."
            className="w-full h-80 bg-netflix-black border border-netflix-gray/50 rounded-xl p-5 text-white placeholder-netflix-gray/70 focus:outline-none focus:ring-2 focus:ring-netflix-red focus:border-transparent resize-none transition-all duration-200 text-base leading-relaxed shadow-inner"
          />

          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <button
              onClick={analyzeMeeting}
              disabled={isAnalyzing || !meetingText.trim()}
              className="w-full sm:w-auto px-10 py-4 bg-netflix-red hover:bg-netflix-red/90 text-white font-bold text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:scale-105 disabled:hover:scale-100 shadow-xl hover:shadow-netflix-red/50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Meeting"
              )}
            </button>

            <p className="text-xs text-netflix-gray">
              AI-powered analysis takes 5-15 seconds
            </p>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-netflix-red/20 border border-netflix-red rounded-lg text-netflix-red animate-fade-in">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        {results && <MeetingResults results={results} />}

        {/* Metrics Dashboard - Show after first analysis */}
        {totalMeetings > 0 && (
          <div className="mt-8">
            <MetricsDashboard
              totalMeetings={totalMeetings}
              totalActionItems={totalActionItems}
              estimatedMinutes={totalMeetings * 25}
            />
          </div>
        )}

        {/* Doc QA Demo Section */}
        <div className="mt-10">
          <DocQA />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-netflix-gray/30 bg-netflix-black/95 backdrop-blur-md mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-netflix-gray text-sm leading-relaxed">
              Built with{" "}
              <span className="text-netflix-red">♥</span>{" "}
              by{" "}
              <span className="text-white font-medium">Kevin Andrews</span>
              {" "}for the Product Manager - GenAI Position
            </p>
            <div className="mt-4 flex items-center justify-center gap-6">
              <a
                href="https://github.com/yourusername/meeting-intel-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="text-netflix-gray hover:text-netflix-red transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View Source
              </a>
              <span className="text-netflix-gray/50">•</span>
              <span className="text-netflix-gray text-sm">
                Powered by Claude Sonnet 4.5
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
