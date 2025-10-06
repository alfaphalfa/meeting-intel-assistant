"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  onAuthComplete: (mode: "demo" | "admin", password?: string) => void;
}

export default function AuthModal({ onAuthComplete }: AuthModalProps) {
  const [mode, setMode] = useState<"select" | "password">("select");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleDemoMode = () => {
    onAuthComplete("demo");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Please enter a password");
      return;
    }
    onAuthComplete("admin", password);
  };

  const handleBack = () => {
    setMode("select");
    setPassword("");
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-notarai-dark border border-notarai-gray/50 rounded-2xl max-w-md w-full p-8 shadow-2xl">
        {mode === "select" ? (
          <>
            <h2 className="text-3xl font-bold text-white mb-3">
              Welcome to <span className="text-notarai-blue">notarai.work</span>
            </h2>
            <p className="text-notarai-gray mb-8 leading-relaxed">
              Choose how you&apos;d like to access the meeting intelligence assistant
            </p>

            <div className="space-y-4">
              {/* Demo Mode Button */}
              <button
                onClick={handleDemoMode}
                className="w-full p-6 bg-notarai-gray/10 hover:bg-notarai-gray/20 border border-notarai-gray/30 hover:border-notarai-blue/50 rounded-xl transition-all duration-200 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-notarai-blue transition-colors">
                      Try Demo Mode
                    </h3>
                    <p className="text-notarai-gray text-sm leading-relaxed">
                      Get started immediately with 5 free meeting analyses. No password required.
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className="inline-block px-3 py-1 bg-notarai-blue/20 text-notarai-blue text-xs font-bold rounded-full">
                      5 FREE
                    </span>
                  </div>
                </div>
              </button>

              {/* Password Login Button */}
              <button
                onClick={() => setMode("password")}
                className="w-full p-6 bg-notarai-blue/10 hover:bg-notarai-blue/20 border border-notarai-blue/30 hover:border-notarai-blue/60 rounded-xl transition-all duration-200 text-left group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-notarai-blue transition-colors">
                      Password Login
                    </h3>
                    <p className="text-notarai-gray text-sm leading-relaxed">
                      Unlimited access for authorized users. Enter your admin password.
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-4">
                    <span className="inline-block px-3 py-1 bg-notarai-blue text-white text-xs font-bold rounded-full">
                      UNLIMITED
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Admin Login
              </h2>
              <button
                onClick={handleBack}
                className="text-notarai-gray hover:text-white transition-colors"
                aria-label="Go back"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-notarai-gray mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 bg-notarai-dark border border-notarai-gray/50 rounded-lg text-white placeholder-notarai-gray/50 focus:outline-none focus:ring-2 focus:ring-notarai-blue focus:border-transparent"
                  autoFocus
                />
              </div>

              {error && (
                <div className="p-3 bg-notarai-blue/20 border border-notarai-blue/50 rounded-lg text-notarai-blue text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 bg-notarai-blue hover:bg-notarai-blue-dark text-white font-bold rounded-lg transition-all duration-200 hover:scale-105"
              >
                Login
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="w-full px-6 py-3 bg-notarai-gray/10 hover:bg-notarai-gray/20 text-notarai-gray hover:text-white font-medium rounded-lg transition-all duration-200"
              >
                Back to Options
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
