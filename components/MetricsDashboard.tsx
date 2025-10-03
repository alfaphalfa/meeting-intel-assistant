"use client";

import { TrendingUp, CheckSquare, Clock } from "lucide-react";

interface MetricsDashboardProps {
  totalMeetings: number;
  totalActionItems: number;
  estimatedMinutes: number;
}

export default function MetricsDashboard({
  totalMeetings,
  totalActionItems,
  estimatedMinutes,
}: MetricsDashboardProps) {
  const hours = Math.round((estimatedMinutes / 60) * 10) / 10; // Round to 1 decimal

  return (
    <div className="bg-netflix-black border border-netflix-gray/30 rounded-lg p-6 sm:p-8 hover:border-netflix-gray/50 transition-all duration-300 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-netflix-red" />
        <div>
          <h2 className="text-2xl font-bold text-white">Your Impact</h2>
          <p className="text-sm text-netflix-gray mt-1">
            Session analytics and time saved
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Meetings Analyzed */}
        <div className="bg-gradient-to-br from-netflix-red/10 to-netflix-red/5 border border-netflix-red/30 rounded-lg p-6 hover:border-netflix-red/50 hover:scale-105 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-netflix-red/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-netflix-red" />
            </div>
            <span className="text-sm font-medium text-netflix-gray">
              Meetings Analyzed
            </span>
          </div>
          <p className="text-4xl font-bold text-white">
            {totalMeetings.toLocaleString()}
          </p>
        </div>

        {/* Action Items Tracked */}
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/30 rounded-lg p-6 hover:border-blue-500/50 hover:scale-105 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <CheckSquare className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-sm font-medium text-netflix-gray">
              Action Items Tracked
            </span>
          </div>
          <p className="text-4xl font-bold text-white">
            {totalActionItems.toLocaleString()}
          </p>
        </div>

        {/* Time Saved */}
        <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-lg p-6 hover:border-green-500/50 hover:scale-105 transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Clock className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-sm font-medium text-netflix-gray">
              Time Saved
            </span>
          </div>
          <p className="text-4xl font-bold text-white">
            ~{hours.toLocaleString()}
            <span className="text-xl text-netflix-gray ml-1">hrs</span>
          </p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-6 pt-6 border-t border-netflix-gray/30">
        <p className="text-xs text-netflix-gray text-center">
          💡 Estimated time saved based on 25 minutes per meeting summary
        </p>
      </div>
    </div>
  );
}
