import { useMemo } from "react";
import FloatingHearts from "./FloatingHearts";
import { heroImage, heroLines, config } from "../data/content";

export default function Hero() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        top: 8 + Math.random() * 84,
        left: Math.random() * 100,
        size: 0.6 + Math.random() * 0.9,
        delay: Math.random() * 3,
      })),
    [],
  );

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <img
        src={heroImage}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-plum/70 via-rose-deep/55 to-plum/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(59,10,31,0.55)_100%)]" />

      <FloatingHearts count={20} />

      {/* Twinkling sparkles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          aria-hidden
          className="pointer-events-none absolute animate-twinkle text-gold-light"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            fontSize: `${s.size}rem`,
            animationDelay: `${s.delay}s`,
          }}
        >
          ✦
        </span>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 pb-24 pt-28 text-center text-white">
        <p
          className="animate-fade-up font-script text-3xl text-gold-light drop-shadow-lg sm:text-5xl"
          style={{ animationDelay: "200ms" }}
        >
          {heroLines.script}
        </p>

        <h1
          className="mt-4 animate-fade-up font-display text-5xl leading-[1.25] drop-shadow-2xl sm:text-7xl md:text-8xl"
          style={{ animationDelay: "450ms" }}
        >
          {heroLines.title}
        </h1>

        {config.herName !== "حبيبتي" && (
          <p
            className="mt-2 animate-fade-up font-display text-3xl text-rose-100 sm:text-5xl"
            style={{ animationDelay: "600ms" }}
          >
            يا {config.herName}
          </p>
        )}

        <p
          className="mx-auto mt-6 max-w-2xl animate-fade-up font-amiri text-xl leading-relaxed text-rose-50/95 sm:text-2xl"
          style={{ animationDelay: "750ms" }}
        >
          {heroLines.subtitle}
        </p>

        <div
          className="mt-10 inline-flex animate-fade-up items-center gap-4 rounded-full border border-gold/50 bg-white/10 px-8 py-3 backdrop-blur-md"
          style={{ animationDelay: "1000ms" }}
        >
          <span className="text-2xl" aria-hidden>
            🎂
          </span>
          <span
            dir="ltr"
            className="font-amiri text-2xl tracking-widest tabular-nums text-gold-light sm:text-3xl"
          >
            {heroLines.date}
          </span>
          <span className="text-2xl" aria-hidden>
            🎈
          </span>
        </div>

        <div
          className="mt-12 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ animationDelay: "1250ms" }}
        >
          <a
            href="#letter"
            className="w-full rounded-full bg-gradient-to-r from-rose-500 to-rose-700 px-8 py-3.5 font-bold shadow-xl shadow-rose-900/40 transition hover:-translate-y-0.5 hover:shadow-2xl sm:w-auto"
          >
            اقري رسالتي 💌
          </a>
          <a
            href="#gallery"
            className="w-full rounded-full border-2 border-white/60 bg-white/10 px-8 py-3.5 font-bold backdrop-blur-sm transition hover:bg-white/20 sm:w-auto"
          >
            شوفي الصور 📸
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#countdown"
        aria-label="انزلي تحت"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce-soft text-white/80 transition hover:text-white sm:block"
      >
        <svg className="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {/* Bottom fade to page background */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blush to-transparent" />
    </section>
  );
}
