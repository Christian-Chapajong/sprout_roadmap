import type { Application } from "./data/applications";
import { APPLICATIONS } from "./data/applications";

type ApplicationsBoxProps = {
  onClose?: () => void;
  onSelectApp?: (app: Application) => void;
};

export const ApplicationsBox = ({
  onClose,
  onSelectApp,
}: ApplicationsBoxProps): JSX.Element => {
  const applications = APPLICATIONS;

  return (
    <div className="w-[393px] h-[686px] flex flex-col bg-white rounded-t-[20px] shadow-[0_0_15px_15px_rgba(0,0,0,0.25)]">
      {/* Header (pure flex) */}
      <header className="w-full py-4 px-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <span className="font-bold text-black text-xs">Your Applications</span>
          {onClose && (
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#f3f3f3] hover:bg-[#e9e9e9] border border-[#ddd] flex items-center justify-center"
              aria-label="Close applications"
            >
              <span className="leading-none">✕</span>
            </button>
          )}
        </div>
      </header>

      {/* List */}
      <main className="flex flex-col gap-4 w-full px-4 py-4 overflow-y-auto">
        {applications.map((app) => (
          <button
            key={app.id}
            onClick={() => onSelectApp?.(app)}
            className="flex flex-row items-center bg-neutral-50 rounded-2xl shadow p-3 gap-4 hover:bg-neutral-100 transition"
            aria-label={`Open ${app.company} checklist`}
          >
            <img
              className="w-12 h-12 object-cover rounded"
              alt={`${app.company} logo`}
              src={app.logo}
            />
            <div className="flex flex-col flex-1">
              <div className="font-bold text-black text-xs">{app.company}</div>
              <div className="flex flex-row justify-between items-center mt-1">
                <span className="font-bold text-variable-collection-grey text-[10px]">
                  {app.stage}
                </span>
                <span className="font-bold text-variable-collection-grey text-[10px]">
                  {app.progress}/{app.total}
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#d9d9d9] rounded-[10px] mt-2 overflow-hidden">
                <div
                  className="h-full bg-lime-green rounded-l-[10px]"
                  style={{ width: `${(app.progress / app.total) * 100}%` }}
                />
              </div>
            </div>
          </button>
        ))}
      </main>
    </div>
  );
};
