import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { reasons, shortQuotes } from "../data/content";
import { smallBurst } from "../utils/celebrate";
import { pad2 } from "../utils/numbers";

export default function Reasons() {
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setQuote((q) => (q + 1) % shortQuotes.length), 3800);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="reasons"
      className="relative overflow-hidden bg-gradient-to-b from-blush to-rose-50 py-20 sm:py-28"
    >
      {/* Rotating quote banner */}
      <div className="relative mx-auto mb-16 max-w-4xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-deep via-rose-mid to-rose-deep p-8 text-center text-white shadow-2xl shadow-rose-900/25 sm:p-12">
            <span className="absolute -left-6 -top-6 text-9xl text-white/10">❝</span>
            <span className="absolute -bottom-10 -right-6 text-9xl text-white/10">❞</span>
            <div className="relative flex min-h-[4.5rem] items-center justify-center">
              <p
                key={quote}
                className="animate-fade-up font-display text-2xl leading-relaxed sm:text-4xl"
              >
                {shortQuotes[quote]}
              </p>
            </div>
            <div className="relative mt-6 flex justify-center gap-2">
              {shortQuotes.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setQuote(i)}
                  aria-label={`اقتباس ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === quote ? "w-8 bg-gold-light" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="font-script text-3xl text-rose-500">Why I love you</p>
          <h2 className="mt-2 font-display text-4xl text-rose-deep sm:text-6xl">ليه بحبك؟</h2>
          <p className="mx-auto mt-4 max-w-xl font-amiri text-lg text-plum/75 sm:text-xl">
            الأسباب متتعدش… بس دي شوية منها
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 120}>
              <button
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  smallBurst(
                    (rect.left + rect.width / 2) / window.innerWidth,
                    (rect.top + rect.height / 2) / window.innerHeight,
                  );
                }}
                className="group relative h-full w-full overflow-hidden rounded-3xl bg-white p-7 text-right shadow-lg shadow-rose-900/5 ring-1 ring-rose-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-900/15 hover:ring-rose-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-400"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-rose-100 transition-transform duration-700 group-hover:scale-[2.2]" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 text-3xl shadow-inner transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                      {r.icon}
                    </span>
                    <span className="font-amiri text-3xl tabular-nums text-rose-200 transition-colors group-hover:text-rose-400">
                      {pad2(i + 1)}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl text-rose-deep">{r.title}</h3>
                  <p className="mt-3 font-amiri text-lg leading-relaxed text-plum/80">{r.text}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-sm text-plum/60">دوسي على أي كارت وشوفي قلبي بيطير 💗</p>
        </Reveal>
      </div>
    </section>
  );
}
