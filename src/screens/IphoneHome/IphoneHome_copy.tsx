import React, { useEffect, useState } from "react";
import { ApplicationsBox } from "../../ApplicationsBox"; // adjust path if different

export const IphoneHome = (): JSX.Element => {
  const [showApplications, setShowApplications] = useState(false);
  
  useEffect(() => {
    if (!showApplications) return; // only run when box is open

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowApplications(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey); // cleanup
  }, [showApplications]);

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

  const sideIcons = [
    {
      icon: "https://c.animaapp.com/oyJYvYKt/img/octicon-graph-16.svg",
      position: { top: 394, left: 0 },
      bgColor: "bg-sprout-green",
      borderColor: "border-variable-collection-sprout-green",
    },
    {
      icon: "/img/code.png",
      position: { top: 172, left: 238 },
      bgColor: "bg-variable-collection-navy",
      borderColor: "border-[#06163a]",
      overlayIcon: "https://c.animaapp.com/oyJYvYKt/img/mdi-stars-outline.svg",
    },
    {
      icon: "https://c.animaapp.com/oyJYvYKt/img/code.svg",
      position: { top: 546, left: 220 },
      bgColor: "bg-[#9458f5]",
      borderColor: "border-solid",
    },
  ];

  return (
    <main
      className="relative w-[393px] h-[852px] bg-[#f4f4f4] overflow-hidden"
      data-model-id="2:3"
      role="main"
      aria-label="Learning Path Dashboard"
    >
      <section
        className="absolute w-[284px] h-[630px] top-[177px] left-[60px]"
        aria-label="Learning Path"
      >
        <div className="relative w-[274px] h-[630px]">
          <div className="absolute w-[265px] h-[630px] top-0 left-0">
            {connectionLines.map((line, index) => (
              <img
                key={index}
                className={`absolute w-[${line.size.width}px] h-[${line.size.height}px] top-[${line.position.top}px] left-[${line.position.left}px]`}
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
                  style={{
                    top: `${item.position.top}px`,
                    left: `${item.position.left}px`,
                  }}
                />

                <button
                  onClick={() => {
                    if (item.title === "Applications") {
                      setShowApplications(true); // 👈 show Box when Applications is clicked
                    }
                  }}
                  className="flex w-[71px] h-[71px] items-center justify-center gap-[var(--size-space-200)] pt-[var(--size-space-300)] pr-[var(--size-space-300)] pb-[var(--size-space-300)] pl-[var(--size-space-300)] absolute bg-white rounded-[1000px] overflow-hidden border border-solid border-white hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-sprout-green focus:ring-opacity-50"
                  style={{
                    top: `${item.iconPosition.top}px`,
                    left: `${item.iconPosition.left}px`,
                  }}
                  aria-label={`Navigate to ${item.title}`}
                >
                  <img
                    className="relative flex-1 self-stretch grow"
                    alt={item.title}
                    src={item.icon}
                  />
                </button>

                <div
                  className="absolute w-[90px] h-[23px] bg-variable-collection-white rounded-[10px]"
                  style={{
                    top: `${item.labelPosition.top - 4}px`,
                    left: `${item.labelPosition.left - 8}px`,
                  }}
                />

                <div
                  className="absolute [font-family:'Poppins',Helvetica] font-bold text-black text-xs text-center tracking-[0] leading-[normal]"
                  style={{
                    top: `${item.labelPosition.top}px`,
                    left: `${item.labelPosition.left}px`,
                    width:
                      item.title === "Industries"
                        ? "76px"
                        : item.title === "Companies"
                        ? "82px"
                        : item.title === "Applications"
                        ? "83px"
                        : "35px",
                  }}
                >
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="absolute w-[394px] h-[132px] top-0 -left-px">
        <section
          className="absolute w-[393px] h-[68px] top-16 left-px overflow-hidden"
          aria-label="Progress Section"
        >
          <div className="w-[397px] h-[68px]">
            <div className="relative w-[393px] h-[68px] bg-[#fffffffc] rounded-[0px_0px_10px_10px]">
              <h2 className="absolute top-[11px] left-[11px] [font-family:'Poppins',Helvetica] font-bold text-variable-collection-grey text-xs tracking-[0] leading-[normal]">
                Progress
              </h2>

              <div
                className="absolute top-[11px] left-[290px] [font-family:'Poppins',Helvetica] font-bold text-variable-collection-grey text-xs tracking-[0] leading-[normal]"
                aria-label="Progress status"
              >
                2/5 completed
              </div>

              <div
                className="absolute w-[365px] h-[19px] top-[35px] left-3 bg-[#d9d9d9] rounded-[10px]"
                role="progressbar"
                aria-valuenow={2}
                aria-valuemin={0}
                aria-valuemax={5}
                aria-label="Learning progress: 2 out of 5 completed"
              >
                <div className="w-[106px] h-[19px] bg-lime-green rounded-[10px_0px_0px_10px]" />
              </div>
            </div>
          </div>
        </section>

        <header className="absolute w-[394px] h-16 top-0 left-0 bg-[#ffffff]">
          <div className="relative w-[393px] h-16 left-px bg-green-500 shadow-[0px_4px_4px_#00000040]">
            <div className="absolute w-20 h-[34px] top-4 left-60">
              <div
                className="relative w-[78px] h-[34px] rounded-[50px]"
                role="status"
                aria-label="User points: 240"
              >
                <div className="absolute w-[78px] h-[34px] top-0 left-0 bg-[#ffffff] rounded-[50px] opacity-35" />

                <span className="absolute w-8 top-1.5 left-[34px] [font-family:'Poppins',Helvetica] font-bold text-variable-collection-white text-base tracking-[0] leading-[normal]">
                  240
                </span>

                <img
                  className="absolute w-6 h-6 top-1 left-1.5"
                  alt="Star"
                  src="https://c.animaapp.com/oyJYvYKt/img/star-filled.svg"
                />
              </div>
            </div>

            <img
              className="w-[121px] h-[34px] top-4 left-[11px] aspect-[3.54] absolute object-cover"
              alt="Sprout logo"
              src="https://c.animaapp.com/oyJYvYKt/img/image-12@2x.png"
            />

            <button
              className="absolute w-12 h-12 top-[9px] left-[334px] rounded-3xl border-2 border-solid border-[#ffffff] aspect-[1] hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
              aria-label="User profile"
            >
              <img
                className="w-[41px] h-[41px] top-0.5 left-0.5 aspect-[1] absolute object-cover"
                alt="User avatar"
                src="https://c.animaapp.com/oyJYvYKt/img/image-10@2x.png"
              />
            </button>
          </div>
        </header>
      </div>
      {showApplications && (
        <div className="absolute inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <button
            aria-label="Close applications overlay"
            onClick={() => setShowApplications(false)}
            className="absolute inset-0 bg-black/30"
          />
          {/* Sheet container */}
          <div className="relative">
            <ApplicationsBox onClose={() => setShowApplications(false)} />
          </div>
        </div>
      )}

    </main>
  );
};
