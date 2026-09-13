import { useCallback, useEffect, useState } from "react";
import Reveal from "./Reveal";
import { photos } from "../data/content";

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((a) => (a === null ? null : (a + 1) % photos.length)),
    [],
  );
  const prev = useCallback(
    () => setActive((a) => (a === null ? null : (a - 1 + photos.length) % photos.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // RTL: left arrow goes forward
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, next, prev]);

  // Touch swipe
  const [touchX, setTouchX] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="font-script text-3xl text-rose-500">Our lovely moments</p>
          <h2 className="mt-2 font-display text-4xl text-rose-deep sm:text-6xl">صور من قلبي</h2>
          <p className="mx-auto mt-4 max-w-xl font-amiri text-lg text-plum/75 sm:text-xl">
            كل صورة هنا فيها إحساس… وكل إحساس فيها بيقول: بحبك
          </p>
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {photos.map((p, i) => (
            <Reveal
              key={i}
              as="figure"
              delay={(i % 3) * 120}
              className="mb-5 break-inside-avoid"
            >
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-3xl bg-rose-100 shadow-lg shadow-rose-900/10 ring-1 ring-rose-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-rose-900/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-400"
                aria-label={p.caption}
              >
                <img
                  src={p.src}
                  alt={p.caption}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    p.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                />
                {/* Gradient overlay + caption */}
                <div className="absolute inset-0 bg-gradient-to-t from-plum/85 via-plum/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 block p-5 text-right text-white">
                  <span className="block font-display text-xl drop-shadow sm:text-2xl">
                    {p.caption}
                  </span>
                  <span className="mt-0.5 block font-script text-lg text-gold-light/90 sm:text-xl">
                    {p.sub}
                  </span>
                </span>
                {/* Heart badge */}
                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-lg backdrop-blur-md transition-transform duration-500 group-hover:scale-125">
                  💗
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <p className="text-sm text-plum/60">
            دوسي على أي صورة عشان تشوفيها أكبر ✨
          </p>
        </Reveal>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-plum/95 p-4 backdrop-blur-md"
          onClick={close}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX === null) return;
            const dx = e.changedTouches[0].clientX - touchX;
            if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
            setTouchX(null);
          }}
        >
          <button
            onClick={close}
            aria-label="إغلاق"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
          >
            ✕
          </button>

          {/* Prev (visually right in RTL) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="السابق"
            className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:flex"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="التالي"
            className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:flex"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <figure
            className="flex max-h-full w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={active}
              src={photos[active].src}
              alt={photos[active].caption}
              className="max-h-[72vh] w-auto max-w-full animate-fade-in rounded-2xl object-contain shadow-2xl ring-1 ring-white/20"
            />
            <figcaption className="mt-5 text-center text-white">
              <p className="font-display text-2xl sm:text-3xl">{photos[active].caption}</p>
              <p className="mt-1 font-script text-xl text-gold-light sm:text-2xl">
                {photos[active].sub}
              </p>
              <p dir="ltr" className="mt-3 text-xs tabular-nums text-white/50">
                {active + 1} / {photos.length}
              </p>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
