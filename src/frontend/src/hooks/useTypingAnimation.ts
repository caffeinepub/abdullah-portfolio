import { useEffect, useRef, useState } from "react";

interface Options {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function useTypingAnimation({
  words,
  typingSpeed = 75,
  deletingSpeed = 40,
  pauseTime = 2000,
}: Options): string {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    const schedule = (fn: () => void, delay: number) => {
      timeoutRef.current = setTimeout(fn, delay);
    };

    if (phase === "typing") {
      if (displayed.length < current.length) {
        schedule(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          typingSpeed,
        );
      } else {
        schedule(() => setPhase("pausing"), pauseTime);
      }
    } else if (phase === "pausing") {
      schedule(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        schedule(
          () => setDisplayed(current.slice(0, displayed.length - 1)),
          deletingSpeed,
        );
      } else {
        setWordIndex((i) => i + 1);
        setPhase("typing");
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    displayed,
    phase,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return displayed;
}
