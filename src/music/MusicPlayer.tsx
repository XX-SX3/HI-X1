import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { music } from "../data/content";
import { cn } from "../utils/cn";

/* ───────────────────────── YouTube API loader ───────────────────────── */

const API_SRC = "https://www.youtube.com/iframe_api";
let apiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<void>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve();
    };
    const script = document.createElement("script");
    script.src = API_SRC;
    script.async = true;
    script.onerror = () => reject(new Error("YouTube API failed to load"));
    document.head.appendChild(script);
  });

  return apiPromise;
}

/* Player states (mirrors YT.PlayerState) */
const STATE = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
} as const;

const EMBED_ERROR_CODES = new Set([2, 5, 100, 101, 150]);

/* ───────────────────────── Context ───────────────────────── */

interface MusicContextValue {
  ready: boolean;
  isPlaying: boolean;
  muted: boolean;
  blocked: boolean;
  apiFailed: boolean;
  videoError: boolean;
  hasRequested: boolean;
  panelOpen: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  toggleMute: () => void;
  restart: () => void;
  setPanelOpen: (open: boolean) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside <MusicProvider>");
  return ctx;
}

/* ───────────────────────── Provider + Widget ───────────────────────── */

interface MusicProviderProps {
  children: ReactNode;
  /** Show the floating player widget (hidden on the password screen) */
  showWidget: boolean;
}

export function MusicProvider({ children, showWidget }: MusicProviderProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const readyRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const blockTimerRef = useRef<number | null>(null);
  const autoOpenedRef = useRef(false);
  const idIndexRef = useRef(0);

  const [ready, setReady] = useState(false);
  const [playerState, setPlayerState] = useState<number>(STATE.UNSTARTED);
  const [muted, setMuted] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [panelOpen, setPanelOpenState] = useState(false);

  const isPlaying = playerState === STATE.PLAYING || playerState === STATE.BUFFERING;

  const embedSrc = useMemo(() => {
    const params = new URLSearchParams({
      enablejsapi: "1",
      playsinline: "1",
      controls: "1",
      rel: "0",
      fs: "0",
      iv_load_policy: "3",
      color: "white",
      hl: "ar",
    });
    if (/^https?:$/.test(window.location.protocol)) {
      params.set("origin", window.location.origin);
    }
    return `https://www.youtube.com/embed/${music.youtubeIds[0]}?${params.toString()}`;
  }, []);

  const clearBlockTimer = () => {
    if (blockTimerRef.current !== null) {
      window.clearTimeout(blockTimerRef.current);
      blockTimerRef.current = null;
    }
  };

  /** Send the play command and detect whether the browser blocked it */
  const sendPlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    try {
      player.playVideo();
    } catch {
      /* ignore */
    }
    clearBlockTimer();
    blockTimerRef.current = window.setTimeout(() => {
      let state: number | undefined;
      try {
        state = playerRef.current?.getPlayerState();
      } catch {
        state = undefined;
      }
      if (state !== STATE.PLAYING && state !== STATE.BUFFERING) {
        setBlocked(true);
      }
    }, 3000);
  }, []);

  const play = useCallback(() => {
    setHasRequested(true);
    setBlocked(false);
    if (!readyRef.current || !playerRef.current) {
      pendingPlayRef.current = true;
      return;
    }
    sendPlay();
  }, [sendPlay]);

  const pause = useCallback(() => {
    pendingPlayRef.current = false;
    clearBlockTimer();
    try {
      playerRef.current?.pauseVideo();
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, pause, play]);

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (player.isMuted()) {
        player.unMute();
        setMuted(false);
      } else {
        player.mute();
        setMuted(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const restart = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    try {
      player.seekTo(0, true);
    } catch {
      /* ignore */
    }
    play();
  }, [play]);

  const setPanelOpen = useCallback((open: boolean) => {
    autoOpenedRef.current = false;
    setPanelOpenState(open);
  }, []);

  /* Initialise the player once */
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let cancelled = false;

    const failTimer = window.setTimeout(() => {
      if (!cancelled && !readyRef.current) setApiFailed(true);
    }, 20000);

    loadYouTubeApi()
      .then(() => {
        if (cancelled || !window.YT) return;
        playerRef.current = new window.YT.Player(iframe, {
          events: {
            onReady: () => {
              if (cancelled) return;
              readyRef.current = true;
              setReady(true);
              setApiFailed(false);
              if (pendingPlayRef.current) {
                pendingPlayRef.current = false;
                sendPlay();
              }
            },
            onStateChange: (event) => {
              if (cancelled) return;
              const state = event.data;
              setPlayerState(state);
              if (state === STATE.PLAYING) {
                setBlocked(false);
                setVideoError(false);
                clearBlockTimer();
                if (autoOpenedRef.current) {
                  autoOpenedRef.current = false;
                  setPanelOpenState(false);
                }
              }
              if (state === STATE.ENDED) {
                // Loop the song forever 💕
                try {
                  event.target.seekTo(0, true);
                  event.target.playVideo();
                } catch {
                  /* ignore */
                }
              }
            },
            onError: (event) => {
              if (cancelled || !EMBED_ERROR_CODES.has(event.data)) return;
              const next = idIndexRef.current + 1;
              if (next < music.youtubeIds.length) {
                idIndexRef.current = next;
                try {
                  event.target.loadVideoById(music.youtubeIds[next]);
                } catch {
                  /* ignore */
                }
              } else {
                setVideoError(true);
                clearBlockTimer();
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setApiFailed(true);
      });

    return () => {
      cancelled = true;
      window.clearTimeout(failTimer);
      clearBlockTimer();
    };
  }, [sendPlay]);

  /* Pause when the site gets locked again */
  useEffect(() => {
    if (!showWidget && readyRef.current) pause();
  }, [showWidget, pause]);

  /* Auto-open the panel when autoplay was blocked or the API failed, so she can tap ▶ */
  useEffect(() => {
    if (showWidget && (blocked || apiFailed || videoError) && !isPlaying) {
      autoOpenedRef.current = true;
      setPanelOpenState(true);
    }
  }, [blocked, apiFailed, videoError, isPlaying, showWidget]);

  const value = useMemo<MusicContextValue>(
    () => ({
      ready,
      isPlaying,
      muted,
      blocked,
      apiFailed,
      videoError,
      hasRequested,
      panelOpen,
      play,
      pause,
      toggle,
      toggleMute,
      restart,
      setPanelOpen,
    }),
    [
      ready,
      isPlaying,
      muted,
      blocked,
      apiFailed,
      videoError,
      hasRequested,
      panelOpen,
      play,
      pause,
      toggle,
      toggleMute,
      restart,
      setPanelOpen,
    ],
  );

  const needsTap = !isPlaying && (blocked || apiFailed);

  const statusLabel = videoError
    ? "الأغنية مش متاحة دلوقتي"
    : isPlaying
      ? "بتشتغل دلوقتي"
      : !ready && !apiFailed
        ? "بتحمّل الأغنية…"
        : needsTap
          ? "دوسي هنا عشان تسمعيها"
          : hasRequested
            ? "متوقفة مؤقتاً"
            : "دوسي عشان تسمعي أغنيتنا";

  const currentId = music.youtubeIds[Math.min(idIndexRef.current, music.youtubeIds.length - 1)];

  return (
    <MusicContext.Provider value={value}>
      {children}

      {/* ─────── Floating player widget ─────── */}
      <div
        dir="ltr"
        className={cn(
          "fixed bottom-4 left-4 z-[60] flex flex-col items-start gap-3 transition-all duration-500",
          showWidget
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible translate-y-6 opacity-0",
        )}
      >
        {/* Expanded panel (the iframe always stays mounted here so the music never reloads) */}
        <div
          dir="rtl"
          className={cn(
            "w-[min(20rem,calc(100vw-2rem))] origin-bottom-left overflow-hidden rounded-3xl bg-white/95 shadow-2xl shadow-rose-900/25 ring-1 ring-rose-100 backdrop-blur-xl transition-all duration-500",
            panelOpen
              ? "visible translate-y-0 scale-100 opacity-100"
              : "pointer-events-none invisible translate-y-4 scale-95 opacity-0",
          )}
          aria-hidden={!panelOpen}
        >
          <div className="relative aspect-video w-full bg-plum">
            <iframe
              ref={iframeRef}
              src={embedSrc}
              title={`${music.title} - ${music.artist}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 h-full w-full border-0"
            />
            {!ready && !apiFailed && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-plum/60 text-sm text-white/90">
                <span className="animate-pulse">بتحمّل الأغنية… 🎶</span>
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold tracking-wide text-rose-400">
                  {isPlaying ? "بتشتغل دلوقتي 🎶" : "أغنيتنا 🎵"}
                </p>
                <h3 className="truncate font-display text-xl leading-tight text-rose-deep">
                  {music.title}
                </h3>
                <p className="text-sm text-plum/60">{music.artist}</p>
              </div>
              <button
                onClick={() => setPanelOpen(false)}
                aria-label="اقفلي اللوحة"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-plum/50 transition hover:bg-rose-50 hover:text-rose-deep"
              >
                ✕
              </button>
            </div>

            {needsTap && !videoError && (
              <div className="mt-3 rounded-2xl bg-rose-50 px-3 py-2.5 text-sm leading-relaxed text-rose-deep ring-1 ring-rose-100">
                <span className="animate-pulse">👆</span> المتصفح مستني إذنك… دوسي على{" "}
                <span className="font-bold">▶</span> في الفيديو أو الزرار تحت عشان تسمعي أغنيتنا 🎶
              </div>
            )}

            {videoError && (
              <div className="mt-3 rounded-2xl bg-rose-50 px-3 py-2.5 text-sm leading-relaxed text-rose-deep ring-1 ring-rose-100">
                للأسف الأغنية مش متاحة للتشغيل هنا دلوقتي 😢{" "}
                <a
                  href={`https://www.youtube.com/watch?v=${currentId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold underline underline-offset-4"
                >
                  افتحيها على يوتيوب ↗
                </a>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={toggle}
                disabled={videoError}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-rose-700 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-900/25 transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95 disabled:opacity-50"
              >
                {isPlaying ? (
                  <>
                    <PauseIcon className="h-4 w-4" /> وقّفي
                  </>
                ) : (
                  <>
                    <PlayIcon className="h-4 w-4" /> شغّلي الأغنية
                  </>
                )}
              </button>
              <IconButton onClick={restart} label="من الأول">
                <RestartIcon className="h-5 w-5" />
              </IconButton>
              <IconButton onClick={toggleMute} label={muted ? "شغّلي الصوت" : "اكتمي الصوت"}>
                {muted ? <MutedIcon className="h-5 w-5" /> : <SoundIcon className="h-5 w-5" />}
              </IconButton>
            </div>
          </div>
        </div>

        {/* Collapsed pill */}
        <div
          dir="rtl"
          className="flex items-center gap-1 rounded-full bg-white/90 p-1.5 shadow-xl shadow-rose-900/15 ring-1 ring-rose-100 backdrop-blur-xl"
        >
          {/* Vinyl disc = play / pause */}
          <button
            onClick={toggle}
            disabled={videoError}
            aria-label={isPlaying ? "وقّفي الأغنية" : "شغّلي الأغنية"}
            className={cn(
              "group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-lg shadow-rose-900/30 transition active:scale-95 disabled:opacity-50",
              !isPlaying && !videoError && "animate-heartbeat",
            )}
          >
            <span
              className={cn(
                "absolute inset-0 rounded-full",
                "bg-[repeating-radial-gradient(circle_at_center,#2a0b17_0_2px,#43122a_2px_4px)]",
                isPlaying && "animate-vinyl",
              )}
            />
            <span className="absolute inset-[30%] rounded-full bg-gradient-to-br from-rose-400 to-rose-700 ring-2 ring-plum/60" />
            <span className="relative drop-shadow">
              {isPlaying ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </span>
          </button>

          {/* Title / status → opens panel */}
          <button
            onClick={() => setPanelOpen(!panelOpen)}
            aria-expanded={panelOpen}
            className="min-w-0 rounded-full px-2 py-1 text-right transition hover:bg-rose-50"
          >
            <span className="block truncate font-display text-base leading-tight text-rose-deep">
              {music.title}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] leading-tight text-plum/60">
              {isPlaying && <Equalizer />}
              <span className="truncate">{statusLabel}</span>
            </span>
          </button>

          <IconButton onClick={toggleMute} label={muted ? "شغّلي الصوت" : "اكتمي الصوت"} small>
            {muted ? <MutedIcon className="h-4 w-4" /> : <SoundIcon className="h-4 w-4" />}
          </IconButton>
        </div>
      </div>
    </MusicContext.Provider>
  );
}

/* ───────────────────────── Small UI helpers ───────────────────────── */

function IconButton({
  children,
  onClick,
  label,
  small,
}: {
  children: ReactNode;
  onClick: () => void;
  label: string;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full text-rose-deep transition hover:bg-rose-50 active:scale-95",
        small ? "h-9 w-9" : "h-10 w-10 ring-1 ring-rose-100",
      )}
    >
      {children}
    </button>
  );
}

function Equalizer() {
  return (
    <span className="flex h-3 items-end gap-[2px]" aria-hidden>
      {[0, 0.25, 0.1, 0.4].map((delay, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom animate-eq rounded-full bg-rose-500"
          style={{ height: "100%", animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.86l10.5-6.86a1 1 0 0 0 0-1.72L9.56 4.28A1 1 0 0 0 8 5.14z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function RestartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

function SoundIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

function MutedIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
      <path d="m16 9 6 6" />
      <path d="m22 9-6 6" />
    </svg>
  );
}
