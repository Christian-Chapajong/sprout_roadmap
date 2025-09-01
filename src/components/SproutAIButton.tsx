export const SproutAIButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="w-full h-[38px] mb-6" {...props}>
        <div className="w-full h-full bg-sprout-green rounded-full flex items-center justify-center">
        <span className="text-white text-base leading-[22px]">Speak to Sprout AI</span>
        </div>
    </button>
  );
}