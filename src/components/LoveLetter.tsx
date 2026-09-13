import { useState } from "react";
import Reveal from "./Reveal";
import { loveLetter, config } from "../data/content";
import { cn } from "../utils/cn";

export default function LoveLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section
      id="letter"
      className="relative overflow-hidden bg-gradient-to-b from-blush via-white to-blush py-20 sm:py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="relative mx-auto max-w-4xl px-5">
        <Reveal className="text-center">
          <p className="font-script text-3xl text-rose-500">A letter from my heart</p>
          <h2 className="mt-2 font-display text-4xl text-rose-deep sm:text-6xl">رسالتي ليكي</h2>
          <p className="mx-auto mt-4 max-w-xl font-amiri text-lg text-plum/75 sm:text-xl">
            كلام كتبته بقلبي قبل إيدي…
          </p>
        </Reveal>

        {/* Envelope */}
        <Reveal delay={150} className="mt-12">
          {!opened ? (
            <button
              onClick={() => setOpened(true)}
              className="group relative mx-auto block w-full max-w-md focus:outline-none"
              aria-label="افتحي الرسالة"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-rose-100 via-rose-50 to-rose-200 shadow-2xl shadow-rose-900/20 ring-1 ring-rose-200 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1">
                {/* Envelope inner (letter peeking) */}
                <div className="absolute inset-x-6 top-2 h-1/2 rounded-t-lg bg-white/80 shadow" />
                {/* Envelope flap (top) */}
                <div
                  className="absolute inset-x-0 top-0 h-1/2 origin-top bg-gradient-to-b from-rose-300 to-rose-200 transition-transform duration-700 group-hover:[transform:rotateX(25deg)]"
                  style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
                />
                {/* Envelope body sides */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-rose-200 to-rose-300"
                  style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
                />
                {/* Wax seal */}
                <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-600 to-rose-800 text-2xl shadow-xl ring-4 ring-rose-300/70 transition-transform duration-500 group-hover:scale-110">
                  ❤️
                </div>
              </div>
              <p className="mt-6 animate-pulse font-amiri text-xl text-rose-deep">
                دوسي عشان تفتحي الرسالة 💌
              </p>
            </button>
          ) : (
            <article
              className={cn(
                "paper relative mx-auto max-w-3xl rounded-3xl p-7 shadow-2xl shadow-rose-900/15 ring-1 ring-rose-200/70 sm:p-12 md:p-16",
                "animate-fade-up",
              )}
            >
              {/* Corner ornaments */}
              <span className="absolute right-4 top-3 text-2xl text-gold/70">❦</span>
              <span className="absolute bottom-3 left-4 rotate-180 text-2xl text-gold/70">❦</span>

              <p className="font-display text-2xl text-rose-deep sm:text-3xl">
                {loveLetter.greeting}
              </p>

              <div className="mt-8 space-y-6 font-amiri text-lg leading-[2.1] text-plum sm:text-xl md:text-2xl">
                {loveLetter.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="animate-fade-up"
                    style={{ animationDelay: `${300 + i * 250}ms` }}
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div
                className="mt-10 animate-fade-up border-t border-dashed border-rose-200 pt-6"
                style={{ animationDelay: `${300 + loveLetter.paragraphs.length * 250}ms` }}
              >
                <p className="font-display text-xl text-rose-deep sm:text-3xl">
                  {loveLetter.closing} ❤️
                </p>
                <p className="mt-4 font-script text-2xl text-plum/70 sm:text-3xl">
                  Forever yours
                </p>
                <p className="font-amiri text-base text-plum/70 sm:text-lg">
                  — {config.signature}
                </p>
              </div>
            </article>
          )}
        </Reveal>
      </div>
    </section>
  );
}
