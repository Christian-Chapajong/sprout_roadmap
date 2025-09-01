import { useEffect, useState } from "react";
import type { Application } from "../../data/applications";
import { ApplicationsBox } from "../../ApplicationsBox";
import { ChecklistBox } from "../ChecklistBox";
import { LearnCarousel } from "../../components/LearnCarousel";
import { SproutAIButton } from "../../components/SproutAIButton";
import { Industries } from "../../Industries";


// Utility to persist/load completion state for each stage
const STAGES = ["Learn", "Industries", "Companies", "Applications"] as const;
type Stage = typeof STAGES[number];

function loadStageComplete(stage: Stage) {
  return localStorage.getItem(`stageComplete_${stage}`) === "true";
}
function saveStageComplete(stage: Stage, value: boolean) {
  localStorage.setItem(`stageComplete_${stage}`, value ? "true" : "");
}

export const Home = (): JSX.Element => {
  const [showApplications, setShowApplications] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showIndustries, setShowIndustries] = useState(false);


  // Completion state for each stage
  const [stageComplete, setStageComplete] = useState<Record<Stage, boolean>>(() => ({
    Learn: loadStageComplete("Learn"),
    Industries: loadStageComplete("Industries"),
    Companies: loadStageComplete("Companies"),
    Applications: loadStageComplete("Applications"),
  }));

  // Learn carousel modal
  const [showLearn, setShowLearn] = useState(false);

  // Persist each stage's completion
  useEffect(() => {
    STAGES.forEach(stage => saveStageComplete(stage, stageComplete[stage]));
  }, [stageComplete]);

  // Progress count
  const completed = STAGES.filter(stage => stageComplete[stage]).length;
  const total = STAGES.length;

  // Growth path items
  const growthPathItems = [
    {
      id: 1,
      title: "Learn",
      icon: "https://c.animaapp.com/oyJYvYKt/img/book-open.svg",
      position: { top: 0, left: 88 },
      iconPosition: { top: 15, left: 102 },
      labelPosition: { top: 96, left: 102 },
      complete: stageComplete.Learn,
      action: () => setShowLearn(true),
    },
    {
      id: 2,
      title: "Industries",
      icon: "https://c.animaapp.com/oyJYvYKt/img/tool.svg",
      position: { top: 208, left: 0 },
      iconPosition: { top: 223, left: 14 },
      labelPosition: { top: 307, left: 12 },
      complete: stageComplete.Industries,
      action: () => setShowIndustries(true),
    },
    {
      id: 3,
      title: "Companies",
      icon: "https://c.animaapp.com/oyJYvYKt/img/home.svg",
      position: { top: 357, left: 165 },
      iconPosition: { top: 371, left: 179 },
      labelPosition: { top: 451, left: 174 },
      complete: stageComplete.Companies,
      action: () => {
        // TODO: Replace with real modal
        setStageComplete(x => ({ ...x, Companies: true }));
      },
    },
    {
      id: 4,
      title: "Applications",
      icon: "https://c.animaapp.com/oyJYvYKt/img/file-text.svg",
      position: { top: 515, left: 26 },
      iconPosition: { top: 530, left: 40 },
      labelPosition: { top: 609, left: 36 },
      complete: stageComplete.Applications,
      action: () => setShowApplications(true),
    },
  ];

  const connectionLines = [
    {
      src: "https://c.animaapp.com/oyJYvYKt/img/line-1.svg",
      position: { top: 93, left: 65 },
      size: { width: 79, height: 126 },
    },
    {
      src: "https://c.animaapp.com/oyJYvYKt/img/line-2.svg",
      position: { top: 278, left: 69 },
      size: { width: 117, height: 101 },
    },
    {
      src: "https://c.animaapp.com/oyJYvYKt/img/line-3.svg",
      position: { top: 442, left: 107 },
      size: { width: 80, height: 99 },
    },
  ];

  // Escape close logic unchanged
  useEffect(() => {
    const open = showApplications || !!selectedApp || showLearn || showIndustries;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedApp) setSelectedApp(null);
        else if (showApplications) setShowApplications(false);
        else if (showLearn) setShowLearn(false);
        else if (showIndustries) setShowIndustries(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showApplications, selectedApp, showLearn, showIndustries]);


  return (
    <main
      className="relative w-full min-h-screen bg-[#f4f4f4] overflow-hidden flex flex-col"
      role="main"
      aria-label="Learning Path Dashboard"
    >
    <header className="w-full h-16 bg-green-500 shadow-[0px_4px_4px_#00000040] flex items-center justify-between px-3">
    <img
      className="w-[121px] h-[34px] object-cover"
      alt="Sprout logo"
      src="https://c.animaapp.com/oyJYvYKt/img/image-12@2x.png"
    />
    <div className="flex items-center gap-4">
      <div
        className="w-[78px] h-[34px] rounded-[50px] flex items-center justify-center bg-white/35"
        role="status"
        aria-label="User points: 240"
      >
        <img
          className="w-6 h-6 mr-2"
          alt="Star"
          src="https://c.animaapp.com/oyJYvYKt/img/star-filled.svg"
        />
        <span className="font-bold text-variable-collection-white text-base">
          240
        </span>
      </div>
      <button
        className="w-12 h-12 rounded-3xl border-2 border-solid border-white aspect-square hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center justify-center"
        aria-label="User profile"
      >
        <img
          className="w-[41px] h-[41px] object-cover rounded-full"
          alt="User avatar"
          src="https://c.animaapp.com/oyJYvYKt/img/image-10@2x.png"
        />
      </button>
    </div>
    </header>

      {/* Progress Section */}
      <section
        className="w-full h-[68px] bg-[#fffffffc] rounded-b-[10px] flex flex-col justify-center px-3"
        aria-label="Progress Section"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-variable-collection-grey text-xs">
            Progress
          </h2>
          <div className="font-bold text-variable-collection-grey text-xs" aria-label="Progress status">
            {completed}/{total} completed
          </div>
        </div>
        <div
          className="w-full h-[19px] bg-[#d9d9d9] rounded-[10px]"
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`Learning progress: ${completed} out of ${total} completed`}
        >
          <div className="h-full bg-lime-green rounded-[10px]" style={{ width: `${(completed / total) * 100}%` }} />
        </div>
      </section>

      {/* Main growth-path content */}
      <section className="relative" aria-label="Main content area">
        <div className="px-2 py-6 flex justify-center" aria-label="Learning Path">
          <div className="relative w-[265px] h-[630px] top-0 left-0">
            {connectionLines.map((line, index) => (
              <img
                key={index}
                className="absolute"
                alt={`Connection line ${index + 1}`}
                src={line.src}
                style={{
                  width: `${line.size.width}px`,
                  height: `${line.size.height}px`,
                  top: `${line.position.top}px`,
                  left: `${line.position.left}px`,
                }}
              />
            ))}
            {growthPathItems.map((item) => (
              <div key={item.id}>
                <div
                  className={`absolute w-[100px] h-[100px] rounded-[50px] shadow-[0px_0px_15px_#22c55e40]`}
                  style={{
                    top: `${item.position.top}px`,
                    left: `${item.position.left}px`,
                    background: item.complete ? "#22C55E" : "#E5E7EB", // green if complete, grey otherwise
                  }}
                />
                <button
                  onClick={item.action}
                  className="flex w-[71px] h-[71px] items-center justify-center absolute bg-white rounded-full border border-solid border-white hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-sprout-green focus:ring-opacity-50"
                  style={{
                    top: `${item.iconPosition.top}px`,
                    left: `${item.iconPosition.left}px`,
                  }}
                  aria-label={`Navigate to ${item.title}`}
                >
                  <img className="relative" alt={item.title} src={item.icon} style={{ width: 40, height: 40 }} />
                </button>
                <div
                  className="absolute w-[90px] h-[23px] bg-variable-collection-white rounded-[10px]"
                  style={{ top: `${item.labelPosition.top - 4}px`, left: `${item.labelPosition.left - 8}px` }}
                />
                <div
                  className="absolute font-bold text-black text-xs text-center leading-[normal]"
                  style={{
                    top: `${item.labelPosition.top}px`,
                    left: `${item.labelPosition.left}px`,
                    width:
                      item.title === "Learn" ? "70px" :
                      item.title === "Industries" ? "76px" :
                      item.title === "Companies" ? "82px" :
                      item.title === "Applications" ? "83px" : "35px",
                  }}
                >
                  {item.title}
                </div>
                {/* Only for demo: show a "Complete" button for Industries/Companies */}
                {(item.title === "Industries" || item.title === "Companies") && !item.complete && (
                  <button
                    style={{
                      position: "absolute",
                      top: `${item.iconPosition.top + 60}px`,
                      left: `${item.iconPosition.left}px`,
                      background: "#fff",
                      border: "1px solid #22C55E",
                      borderRadius: 8,
                      padding: "2px 8px",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                    onClick={item.action}
                  >
                    Complete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One shared backdrop for any open sheet */}
      {(showApplications || selectedApp || showLearn || showIndustries) && (
        <button
          aria-label="Close overlay"
          onClick={() => {
            if (selectedApp) setSelectedApp(null);
            else if (showApplications) setShowApplications(false);
            else if (showLearn) setShowLearn(false);
            else if (showIndustries) setShowIndustries(false);
          }}
          className="absolute inset-0 z-[40] bg-black/30"
        />
      )}

      {/* Learn Carousel bottom sheet */}
      {showLearn && (
        <div className="absolute inset-x-0 bottom-0 z-[55] flex items-end justify-center">
          <LearnCarousel
            onClose={() => setShowLearn(false)}
            onComplete={() => setStageComplete(x => ({ ...x, Learn: true }))}
            progress={stageComplete.Learn ? 1 : 0}
            setProgress={(val: number) => setStageComplete(x => ({ ...x, Learn: !!val }))}
          />
        </div>
      )}

      {showIndustries && (
        <div className="fixed inset-0 z-[55] flex items-end md:items-center justify-center">
          <Industries
            onClose={() => setShowIndustries(false)}
            onComplete={() => setStageComplete(x => ({ ...x, Industries: true }))}
          />
        </div>
      )}

      {/* Applications bottom sheet */}
      {showApplications && (
        <div className="absolute inset-x-0 bottom-0 z-[50] flex items-end justify-center">
          <ApplicationsBox
            onClose={() => setShowApplications(false)}
            onSelectApp={(app) => {
              setShowApplications(false);
              setSelectedApp(app);
              setStageComplete(x => ({ ...x, Applications: true }));
            }}
          />
        </div>
      )}

      {/* Checklist bottom sheet (over Applications) */}
      {selectedApp && (
        <div className="absolute inset-x-0 bottom-0 z-[60] flex items-end justify-center">
          <ChecklistBox app={selectedApp} onClose={() => setSelectedApp(null)} />
        </div>
      )}
    </main>
  );
};