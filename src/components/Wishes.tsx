import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { wishes, config } from "../data/content";
import { celebrateWish } from "../utils/celebrate";
import { cn } from "../utils/cn";

const CANDLE_COLORS = [
  "from-rose-300 to-rose-400",
  "from-sky-200 to-sky-300",
  "from-amber-200 to-amber-300",
  "from-violet-200 to-violet-300",
  "from-emerald-200 to-emerald-300",
];

function Candle({ lit, index }: { lit: boolean; index: number }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Flame / smoke */}
      <div className="relative mb-0.5 h-8 w-5">
        {lit ? (
          <>
            <div className="absolute inset-x-0 bottom-0 mx-auto h-8 w-5 rounded-full bg-amber-300/40 blur-md" />
            <div
              className="absolute bottom-0 left-1/2 h-7 w-4 origin-bottom -translate-x-1/2 animate-flicker rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_18px_6px_rgba(251,191,36,0.55)]"
              style={{ animationDelay: `${index * 0.17}s` }}
            />
            <div className="absolute bottom-0 left-1/2 h-3.5 w-2 -translate-x-1/2 rounded-full bg-sky-100/80" />
          </>
        ) : (
          <>
            {[0, 1, 2].map((s) => (
              <span
                key={s}
                className="absolute bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 animate-smoke rounded-full bg-slate-400/60 blur-[2px]"
                style={{ animationDelay: `${s * 0.25}s`, animationDuration: "1.6s" }}
              />
            ))}
          </>
        )}
      </div>
      {/* Wick */}
      <div className="h-1.5 w-0.5 bg-slate-800" />
      {/* Body */}
      <div
        className={cn(
          "h-14 w-3.5 rounded-sm bg-gradient-to-b shadow-inner sm:h-16 sm:w-4",
          CANDLE_COLORS[index % CANDLE_COLORS.length],
        )}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.55) 0 4px, transparent 4px 9px)",
        }}
      />
    </div>
  );
}

export default function Wishes() {
  const [lit, setLit] = useState(true);
  const [wished, setWished] = useState(false);

  const turning = useMemo(() => {
    const now = new Date();
    const thisYear = new Date(now.getFullYear(), config.birthMonth - 1, config.birthDay);
    const passedToday =
      now.getMonth() === config.birthMonth - 1 && now.getDate() === config.birthDay;
    const y =
      now.getTime() > thisYear.getTime() && !passedToday
        ? now.getFullYear() + 1
        : now.getFullYear();
    return y - config.birthYear;
  }, []);

  const blow = () => {
    if (!lit) return;
    setLit(false);
    celebrateWish();
    setTimeout(() => setWished(true), 500);
  };

  const relight = () => {
    setLit(true);
    setWished(false);
  };

  return (
    <section id="wishes" className="relative overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="font-script text-3xl text-rose-500">Make a wish</p>
          <h2 className="mt-2 font-display text-4xl text-rose-deep sm:text-6xl">اتمنّي أمنية 🎂</h2>
          <p className="mx-auto mt-4 max-w-xl font-amiri text-lg text-plum/75 sm:text-xl">
            غمّضي عينيكي، اتمنّي، وبعدين اطفي الشمع…
          </p>
        </Reveal>

        {/* Cake */}
        <Reveal delay={150} className="mt-12">
          <div className="mx-auto max-w-lg">
            <button
              onClick={blow}
              disabled={!lit}
              aria-label="اطفي الشمع"
              className="group relative mx-auto block w-full cursor-pointer focus:outline-none disabled:cursor-default"
            >
              {/* Number topper */}
              <div className="mb-1 flex justify-center">
                <span
                  className={cn(
                    "text-shimmer font-amiri text-5xl font-bold drop-shadow sm:text-6xl",
                    !lit && "opacity-70",
                  )}
                >
                  {turning}
                </span>
              </div>

              {/* Candles */}
              <div className="flex items-end justify-center gap-5 sm:gap-8">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Candle key={i} lit={lit} index={i} />
                ))}
              </div>

              {/* Top tier */}
              <div className="relative mx-auto -mt-1 h-16 w-3/5 rounded-t-3xl rounded-b-lg bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 shadow-lg sm:h-20">
                {/* Frosting drips */}
                <div className="absolute inset-x-0 top-0 flex justify-around">
                  {[6, 10, 7, 11, 8, 9, 7].map((h, i) => (
                    <span
                      key={i}
                      className="w-4 rounded-b-full bg-rose-50 sm:w-5"
                      style={{ height: `${h * 3}px` }}
                    />
                  ))}
                </div>
                <div className="absolute inset-x-0 top-0 h-3 rounded-t-3xl bg-rose-50" />
              </div>

              {/* Bottom tier */}
              <div className="relative mx-auto h-20 w-11/12 rounded-t-3xl rounded-b-2xl bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500 shadow-xl sm:h-24">
                <div className="absolute inset-x-0 top-0 flex justify-around">
                  {[8, 12, 9, 13, 10, 12, 9, 11, 8].map((h, i) => (
                    <span
                      key={i}
                      className="w-4 rounded-b-full bg-rose-50 sm:w-5"
                      style={{ height: `${h * 3}px` }}
                    />
                  ))}
                </div>
                <div className="absolute inset-x-0 top-0 h-3 rounded-t-3xl bg-rose-50" />
                {/* Hearts decoration */}
                <div className="absolute inset-x-0 bottom-4 flex justify-around text-lg sm:text-xl">
                  {["💗", "🌸", "💗", "🌸", "💗"].map((h, i) => (
                    <span key={i}>{h}</span>
                  ))}
                </div>
              </div>

              {/* Plate */}
              <div className="mx-auto -mt-2 h-6 w-full rounded-[50%] bg-gradient-to-b from-white to-rose-100 shadow-lg ring-1 ring-rose-200" />
            </button>

            {/* Action */}
            <div className="mt-8 text-center">
              {lit ? (
                <button
                  onClick={blow}
                  className="rounded-full bg-gradient-to-r from-rose-500 to-rose-700 px-8 py-3.5 text-lg font-bold text-white shadow-xl shadow-rose-900/30 transition hover:-translate-y-0.5 hover:shadow-2xl active:scale-95"
                >
                  اطفي الشمع 🌬️
                </button>
              ) : (
                <div className="animate-fade-up">
                  <p className="font-display text-2xl text-rose-deep sm:text-4xl">
                    {wished ? "أمنيتك هتتحقق بإذن الله 💫" : "…"}
                  </p>
                  <p className="mt-2 font-amiri text-lg text-plum/75 sm:text-xl">
                    وأمنيتي أنا؟ إني أفضل جنبك في كل عيد جاي ❤️
                  </p>
                  <button
                    onClick={relight}
                    className="mt-5 rounded-full border-2 border-rose-300 px-6 py-2.5 text-sm font-bold text-rose-deep transition hover:bg-rose-50"
                  >
                    ولّعي الشمع تاني 🕯️
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Wishes list */}
        <Reveal delay={200} className="mt-20">
          <div className="ornament mb-10">
            <span className="font-display text-2xl text-rose-deep sm:text-3xl">
              أمنياتي ليكي في سنتك الجديدة
            </span>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {wishes.map((w, i) => (
              <Reveal
                key={i}
                as="li"
                delay={i * 90}
                className="flex items-start gap-4 rounded-2xl bg-white/80 p-5 shadow-md shadow-rose-900/5 ring-1 ring-rose-100 backdrop-blur transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-rose-50 to-rose-100 text-2xl">
                  {w.icon}
                </span>
                <p className="pt-2 font-amiri text-lg leading-relaxed text-plum sm:text-xl">
                  {w.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
