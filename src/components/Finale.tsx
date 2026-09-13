import FloatingHearts from "./FloatingHearts";
import Reveal from "./Reveal";
import { finalMessage, heroLines, config } from "../data/content";
import { smallBurst } from "../utils/celebrate";

export default function Finale() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-plum via-rose-deep to-rose-mid py-24 text-white sm:py-36">
      <FloatingHearts count={24} />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <Reveal>
          <p className="font-script text-3xl text-gold-light sm:text-4xl">With all my heart</p>
        </Reveal>

        <Reveal delay={150}>
          <button
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              smallBurst(
                (rect.left + rect.width / 2) / window.innerWidth,
                (rect.top + rect.height / 2) / window.innerHeight,
              );
            }}
            className="mt-4 inline-flex items-center gap-4 font-display text-7xl leading-none drop-shadow-2xl transition-transform hover:scale-105 focus:outline-none sm:text-9xl"
            aria-label={finalMessage.big}
          >
            <span className="animate-heartbeat inline-block text-5xl sm:text-7xl">❤️</span>
            <span>{finalMessage.big}</span>
            <span className="animate-heartbeat inline-block text-5xl sm:text-7xl" style={{ animationDelay: "0.4s" }}>
              ❤️
            </span>
          </button>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-8 font-amiri text-xl leading-relaxed text-rose-50/95 sm:text-3xl">
            {finalMessage.line1}
          </p>
          <p className="mt-3 font-display text-2xl text-gold-light sm:text-4xl">
            {finalMessage.line2}
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="mx-auto mt-12 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-white/10 px-7 py-3 backdrop-blur-md">
            <span>🎂</span>
            <span
              dir="ltr"
              className="font-amiri text-xl tracking-widest tabular-nums text-gold-light sm:text-2xl"
            >
              {heroLines.date}
            </span>
            <span>🎈</span>
          </div>
        </Reveal>

        <Reveal delay={600}>
          <p className="mt-10 font-amiri text-lg text-rose-100/80">
            كل سنة وانتي طيبة يا {config.herName}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
