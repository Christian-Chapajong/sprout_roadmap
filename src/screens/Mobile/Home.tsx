import { useEffect, useState } from "react";
import type { Application } from "../../data/applications";
import { getApplications, addApplication } from "../../data/applications";
import { ApplicationsBox } from "../../ApplicationsBox";
import { ChecklistBox } from "../ChecklistBox";
import { AddApplicationDrawer } from "../../components/AddApplicationDrawer";

export const Home = (): JSX.Element => {
  const [showApplications, setShowApplications] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [applications, setApplications] = useState<Application[]>([]);

  // Load applications on mount
  useEffect(() => {
    setApplications(getApplications());
  }, []);

  // Close on Escape if any sheet is open
  useEffect(() => {
    const open = showApplications || !!selectedApp || showAddForm;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedApp) setSelectedApp(null);
        else if (showAddForm) setShowAddForm(false);
        else setShowApplications(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showApplications, selectedApp, showAddForm]);

  const handleAddApplication = (newApp: Omit<Application, "id">) => {
    const application = addApplication(newApp);
    setApplications(getApplications()); // Refresh from storage
    setShowAddForm(false);
  };

  const growthPathItems = [
    {
      id: 1,
      title: "Learn",
      icon: "https://c.animaapp.com/oyJYvYKt/img/book-open.svg",
      position: { top: 0, left: 88 },
      iconPosition: { top: 15, left: 102 },
      labelPosition: { top: 96, left: 120 },
    },
    {
      id: 2,
      title: "Industries",
      icon: "https://c.animaapp.com/oyJYvYKt/img/tool.svg",
      position: { top: 208, left: 0 },
      iconPosition: { top: 223, left: 14 },
      labelPosition: { top: 307, left: 12 },
    },
    {
      id: 3,
      title: "Companies",
      icon: "https://c.animaapp.com/oyJYvYKt/img/home.svg",
      position: { top: 357, left: 165 },
      iconPosition: { top: 371, left: 179 },
      labelPosition: { top: 451, left: 174 },
    },
    {
      id: 4,
      title: "Applications",
      icon: "https://c.animaapp.com/oyJYvYKt/img/file-text.svg",
      position: { top: 515, left: 26 },
      iconPosition: { top: 530, left: 40 },
      labelPosition: { top: 609, left: 36 },
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

  return (
    <main
      className="relative w-[393px] h-[852px] bg-[#f4f4f4] overflow-hidden flex flex-col"
      role="main"
      aria-label="Learning Path Dashboard"
    >
      {/* Header */}
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
            2/5 completed
          </div>
        </div>
        <div
          className="w-full h-[19px] bg-[#d9d9d9] rounded-[10px]"
          role="progressbar"
          aria-valuenow={2}
          aria-valuemin={0}
          aria-valuemax={5}
          aria-label="Learning progress: 2 out of 5 completed"
        >
          <div className="h-full bg-lime-green rounded-l-[10px]" style={{ width: "28%" }} />
        </div>
      </section>

      {/* Main learning-path content (kept absolutely positioned as you requested) */}
      <section
        className="absolute w-[284px] h-[630px] top-[177px] left-[60px]"
        aria-label="Learning Path"
      >
        <div className="relative w-[274px] h-[630px]">
          <div className="absolute w-[265px] h-[630px] top-0 left-0">
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
                  className="absolute w-[100px] h-[100px] bg-sprout-green rounded-[50px] shadow-[0px_0px_15px_#22c55e40]"
                  style={{ top: `${item.position.top}px`, left: `${item.position.left}px` }}
                />
                <button
                  onClick={() => {
                    if (item.title === "Applications") setShowApplications(true);
                  }}
                  className="flex w-[71px] h-[71px] items-center justify-center gap-[var(--size-space-200)] pt-[var(--size-space-300)] pr-[var(--size-space-300)] pb-[var(--size-space-300)] pl-[var(--size-space-300)] absolute bg-white rounded-[1000px] overflow-hidden border border-solid border-white hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-sprout-green focus:ring-opacity-50"
                  style={{ top: `${item.iconPosition.top}px`, left: `${item.iconPosition.left}px` }}
                  aria-label={`Navigate to ${item.title}`}
                >
                  <img className="relative flex-1 self-stretch grow" alt={item.title} src={item.icon} />
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
                      item.title === "Industries" ? "76px" :
                      item.title === "Companies" ? "82px" :
                      item.title === "Applications" ? "83px" : "35px",
                  }}
                >
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One shared backdrop for any open sheet */}
      {(showApplications || selectedApp || showAddForm) && (
        <button
          aria-label="Close overlay"
          onClick={() => {
            if (selectedApp) setSelectedApp(null);
            else if (showAddForm) setShowAddForm(false);
            else setShowApplications(false);
          }}
          className="absolute inset-0 z-[40] bg-black/30"
        />
      )}

      {/* Applications bottom sheet */}
      {showApplications && (
        <div className="absolute inset-x-0 bottom-0 z-[50] flex items-end justify-center">
          <ApplicationsBox
            applications={applications}
            onClose={() => setShowApplications(false)}
            onSelectApp={(app) => {
              setShowApplications(false);
              setSelectedApp(app);
            }}
            onAddNewApp={() => {
              setShowApplications(false);
              setShowAddForm(true);
            }}
          />
        </div>
      )}

      {/* Add Application Form bottom sheet */}
      {showAddForm && (
        <div className="absolute inset-x-0 bottom-0 z-[55] flex items-end justify-center">
          <AddApplicationDrawer
            onClose={() => setShowAddForm(false)}
            onAddApplication={handleAddApplication}
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
