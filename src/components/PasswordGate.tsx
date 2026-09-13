import { useEffect, useRef, useState, type FormEvent } from "react";
import FloatingHearts from "./FloatingHearts";
import { config, music } from "../data/content";
import { celebrateUnlock } from "../utils/celebrate";
import { cn } from "../utils/cn";
import { useMusic } from "../music/MusicPlayer";

interface PasswordGateProps {
  onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { play: playMusic } = useMusic();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (success) return;

    if (value.trim() === config.password) {
      // 🎵 Start the song right inside the user's click/enter gesture
      // so browsers allow audio playback.
      playMusic();
      setSuccess(true);
      setError(false);
      celebrateUnlock();
      setTimeout(onUnlock, 1700);
    } else {
      setError(true);
      setAttempts((a) => a + 1);
      setValue("");
      inputRef.current?.focus();
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-plum via-rose-deep to-rose-mid px-4 py-10">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-rose-400/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-gold/20 blur-3xl" />

      <FloatingHearts count={22} />

      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-3xl border border-white/20 bg-white/10 p-7 text-center shadow-2xl shadow-black/30 backdrop-blur-xl transition-all duration-700 sm:p-10",
          error && "animate-shake",
          success && "scale-105 border-gold/60 shadow-gold/30",
        )}
      >
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 via-rose-500 to-rose-700 shadow-xl shadow-rose-900/40 ring-4 ring-white/20">
          <span
            className={cn(
              "text-5xl transition-transform duration-500",
              success ? "animate-heartbeat" : "",
            )}
            aria-hidden
          >
            {success ? "💖" : "🔐"}
          </span>
        </div>

        <p className="font-script text-2xl text-gold-light sm:text-3xl">
          For my one &amp; only
        </p>
        <h1 className="mt-1 font-display text-3xl leading-snug text-white sm:text-4xl">
          {success ? "أهلاً بيكي يا أحلى قلب 💕" : "الموقع ده لقلب واحد بس"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-rose-100/90 sm:text-base">
          {success
            ? "ثواني وهديتك تتفتح… سمعتي الأغنية؟ 🎶"
            : "اكتبي كلمة السر عشان تفتحي هديتك"}
        </p>

        {!success && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-gold-light ring-1 ring-gold/30 sm:text-sm">
            <span className="animate-heartbeat inline-block">🔊</span>
            علّي الصوت… فيه مفاجأة مستنياكي
          </p>
        )}

        {!success && (
          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                inputMode="numeric"
                autoComplete="off"
                dir="ltr"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="• • • • • • •"
                aria-label="كلمة السر"
                className={cn(
                  "w-full rounded-2xl border bg-white/90 px-5 py-4 text-center text-2xl font-semibold tracking-[0.4em] text-plum shadow-inner outline-none transition-all placeholder:tracking-[0.3em] placeholder:text-rose-300 focus:ring-4",
                  error
                    ? "border-red-400 ring-4 ring-red-400/40"
                    : "border-white/40 focus:border-gold focus:ring-gold/30",
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-rose-400 transition hover:text-rose-600"
                aria-label={showPassword ? "خبّي كلمة السر" : "وريني كلمة السر"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <div className="min-h-6">
              {error && (
                <p className="animate-fade-in text-sm font-semibold text-rose-200">
                  كلمة السر غلط… جربي تاني 💔
                </p>
              )}
            </div>

            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold bg-[length:200%_auto] px-6 py-4 text-lg font-bold text-plum shadow-lg shadow-black/20 transition-all hover:bg-right hover:shadow-xl active:scale-[0.98]"
            >
              <span className="relative z-10">افتحي هديتك 🎁</span>
            </button>

            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowHint((s) => !s)}
                className="text-xs text-rose-100/70 underline-offset-4 transition hover:text-white hover:underline sm:text-sm"
              >
                {showHint ? "خبّي التلميح" : "نسيتي كلمة السر؟ 🤔"}
              </button>
              {(showHint || attempts >= 2) && (
                <p className="mt-2 animate-fade-in rounded-xl bg-white/10 px-4 py-2 text-xs text-rose-50 sm:text-sm">
                  💡 تلميح: أحلى تاريخ في السنة… يوم ميلادك
                  <span className="mx-1 font-semibold">(اليوم والشهر والسنة)</span>
                  من غير فواصل
                </p>
              )}
            </div>
          </form>
        )}

        {success && (
          <>
            <div className="mt-6 flex justify-center gap-2 text-3xl">
              {["💗", "💕", "💖", "💞", "💝"].map((h, i) => (
                <span
                  key={i}
                  className="animate-bounce-soft"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  {h}
                </span>
              ))}
            </div>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs text-gold-light ring-1 ring-gold/30 sm:text-sm">
              🎵 {music.title} — {music.artist}
            </p>
          </>
        )}
      </div>

      <p className="absolute bottom-5 left-0 right-0 text-center text-xs text-white/50">
        معمول بكل الحب ❤️ Made with all the love
      </p>
    </div>
  );
}
