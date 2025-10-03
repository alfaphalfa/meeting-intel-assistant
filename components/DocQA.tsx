"use client";

import { useState } from "react";
import { HelpCircle, BookOpen, ChevronRight } from "lucide-react";

interface QAPair {
  id: number;
  question: string;
  answer: string;
  source: string;
}

const QA_PAIRS: QAPair[] = [
  {
    id: 1,
    question: "How do I request a new laptop?",
    answer:
      "Submit a request through the IT Service Portal using your employee login. Select 'Hardware Request' and choose your preferred model from the approved list. Requests are typically processed within 3-5 business days, and you'll receive an email notification when your device is ready for pickup.",
    source: "IT Handbook 2025, Section 3.2",
  },
  {
    id: 2,
    question: "What's the PTO policy?",
    answer:
      "Netflix offers unlimited PTO for salaried employees, allowing you to take time off as needed while ensuring your work responsibilities are covered. We ask that you coordinate with your manager and team to ensure adequate coverage. Track your time off in Workday for planning purposes.",
    source: "HR Policy Guide, Benefits Section",
  },
  {
    id: 3,
    question: "Who handles expense reimbursements?",
    answer:
      "All expense reimbursements are processed through Concur. Submit receipts within 30 days of the expense date. For questions or issues, contact the Finance Operations team at finance-ops@netflix.com. Most reimbursements are processed within 5-7 business days.",
    source: "Finance Policy Manual v4.1",
  },
  {
    id: 4,
    question: "How do I book a conference room?",
    answer:
      "Use the Outlook or Google Calendar integration to view and reserve conference rooms. Search for available rooms by location, capacity, and amenities. For recurring meetings or all-hands events requiring large spaces, contact Facilities at least 2 weeks in advance.",
    source: "Workplace Services Guide",
  },
  {
    id: 5,
    question: "What's the remote work policy?",
    answer:
      "Netflix supports flexible work arrangements based on role requirements and team needs. Discuss your preferred work setup with your manager to find a schedule that works for both you and your team. Some roles require regular office presence, while others can be fully remote.",
    source: "HR Policy Guide, Flexibility & Work-Life",
  },
  {
    id: 6,
    question: "How do I submit a support ticket?",
    answer:
      "For IT support, use the ServiceNow portal accessible via the employee intranet. For HR questions, contact People Services through Workday. For facilities issues (building access, office supplies, etc.), email facilities@netflix.com or use the Facilities Portal.",
    source: "Employee Resource Directory 2025",
  },
];

export default function DocQA() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const handleQuestionClick = (id: number) => {
    setSelectedQuestion(selectedQuestion === id ? null : id);
  };

  const selectedQA = QA_PAIRS.find((qa) => qa.id === selectedQuestion);

  return (
    <div className="bg-netflix-black border border-netflix-gray/30 rounded-lg p-6 sm:p-8 hover:border-netflix-gray/50 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <BookOpen className="w-6 h-6 text-netflix-red flex-shrink-0 mt-1" />
        <div>
          <h2 className="text-2xl font-bold text-white">
            Ask About Netflix Policies
          </h2>
          <p className="text-sm text-netflix-gray mt-1">
            (Demo feature - showing concept with sample data)
          </p>
        </div>
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {QA_PAIRS.map((qa) => (
          <button
            key={qa.id}
            onClick={() => handleQuestionClick(qa.id)}
            className={`flex items-center gap-3 p-4 rounded-lg border text-left transition-all duration-200 ${
              selectedQuestion === qa.id
                ? "bg-netflix-red/10 border-netflix-red text-white"
                : "bg-netflix-gray/5 border-netflix-gray/30 text-white hover:bg-netflix-gray/10 hover:border-netflix-gray/50"
            }`}
          >
            <HelpCircle
              className={`w-5 h-5 flex-shrink-0 ${
                selectedQuestion === qa.id
                  ? "text-netflix-red"
                  : "text-netflix-gray"
              }`}
            />
            <span className="flex-1 text-sm font-medium">{qa.question}</span>
            <ChevronRight
              className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                selectedQuestion === qa.id
                  ? "rotate-90 text-netflix-red"
                  : "text-netflix-gray"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Answer Display */}
      {selectedQA && (
        <div className="bg-netflix-gray/10 border border-netflix-gray/30 rounded-lg p-6 animate-fade-in">
          <div className="flex items-start gap-3 mb-4">
            <HelpCircle className="w-5 h-5 text-netflix-red flex-shrink-0 mt-0.5" />
            <h3 className="text-lg font-semibold text-white">
              {selectedQA.question}
            </h3>
          </div>

          <p className="text-white/90 leading-relaxed mb-4">
            {selectedQA.answer}
          </p>

          <div className="flex items-center gap-2 pt-4 border-t border-netflix-gray/30">
            <BookOpen className="w-4 h-4 text-netflix-gray" />
            <span className="text-sm text-netflix-gray">
              Source: <span className="text-white/70">{selectedQA.source}</span>
            </span>
          </div>
        </div>
      )}

      {!selectedQA && (
        <div className="text-center py-8 text-netflix-gray">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">
            Click a question above to see the answer
          </p>
        </div>
      )}
    </div>
  );
}
