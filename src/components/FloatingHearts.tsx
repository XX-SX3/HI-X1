import { useMemo } from "react";

interface FloatingHeartsProps {
  count?: number;
  className?: string;
}

const HEARTS = ["💗", "💕", "❤️", "💖", "🌸", "💞", "🩷"];

export default function FloatingHearts({
  count = 18,
  className = "",
}: FloatingHeartsProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 14,
        duration: 11 + Math.random() * 10,
        size: 0.8 + Math.random() * 1.6,
        char: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        opacity: 0.35 + Math.random() * 0.5,
      })),
    [count],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 animate-float-up select-none"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}rem`,
            opacity: h.opacity,
            filter: "drop-shadow(0 2px 6px rgba(190,18,60,0.25))",
          }}
        >
          {h.char}
        </span>
      ))}
    </div>
  );
}
