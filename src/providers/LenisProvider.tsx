"use client";

import { ReactLenis } from "lenis/react";
import { useSyncExternalStore } from "react";

const LENIS_OPTIONS = {
  autoRaf: true,
  lerp: 0.065,
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 1,
  wheelMultiplier: 1,
  anchors: true,
} as const;

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );

  if (reduceMotion) {
    return children;
  }

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      {children}
    </ReactLenis>
  );
}
