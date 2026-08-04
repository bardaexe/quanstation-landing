"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SignalCore } from "./SignalCore";

const signals = [
  {
    id: "build",
    index: "01",
    title: "Build strategies",
    detail: "Python and native Rust",
    href: "/platform#research",
    status: "Build acquired",
    value: "Python + Rust",
  },
  {
    id: "validate",
    index: "02",
    title: "Validate evidence",
    detail: "Backtest and optimize locally",
    href: "/platform#backtesting",
    status: "Evidence locked",
    value: "Walk-forward 6 / 6",
  },
  {
    id: "execute",
    index: "03",
    title: "Execute with control",
    detail: "Live context and explicit risk",
    href: "/platform#execution",
    status: "Execution ready",
    value: "Risk rules active",
  },
] as const;

type SignalStage = "idle" | (typeof signals)[number]["id"];
type ActivationMode = "idle" | "intro" | "manual";

const statusCopy: Record<SignalStage, { label: string; value: string }> = {
  idle: { label: "Signal relay", value: "System ready" },
  build: { label: signals[0].status, value: signals[0].value },
  validate: { label: signals[1].status, value: signals[1].value },
  execute: { label: signals[2].status, value: signals[2].value },
};

export function HeroSignalExperience() {
  const [activeSignal, setActiveSignal] = useState<SignalStage>("idle");
  const [activationMode, setActivationMode] = useState<ActivationMode>("idle");
  const heroRef = useRef<HTMLDivElement>(null);
  const introTimers = useRef<number[]>([]);
  const introCancelled = useRef(false);
  const introStarted = useRef(false);
  const introCompleted = useRef(false);

  const clearIntro = useCallback(() => {
    introTimers.current.forEach((timer) => window.clearTimeout(timer));
    introTimers.current = [];
  }, []);

  const resetSignal = useCallback(() => {
    setActiveSignal("idle");
    setActivationMode("idle");
  }, []);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let heroVisible = false;
    let pageVisible = !document.hidden;

    const scheduleIntro = () => {
      clearIntro();
      if (
        motionPreference.matches
        || introCancelled.current
        || introStarted.current
        || !heroVisible
        || !pageVisible
      ) return;

      introStarted.current = true;

      const compact = window.matchMedia("(max-width: 720px)").matches;
      const timings = compact ? [700, 1120, 1540, 2100] : [900, 1460, 2020, 2780];
      const sequence: SignalStage[] = ["build", "validate", "execute", "idle"];

      introTimers.current = sequence.map((signal, index) =>
        window.setTimeout(() => {
          setActiveSignal(signal);
          setActivationMode(signal === "idle" ? "idle" : "intro");
          if (signal === "idle") {
            introCompleted.current = true;
            introTimers.current = [];
          }
        }, timings[index]),
      );
    };

    const suspendIntro = () => {
      clearIntro();
      resetSignal();
      if (!introCompleted.current && !introCancelled.current) introStarted.current = false;
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        suspendIntro();
      } else {
        scheduleIntro();
      }
    };

    const handleDocumentVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) scheduleIntro();
      else suspendIntro();
    };

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(
          ([entry]) => {
            heroVisible = entry.isIntersecting;
            if (heroVisible) scheduleIntro();
            else suspendIntro();
          },
          { rootMargin: "8% 0px", threshold: 0.2 },
        )
      : null;

    if (observer && heroRef.current) observer.observe(heroRef.current);
    else {
      heroVisible = true;
      scheduleIntro();
    }

    document.addEventListener("visibilitychange", handleDocumentVisibility);
    motionPreference.addEventListener("change", handleMotionPreference);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleDocumentVisibility);
      motionPreference.removeEventListener("change", handleMotionPreference);
      clearIntro();
    };
  }, [clearIntro, resetSignal]);

  const activateSignal = (signal: SignalStage) => {
    introCancelled.current = true;
    clearIntro();
    setActiveSignal(signal);
    setActivationMode("manual");
  };

  const releaseSignal = (link: HTMLAnchorElement) => {
    if (document.activeElement !== link) resetSignal();
  };

  const activeCopy = statusCopy[activeSignal];

  return (
    <>
      <div
        className="hero-object reveal reveal-delay"
        data-mode={activationMode}
        data-signal={activeSignal}
        ref={heroRef}
      >
        <div className="hero-core-frame" aria-hidden="true">
          <span>QS / CORE 01</span>
          <span>LOCAL SIGNAL BUS</span>
        </div>
        <SignalCore />
        {activeSignal !== "idle" && (
          <i className="core-acquire-pulse" key={`${activationMode}-${activeSignal}`} aria-hidden="true" />
        )}
        <div className="hero-signal-state" aria-hidden="true">
          <i />
          <span key={activeSignal}>
            <strong>{activeCopy.label}</strong>
            <small>{activeCopy.value}</small>
          </span>
        </div>
      </div>

      <div className="hero-relay" data-mode={activationMode} data-signal={activeSignal} aria-hidden="true">
        {signals.map((signal) => <i className="hero-relay-line" data-relay={signal.id} key={signal.id} />)}
      </div>

      <div
        className={activeSignal === "idle" ? "hero-pillars reveal reveal-delay-2" : "hero-pillars reveal reveal-delay-2 has-active"}
        data-mode={activationMode}
      >
        {signals.map((signal) => (
          <Link
            className={activeSignal === signal.id ? "is-active" : undefined}
            href={signal.href}
            key={signal.id}
            onPointerEnter={() => activateSignal(signal.id)}
            onPointerLeave={(event) => releaseSignal(event.currentTarget)}
            onFocus={() => activateSignal(signal.id)}
            onBlur={resetSignal}
          >
            <span>{signal.index}</span>
            <strong>{signal.title}</strong>
            <small>{signal.detail}</small>
          </Link>
        ))}
      </div>
    </>
  );
}
