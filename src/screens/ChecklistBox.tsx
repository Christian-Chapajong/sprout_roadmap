import type { Application } from "../data/applications";
import { CheckSmall } from "../components/CheckSmall";

type ChecklistBoxProps = {
  app: Application;
  onClose?: () => void;
};

export const ChecklistBox = ({ app, onClose }: ChecklistBoxProps): JSX.Element => {
  const checklistItems = [
    { id: 1, title: "Research each company", description: "Mission, values, culture, requirements.", completed: true },
    { id: 2, title: "Learn the application process", description: "Stages, deadlines, tips.", completed: true },
  ];

  const applicationStages = [
    { id: 1, title: "Online applications", description: "Prepare and complete.", completed: app.progress >= 1 },
    { id: 2, title: "Online assessments / video interview", description: "Prepare and complete.", completed: app.progress >= 2 },
    { id: 3, title: "Assessment centre", description: "Prepare and attend.", completed: app.progress >= 3, hasSubStages: true },
    { id: 4, title: "Offer stage", description: "Decision, next steps.", completed: app.progress >= app.total },
  ];

  const assessmentCentreSubStages = [{ id: 1, completed: false }, { id: 2, completed: false }];

  const barPercent = Math.max(0, Math.min(100, Math.round((app.progress / app.total) * 100)));

  // Fixed-position bottom sheet; internals are all flex
  return (
    <div className="fixed inset-x-0 bottom-0 z-[60]">
      <div className="mx-auto w-[395px] max-w-full rounded-t-[20px] bg-white shadow-[0_0_15px_15px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col gap-4 p-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img className="w-[39px] h-[34px] object-cover" alt={`${app.company} logo`} src={app.logo} />
              <h1 className="font-bold text-black text-sm">Your {app.company} Application</h1>
            </div>
            <button
              onClick={onClose}
              aria-label="Close checklist"
              className="w-9 h-9 rounded-full bg-[#f3f3f3] hover:bg-[#e9e9e9] border border-[#ddd] flex items-center justify-center"
            >
              <span className="leading-none">✕</span>
            </button>
          </div>

          {/* Stage + counts */}
          <div className="flex items-center justify-between text-[10px] font-bold text-variable-collection-grey">
            <div>Stage: {app.stage}</div>
            <div>{app.progress}/{app.total}</div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 rounded-[10px] bg-[#d9d9d9] overflow-hidden">
            <div className="h-full bg-lime-green" style={{ width: `${barPercent}%` }} />
          </div>

          {/* Checklist */}
          <section className="flex flex-col gap-3">
            <h2 className="font-bold text-black text-xs">Checklist</h2>
            <div className="flex flex-col gap-4">
              {checklistItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="inline-flex items-center justify-center p-[11px] rounded-[100px] relative">
                    <div
                      className={`w-[18px] h-[18px] rounded-sm ${
                        item.completed ? "bg-variable-collection-sprout-green" : "bg-variable-collection-grey"
                      }`}
                    />
                    <CheckSmall className="!absolute !w-6 !h-6" />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-black text-xs">{item.title}</h3>
                    <p className="font-bold text-[10px] text-variable-collection-grey">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stages */}
          <div className="flex flex-col gap-4">
            {/* Stage 1 */}
            <div className="flex items-start gap-3">
              <div className="inline-flex items-center justify-center p-[11px] rounded-[100px] relative">
                <div className={`w-[18px] h-[18px] rounded-sm ${applicationStages[0].completed ? "bg-variable-collection-sprout-green" : "bg-variable-collection-grey"}`} />
                <CheckSmall className="!absolute !w-6 !h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-black text-xs">Online applications</h3>
                <p className="font-bold text-[10px] text-variable-collection-grey">Prepare and complete.</p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="flex items-start gap-3">
              <div className="inline-flex items-center justify-center p-[11px] rounded-[100px] relative">
                <div className={`w-[18px] h-[18px] rounded-sm ${applicationStages[1].completed ? "bg-variable-collection-sprout-green" : "bg-variable-collection-grey"}`} />
                <CheckSmall className="!absolute !w-6 !h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-black text-xs">Online assessments / video interview</h3>
                <p className="font-bold text-[10px] text-variable-collection-grey">Prepare and complete.</p>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full h-[38px]">
              <div className="w-full h-full bg-sprout-green rounded-full flex items-center justify-center">
                <span className="text-white text-base leading-[22px]">Speak to Sprout AI</span>
              </div>
            </button>

            {/* Stage 3 with sub-stages */}
            <div className="flex items-start gap-3">
              <div className="flex items-center gap-2">
                {assessmentCentreSubStages.map((sub) => (
                  <div key={sub.id} className="inline-flex items-center justify-center p-[11px] rounded-[100px] relative">
                    <div className="w-[18px] h-[18px] rounded-sm bg-variable-collection-grey" />
                    <CheckSmall className="!absolute !w-6 !h-6" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-black text-xs">Assessment centre</h3>
                <p className="font-bold text-[10px] text-variable-collection-grey">Prepare and attend.</p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="flex items-start gap-3">
              <div className="inline-flex items-center justify-center p-[11px] rounded-[100px] relative">
                <div className={`w-[18px] h-[18px] rounded-sm ${applicationStages[3].completed ? "bg-variable-collection-sprout-green" : "bg-variable-collection-grey"}`} />
                <CheckSmall className="!absolute !w-6 !h-6" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-black text-xs">Offer stage</h3>
                <p className="font-bold text-[10px] text-variable-collection-grey">Decision, next steps.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
