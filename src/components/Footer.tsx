export default function Footer() {
  return (
    <footer className="bg-plum py-8 text-center text-rose-100/70">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-amiri text-lg">
          معمول بكل الحب <span className="animate-heartbeat inline-block">❤️</span> عشانك انتي بس
        </p>
        <p className="mt-1 font-script text-xl text-gold-light/80">
          Made with all the love, only for you
        </p>
        <a
          href="#home"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-xs font-semibold transition hover:bg-white/10 hover:text-white"
        >
          ارجعي لفوق ↑
        </a>
      </div>
    </footer>
  );
}
