import { useEffect, useRef, useState } from "react";
import { SproutAIButton } from "./SproutAIButton";

// Sample content from the issue's attachment (edit/update as needed)
const carouselContent = [
  {
    heading: "Intro to Degree Apprenticeships",
    text: `
      <p class="mb-4">Discover how degree apprenticeships combine paid work with university study, offering a unique route to a degree and career experience.</p>
    `,
  },
  {
    heading: "What is a Degree Apprenticeship?",
    text: `
      <p class="mb-4">A degree apprenticeship is a paid job where you study for a university degree at the same time, combining work experience, training, and academic learning.</p>
    `,
  },
  {
    heading: "How They Work",
    text: `
      <ul class="list-disc list-outside space-y-2 pl-6 mb-4">
        <li>You’re employed by a real company.</li>
        <li>You study part-time at a university (often 1 day/week or in blocks).</li>
        <li>You earn a salary and have no tuition fees.</li>
        <li>Your employer + government cover costs.</li>
      </ul>
    `,
  },
  {
    heading: "Pros",
    text: `
      <ul class="list-disc list-outside space-y-2 pl-6 mb-4">
        <li>Earn a salary while studying</li>
        <li>No student debt (tuition paid)</li>
        <li>Gain 3 to 5 years’ work experience before graduation</li>
        <li>Often guaranteed a job at the end</li>
        <li>Learn industry skills employers value</li>
      </ul>
    `,
  },
  {
    heading: "Cons",
    text: `
      <ul class="list-disc list-outside space-y-2 pl-6 mb-4">
        <li>Competitive applications (sometimes harder than uni)</li>
        <li>Juggling work + study can be demanding</li>
        <li>Less “traditional uni lifestyle” (fewer free weeks, student socials)</li>
        <li>May be tied to one employer/industry early</li>
      </ul>
    `,
  },
  {
    heading: "Busting Myths",
    text: `
      <ul class="list-disc list-outside space-y-2 pl-6 mb-4">
        <li><strong>“They’re not real degrees”</strong> — They are full bachelor’s or master’s degrees.</li>
        <li><strong>“Only for engineers/techies”</strong> — Now available in law, banking, consulting, business, digital, healthcare, and more.</li>
        <li><strong>“Easier to get than uni”</strong> — Often more competitive (hundreds/thousands of applicants per place).</li>
      </ul>
    `,
  },
  {
    heading: "Is it Right for Me?",
    text: `
      <p class="mb-2"><strong>Good if you:</strong></p>
      <ul class="list-disc list-outside space-y-2 pl-6 mb-4">
        <li>Want to earn while you learn</li>
        <li>Prefer practical work to lectures only</li>
        <li>Are ready to commit to an employer/industry early</li>
      </ul>
      <p class="mb-2"><strong>Maybe not right if you:</strong></p>
      <ul class="list-disc list-outside space-y-2 pl-6 mb-4">
        <li>Want the traditional full-time uni lifestyle</li>
        <li>Are still very unsure about your career path</li>
      </ul>
    `,
  },
  {
    heading: "Speak to Sprout AI",
    text: `
      <p class="mb-4">Still unsure if degree apprenticeships are right for you? Use Sprout AI Companion to help weigh up your options.</p>
    `,
  },
];

type LearnCarouselProps = {
  onClose: () => void;
  onComplete: () => void;
  progress: number;
  setProgress: (n: number) => void;
};

export const LearnCarousel = ({
  onClose,
  onComplete,
  progress,
  setProgress,
}: LearnCarouselProps) => {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Focus management for a11y
    ref.current?.focus();
  }, [index]);

  const handleNext = () => {
    if (index < carouselContent.length - 1) {
      setIndex(index + 1);
      // Progress: reading each slide counts towards completion
      setProgress(Math.max(progress, index + 2)); // +1 for open, +1 for slide
    } else {
      setProgress(5);
      onComplete();
      onClose();
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section
      className="w-full max-w-lg bg-white rounded-t-xl shadow-lg p-6 z-[55] relative"
      tabIndex={-1}
      ref={ref}
      aria-labelledby="learn-carousel-heading"
      aria-modal="true"
      role="dialog"
    >
      <h2 id="learn-carousel-heading" className="text-2xl font-bold mb-2">
        {carouselContent[index].heading}
      </h2>
      <div
        className="text-base mb-6"
        dangerouslySetInnerHTML={{ __html: carouselContent[index].text }}
        />
      {carouselContent[index].heading === 'Speak to Sprout AI' && (
        <SproutAIButton onClick={() => window.open('https://sproutcareers.co.uk/user/ai-companion', "_blank")} />
      )}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="px-4 py-2 bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Previous
        </button>
        <div className="text-sm text-gray-600" aria-label="Slide indicator">
          {index + 1} / {carouselContent.length}
        </div>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-green-500 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-700"
        >
          {index < carouselContent.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-black focus:outline-none"
        aria-label="Close carousel"
      >
        ×
      </button>
    </section>
  );
};