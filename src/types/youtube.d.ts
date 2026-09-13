/* Minimal ambient typings for the YouTube IFrame Player API (loaded at runtime). */

declare namespace YT {
  interface PlayerEvent {
    target: Player;
    data: number;
  }

  interface PlayerEvents {
    onReady?: (event: PlayerEvent) => void;
    onStateChange?: (event: PlayerEvent) => void;
    onError?: (event: PlayerEvent) => void;
  }

  interface PlayerOptions {
    videoId?: string;
    width?: string | number;
    height?: string | number;
    playerVars?: Record<string, string | number>;
    events?: PlayerEvents;
  }

  class Player {
    constructor(element: string | HTMLElement, options: PlayerOptions);
    playVideo(): void;
    pauseVideo(): void;
    stopVideo(): void;
    seekTo(seconds: number, allowSeekAhead?: boolean): void;
    mute(): void;
    unMute(): void;
    isMuted(): boolean;
    setVolume(volume: number): void;
    getPlayerState(): number;
    loadVideoById(videoId: string, startSeconds?: number): void;
    cueVideoById(videoId: string, startSeconds?: number): void;
    getIframe(): HTMLIFrameElement;
    destroy(): void;
  }
}

interface Window {
  YT?: typeof YT;
  onYouTubeIframeAPIReady?: () => void;
}
