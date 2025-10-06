"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, FileAudio, X, ChevronDown, ChevronUp, Check } from "lucide-react";

interface AudioUploaderProps {
  onTranscriptionComplete: (text: string) => void;
  sessionId: string | null;
  password: string | null;
  authMode: "demo" | "admin";
  remainingTranscriptions: number;
  onUpdateRemainingTranscriptions: (remaining: number) => void;
}

export default function AudioUploader({
  onTranscriptionComplete,
  sessionId,
  password,
  authMode,
  remainingTranscriptions,
  onUpdateRemainingTranscriptions,
}: AudioUploaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const estimateDuration = (fileSize: number): string => {
    // Rough estimate: 1MB ≈ 1 minute for audio
    const minutes = Math.round(fileSize / (1024 * 1024));
    return minutes > 0 ? `~${minutes} min` : "<1 min";
  };

  const estimateCost = (fileSize: number): string => {
    // OpenAI Whisper: $0.006 per minute
    const minutes = fileSize / (1024 * 1024);
    const cost = minutes * 0.006;
    return cost > 0.01 ? `~$${cost.toFixed(2)}` : "<$0.01";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setError(null);
      setTranscribedText(null);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setTranscribedText(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleTranscribe = async () => {
    if (!selectedFile) {
      setError("Please select an audio file first");
      return;
    }

    setIsTranscribing(true);
    setError(null);
    setTranscribedText(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      // Add authentication credentials
      if (authMode === "admin" && password) {
        formData.append("password", password);
      } else if (sessionId) {
        formData.append("sessionId", sessionId);
      }

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to transcribe audio");
      }

      const data = await response.json();
      setTranscribedText(data.text);

      // Update remaining transcriptions
      if (typeof data.remainingTranscriptions === "number") {
        onUpdateRemainingTranscriptions(data.remainingTranscriptions);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleUseTranscript = () => {
    if (transcribedText) {
      onTranscriptionComplete(transcribedText);
      // Optionally collapse the section after using transcript
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-notarai-dark border border-notarai-gray/30 rounded-xl overflow-hidden mb-6 hover:border-notarai-gray/50 transition-all duration-300 shadow-xl">
      {/* Header - Collapsible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-notarai-gray/10 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <FileAudio className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-white">Upload Audio/Video</h3>
            <p className="text-sm text-notarai-gray mt-1">
              Transcribe recordings with AI-powered speech-to-text
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {authMode === "demo" && (
            <span className="text-xs text-notarai-gray bg-notarai-gray/10 px-3 py-1 rounded-full">
              {remainingTranscriptions}/5 left
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-notarai-gray" />
          ) : (
            <ChevronDown className="w-5 h-5 text-notarai-gray" />
          )}
        </div>
      </button>

      {/* Content - Expandable */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-notarai-gray/30">
          <div className="mt-6 space-y-4">
            {/* File Input */}
            <div>
              <label className="block text-sm font-medium text-notarai-gray mb-2">
                Select Audio or Video File
              </label>
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*,video/*,.mp3,.mp4,.wav,.m4a,.webm,.ogg,.flac"
                  onChange={handleFileChange}
                  className="hidden"
                  id="audio-file-input"
                />
                <label
                  htmlFor="audio-file-input"
                  className="flex items-center justify-center w-full p-6 border-2 border-dashed border-notarai-gray/30 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-200 cursor-pointer group"
                >
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-notarai-gray group-hover:text-blue-400 mx-auto mb-2 transition-colors" />
                    <p className="text-sm text-white font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-notarai-gray mt-1">
                      MP3, MP4, WAV, M4A, WebM, OGG, FLAC (max 25MB)
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Selected File Info */}
            {selectedFile && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <FileAudio className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {selectedFile.name}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-notarai-gray">
                        <span>Size: {formatFileSize(selectedFile.size)}</span>
                        <span>•</span>
                        <span>Duration: {estimateDuration(selectedFile.size)}</span>
                        <span>•</span>
                        <span>Cost: {estimateCost(selectedFile.size)}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleClearFile}
                    className="text-notarai-gray hover:text-white transition-colors ml-2 flex-shrink-0"
                    aria-label="Clear file"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* Transcribe Button */}
            <button
              onClick={handleTranscribe}
              disabled={!selectedFile || isTranscribing || remainingTranscriptions === 0}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-blue-500/50"
            >
              {isTranscribing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Transcribing...
                </>
              ) : (
                <>
                  <FileAudio className="w-5 h-5" />
                  Transcribe Audio
                </>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-sm animate-fade-in">
                {error}
              </div>
            )}

            {/* Transcribed Text */}
            {transcribedText && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 animate-fade-in">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-green-400" />
                  <h4 className="text-white font-semibold">Transcription Complete</h4>
                </div>
                <div className="bg-notarai-dark/50 rounded-lg p-4 mb-3 max-h-40 overflow-y-auto">
                  <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                    {transcribedText}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-notarai-gray">
                    {transcribedText.length.toLocaleString()} characters
                  </span>
                  <button
                    onClick={handleUseTranscript}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 text-sm flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Use Transcript
                  </button>
                </div>
              </div>
            )}

            {/* Help Text */}
            {remainingTranscriptions === 0 && authMode === "demo" && (
              <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
                Demo transcription limit reached. Contact admin for password to get unlimited transcriptions.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
