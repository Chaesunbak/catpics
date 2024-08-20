'use clent'

import { cn } from "../lib/utils";

const scrollToTop = () => {
  window.scrollTo({ top: 100, behavior: 'smooth' });
};

export default function ButtonScrollToTop({ className }: { className: string }): JSX.Element {
  return (
    <button onClick={scrollToTop} className={cn("rounded-full", className)}>
      👆
    </button>
  );
}