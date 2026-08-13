import { useEffect, useState, Fragment } from "react";
import { cn } from "@/lib/utils";

interface WordByWordProps {
  text: string;
  className?: string;
  /** Seconds before the first word appears. */
  delay?: number;
  /** Seconds between each word. */
  stagger?: number;
  /** Duration of each word's reveal. */
  duration?: number;
  /** Keep line breaks from the original text. */
  preserveLines?: boolean;
  /** Whether to run the animation only once. */
  once?: boolean;
  /** HTML tag to render. */
  as?: "span" | "p" | "h1" | "h2" | "h3";
}

export function WordByWord({
  text,
  className,
  delay = 0.2,
  stagger = 0.05,
  duration = 0.5,
  preserveLines = false,
  once = true,
  as: Tag = "span",
}: WordByWordProps) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(id);
  }, [delay, text]);

  const lines = preserveLines ? text.split("\n") : [text];
  let wordIndex = 0;

  const renderLine = (line: string, lineIdx: number) => {
    const words = line.split(/\s+/).filter(Boolean);
    const isLastLine = lineIdx === lines.length - 1;

    return (
      <span key={lineIdx} className="block">
        {words.map((word, i) => {
          const currentIndex = wordIndex++;
          const isLastWord = isLastLine && i === words.length - 1;
          return (
            <span
              key={i}
              className={cn(
                "inline-block will-change-transform",
                started && "animate-word-in"
              )}
              style={{
                animationDelay: `${currentIndex * stagger}s`,
                animationDuration: `${duration}s`,
                animationFillMode: "both",
              }}
            >
              {isLastWord ? word : `${word}\u00A0`}
            </span>
          );
        })}
        {!isLastLine && <br />}
      </span>
    );
  };

  return (
    <Tag
      className={cn("word-by-word", className)}
      aria-label={text}
    >
      {lines.map(renderLine)}
    </Tag>
  );
}

export function WordByWordText({
  children,
  className,
  delay = 0.2,
  stagger = 0.05,
  duration = 0.5,
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  return (
    <WordByWord
      text={children}
      className={className}
      delay={delay}
      stagger={stagger}
      duration={duration}
      preserveLines
    />
  );
}
