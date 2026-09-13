import { useCallback, useEffect, useState } from "react";
import PasswordGate from "./components/PasswordGate";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import LoveLetter from "./components/LoveLetter";
import Gallery from "./components/Gallery";
import Reasons from "./components/Reasons";
import Wishes from "./components/Wishes";
import Finale from "./components/Finale";
import Footer from "./components/Footer";
import { MusicProvider } from "./music/MusicPlayer";

const STORAGE_KEY = "love-site-unlocked";

export default function App() {
  const [unlocked, setUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  });

  const unlock = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setUnlocked(true);
    window.scrollTo({ top: 0 });
  }, []);

  const lock = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setUnlocked(false);
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  return (
    // The music player is mounted from the very start so the song is
    // preloaded on the password screen and starts instantly on unlock.
    <MusicProvider showWidget={unlocked}>
      {!unlocked ? (
        <PasswordGate onUnlock={unlock} />
      ) : (
        <div dir="rtl" className="min-h-screen animate-fade-in bg-blush font-body text-plum">
          <Navbar onLock={lock} />
          <main>
            <Hero />
            <Countdown />
            <LoveLetter />
            <Gallery />
            <Reasons />
            <Wishes />
            <Finale />
          </main>
          <Footer />
        </div>
      )}
    </MusicProvider>
  );
}
