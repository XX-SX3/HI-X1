import confetti from "canvas-confetti";

const ROMANTIC_COLORS = ["#fb7185", "#f43f5e", "#be123c", "#d4af37", "#fda4af", "#fff1f2"];

function heartShape() {
  try {
    return confetti.shapeFromText({ text: "❤️", scalar: 2 });
  } catch {
    return undefined;
  }
}

/** Big celebration burst — used when the site unlocks */
export function celebrateUnlock() {
  const heart = heartShape();
  const shapes = heart ? [heart, "circle" as const] : ["circle" as const];
  const end = Date.now() + 1800;

  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors: ROMANTIC_COLORS,
      shapes,
      scalar: 1.3,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors: ROMANTIC_COLORS,
      shapes,
      scalar: 1.3,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

/** Heart fountain — used when candles are blown out */
export function celebrateWish() {
  const heart = heartShape();
  const shapes = heart ? [heart] : ["circle" as const];

  confetti({
    particleCount: 90,
    spread: 100,
    startVelocity: 45,
    origin: { x: 0.5, y: 0.6 },
    colors: ROMANTIC_COLORS,
    shapes,
    scalar: 1.8,
    ticks: 260,
  });

  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 160,
      startVelocity: 35,
      origin: { x: 0.5, y: 0.5 },
      colors: ROMANTIC_COLORS,
      ticks: 300,
    });
  }, 250);
}

/** Small burst at a point (e.g. clicking a heart) */
export function smallBurst(x: number, y: number) {
  const heart = heartShape();
  confetti({
    particleCount: 18,
    spread: 60,
    startVelocity: 25,
    origin: { x, y },
    colors: ROMANTIC_COLORS,
    shapes: heart ? [heart] : ["circle"],
    scalar: 1.4,
    ticks: 120,
  });
}
