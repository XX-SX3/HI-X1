import { useEffect, useState } from "react";
import { cn } from "../utils/cn";

const links = [
  { href: "#home", label: "البداية" },
  { href: "#countdown", label: "فاضل قد إيه؟" },
  { href: "#letter", label: "رسالتي" },
  { href: "#gallery", label: "صورنا" },
  { href: "#reasons", label: "ليه بحبك" },
  { href: "#wishes", label: "أمنياتي" },
];

interface NavbarProps {
  onLock: () => void;
}

export default function Navbar({ onLock }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "bg-white/80 shadow-lg shadow-rose-900/5 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a
          href="#home"
          className={cn(
            "flex items-center gap-2 font-display text-xl transition-colors sm:text-2xl",
            scrolled || open ? "text-rose-deep" : "text-white",
          )}
        >
          <span className="animate-heartbeat inline-block">💖</span>
          <span>حبيبتي</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-all hover:bg-rose-500/10",
                  scrolled
                    ? "text-plum hover:text-rose-deep"
                    : "text-white/90 hover:bg-white/15 hover:text-white",
                )}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onLock}
            title="اقفلي الموقع"
            className={cn(
              "hidden rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:inline-flex",
              scrolled || open
                ? "border-rose-200 text-rose-deep hover:bg-rose-50"
                : "border-white/30 text-white hover:bg-white/15",
            )}
          >
            🔒 اقفلي
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="القائمة"
            aria-expanded={open}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition md:hidden",
              scrolled || open ? "text-rose-deep hover:bg-rose-50" : "text-white hover:bg-white/15",
            )}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          open ? "max-h-96 border-t border-rose-100" : "max-h-0",
        )}
      >
        <ul className="flex flex-col px-4 py-3">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-semibold text-plum transition hover:bg-rose-50 hover:text-rose-deep"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={onLock}
              className="mt-1 w-full rounded-xl px-4 py-3 text-right font-semibold text-rose-deep transition hover:bg-rose-50"
            >
              🔒 اقفلي الموقع
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
