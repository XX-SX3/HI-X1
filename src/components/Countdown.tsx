import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import { birthDate, config } from "../data/content";
import { formatNumber, pad2 } from "../utils/numbers";

function getBirthdayInfo(now: Date) {
  const m = config.birthMonth - 1;
  const d = config.birthDay;
  const isToday = now.getMonth() === m && now.getDate() === d;

  let next = new Date(now.getFullYear(), m, d, 0, 0, 0, 0);
  if (!isToday && now.getTime() > next.getTime()) {
    next = new Date(now.getFullYear() + 1, m, d, 0, 0, 0, 0);
  }

  const turning = (isToday ? now.getFullYear() : next.getFullYear()) - config.birthYear;
  const diff = Math.max(0, next.getTime() - now.getTime());

  return {
    isToday,
    turning,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const info = useMemo(() => getBirthdayInfo(now), [now]);

  const stats = useMemo(() => {
    const daysAlive = Math.floor((now.getTime() - birthDate.getTime()) / 86_400_000);
    return [
      { icon: "🌅", value: daysAlive, label: "يوم نوّرتي فيهم الدنيا" },
      { icon: "⏳", value: daysAlive * 24, label: "ساعة من الجمال" },
      { icon: "💓", value: daysAlive * 100_800, label: "دقة قلب تقريباً" },
      { icon: "🌕", value: Math.floor(daysAlive / 29.53), label: "قمر كامل شوفتيه" },
    ];
  }, [now.getDate()]); // eslint-disable-line react-hooks/exhaustive-deps

  const units = [
    { label: "يوم", value: String(info.days) },
    { label: "ساعة", value: pad2(info.hours) },
    { label: "دقيقة", value: pad2(info.minutes) },
    { label: "ثانية", value: pad2(info.seconds) },
  ];

  return (
    <section id="countdown" className="relative overflow-hidden py-20 sm:py-28">
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="font-script text-3xl text-rose-500">Counting the moments</p>
          {info.isToday ? (
            <>
              <h2 className="mt-2 font-display text-4xl text-rose-deep sm:text-6xl">
                النهارده عيد ميلادك! 🎉
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-amiri text-xl leading-relaxed text-plum/80 sm:text-2xl">
                كل سنة وانتي طيبة يا {config.herName}… النهارده بتكملي{" "}
                <span className="font-bold text-rose-deep">{info.turning}</span>{" "}
                سنة من الجمال والحب 💕
              </p>
            </>
          ) : (
            <>
              <h2 className="mt-2 font-display text-4xl text-rose-deep sm:text-6xl">
                العد التنازلي لعيد ميلادك
              </h2>
              <p className="mx-auto mt-4 max-w-2xl font-amiri text-xl leading-relaxed text-plum/80 sm:text-2xl">
                فاضل قد إيه على أحلى يوم في السنة؟
              </p>
            </>
          )}
        </Reveal>

        {!info.isToday && (
          <Reveal delay={150} className="mt-12">
            <div className="mx-auto grid max-w-3xl grid-cols-4 gap-2 sm:gap-5">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="group relative rounded-2xl border border-rose-100 bg-white/80 p-3 text-center shadow-lg shadow-rose-900/5 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl sm:p-6"
                >
                  <div className="absolute inset-x-4 top-0 h-1 rounded-b-full bg-gradient-to-r from-rose-400 via-gold to-rose-400 opacity-70" />
                  <div
                    dir="ltr"
                    className="font-amiri text-3xl font-bold tabular-nums text-rose-deep sm:text-6xl"
                  >
                    {u.value}
                  </div>
                  <div className="mt-1 text-xs font-semibold text-plum/70 sm:mt-2 sm:text-base">
                    {u.label}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 text-center font-amiri text-xl text-plum/80 sm:text-2xl">
              وهتطفي{" "}
              <span className="rounded-xl bg-rose-100 px-3 py-1 font-bold text-rose-deep">
                {info.turning}
              </span>{" "}
              شمعة 🎂 وأنا بتمنالك كل الأمنيات اللي في الدنيا
            </p>
          </Reveal>
        )}

        {/* Life in numbers */}
        <Reveal delay={250} className="mt-16">
          <div className="ornament mb-8">
            <span className="font-display text-2xl text-rose-deep sm:text-3xl">
              عمرك بالأرقام… وكل رقم فيهم حكاية
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 100}
                className="rounded-2xl bg-gradient-to-br from-white to-rose-50 p-5 text-center shadow-md shadow-rose-900/5 ring-1 ring-rose-100 sm:rounded-3xl sm:p-7"
              >
                <div className="text-3xl sm:text-4xl">{s.icon}</div>
                <div
                  dir="ltr"
                  className="mt-2 font-amiri text-2xl font-bold tabular-nums text-rose-deep sm:text-4xl"
                >
                  {formatNumber(s.value)}
                </div>
                <div className="mt-1 text-xs font-semibold text-plum/70 sm:text-sm">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
