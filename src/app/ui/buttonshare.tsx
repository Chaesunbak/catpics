'use clent'

import { cn } from "../lib/utils";

const handleClick = async () => {
  const shareData = {
    title: document.title,
    text: "Come check out cool cats!",
    url: window.location.href,
  };

  if (navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
    } catch (e) {
      console.error("Error sharing:", e);
    }
  } else {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("URL copied to clipboard");
    } catch (e) {
      console.error("Error copying to clipboard:", e);
    }
  }
};

export default function ButtonShare({ className }: { className: string }): JSX.Element {
  return (
    <button
      className={cn("rounded-full", className)}
      onClick={handleClick}
    >
      🔗
    </button>
  );
}