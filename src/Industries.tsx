import React, { useState } from "react";

type Industry = {
  id: number;
  title: string;
  description: string;
  isSelected?: boolean;
  iconPath: string;
};

type IndustriesProps = {
  onClose: () => void;
  onComplete?: () => void;
};

const ICON_BASE = `${import.meta.env.BASE_URL}industries_icons/`;

const industriesData: Industry[] = [
  { id: 1, title: "Finance & Banking", description: "Money, markets, and problem-solving at scale.",                   iconPath: `${ICON_BASE}banking.svg` },
  { id: 2, title: "Technology & Digital", description: "Build the future: software, AI, cybersecurity, data.",         iconPath: `${ICON_BASE}technology.svg` },
  { id: 3, title: "Law & Legal Services", description: "From contracts to courtrooms, a path into law.",               iconPath: `${ICON_BASE}law.svg` },
  { id: 4, title: "Engineering & Automotive", description: "Design, innovate, and make things work.",                  iconPath: `${ICON_BASE}engineering.svg` },
  { id: 5, title: "Consulting & Professional Services", description: "Help companies solve their biggest challenges.", iconPath: `${ICON_BASE}consulting.svg` },
  { id: 6, title: "Healthcare & Life Sciences", description: "Work to improve lives and health outcomes.",             iconPath: `${ICON_BASE}healthcare.svg` },
  { id: 7, title: "Creative & Media", description: "Marketing, design, storytelling, and digital content.",            iconPath: `${ICON_BASE}creative.svg` },
  { id: 8, title: "Public Sector & Government", description: "Serve communities and shape policy.",                    iconPath: `${ICON_BASE}public_sector.svg` },
];

export const Industries = ({ onClose, onComplete }: IndustriesProps) => {
  const [selectedIndustries, setSelectedIndustries] = useState<number[]>(
    industriesData.filter((i) => i.isSelected).map((i) => i.id)
  );
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleIndustry = (industryId: number) => {
    setSelectedIndustries((prev) =>
      prev.includes(industryId)
        ? prev.filter((id) => id !== industryId)
        : [...prev, industryId]
    );
  };

  const handleMarkAsDone = () => {
    setIsCompleted(true);
    onComplete?.();
  };

  return (
    <main className="w-full h-full max-w-md mx-auto flex flex-col bg-white rounded-t-xl md:rounded-xl shadow">
      {/* Header */}
      <header className="h-12 px-3 bg-gray-200 flex items-center justify-between rounded-t-xl">
        <button
          onClick={onClose}
          className="px-2 py-1 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Go back"
        >
          ← Back
        </button>
        <h1 className="text-xs font-bold text-gray-800">Explore Industries</h1>
        <div className="w-6" aria-hidden="true" />
      </header>

      {/* Helper blurb */}
      <section className="px-4 py-3" aria-label="AI Companion Information">
        <p className="text-center text-sm text-gray-900">
          <span className="font-medium">
            Unsure which industries are right for you?{" "}
          </span>
          <span className="font-bold">Sprout AI Companion</span>
          <span className="font-medium"> can help you weigh up your options.</span>
        </p>
      </section>

      {/* List */}
      <section
        className="flex-1 overflow-auto px-2 sm:px-4 pb-2"
        aria-label="Industry selection list"
      >
        <ul className="flex flex-col gap-1">
          {industriesData.map((industry) => {
            const selected = selectedIndustries.includes(industry.id);
            return (
              <li key={industry.id}>
                <button
                  type="button"
                  onClick={() => toggleIndustry(industry.id)}
                  aria-pressed={selected}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sprout-purple"
                >
                  <img
                    src={industry.iconPath}
                    alt=""
                    className="w-10 h-10 shrink-0"
                    aria-hidden="true"
                  />

                  <div className="flex flex-col text-left">
                    <h3 className="text-sm font-bold text-gray-900">
                      {industry.title}
                    </h3>
                    <p
                      className={`text-[10px] font-bold leading-tight ${
                        selected ? "text-sprout-green" : "text-gray-400"
                      }`}
                    >
                      {industry.description}
                    </p>
                  </div>

                  <div className="ml-auto">
                    {selected ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sprout-green">
                        <svg
                          width="12"
                          height="9"
                          viewBox="0 0 12 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 4.5L4.5 8L11 1.5"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-block w-6 h-6 rounded-full border border-gray-300" />
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Footer CTA */}
      <footer className="px-4 py-3">
        <button
          onClick={handleMarkAsDone}
          disabled={selectedIndustries.length === 0}
          className="w-full h-10 rounded-full bg-gray-200 text-sprout-purple font-semibold hover:bg-gray-300 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-sprout-purple"
        >
          {isCompleted ? "Completed" : "Mark as Done"}
        </button>
      </footer>
    </main>
  );
};
