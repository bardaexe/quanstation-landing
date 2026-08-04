"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const staggerSelector = [
  ".anchor-links > a",
  ".workflow-rail > div",
  ".trust-cell",
  ".plan-paths > div",
  ".pricing-card",
  ".pricing-group-label",
  ".guide-grid > article",
  ".integration-matrix > span",
  ".diagram-layers > article",
  ".principles-grid > article",
  ".story-aside > a",
  ".chapter-copy li",
  ".contact-facts > div",
  ".faq-item",
  ".story-visual",
  ".chapter-visual",
].join(",");

const copySelector = [
  ".page-hero > p",
  ".section-intro > p",
  ".story-aside > p",
  ".trust-copy > p",
  ".pricing-preview-heading > p",
  ".final-cta > p",
  ".chapter-copy > p",
  ".comparison-heading > p",
  ".pricing-note > p",
  ".integrations-section > div:first-child > p",
  ".boundary-callout > p",
  ".contact-copy > p",
].join(",");

const depthSelector = [
  ".story-visual",
  ".chapter-visual",
  ".diagram-core",
  ".final-glow",
].join(",");

const variants = ["rise", "left", "right", "focus"] as const;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function motionVariant(section: HTMLElement, index: number) {
  if (section.classList.contains("hero")) return "hero";
  if (section.classList.contains("page-hero") || section.classList.contains("contact-page")) return "focus";
  if (section.classList.contains("feature-story") || section.classList.contains("platform-chapter")) {
    return index % 2 === 0 ? "left" : "right";
  }
  return variants[index % variants.length];
}

export function MotionSystem() {
  const pathname = usePathname();
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const main = document.querySelector<HTMLElement>("main");
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const nestedScenes = Array.from(document.querySelectorAll<HTMLElement>(".pricing-group"));
    const scenes = [...sections, ...nestedScenes];
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const depthCapability = window.matchMedia("(min-width: 961px) and (hover: hover) and (pointer: fine)");
    const activeSections = new Set<HTMLElement>();
    const releaseTimers = new Map<HTMLElement, number>();
    const sectionIndexes = new Map(sections.map((section, index) => [section, index]));
    let reducedMotion = motionPreference.matches;
    let depthEnabled = !reducedMotion && depthCapability.matches && "IntersectionObserver" in window;
    let scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    let motionFrame = 0;

    const belongsToScene = (item: HTMLElement, scene: HTMLElement) => {
      const pricingGroup = item.closest<HTMLElement>(".pricing-group");
      return !pricingGroup || pricingGroup === scene;
    };

    const releaseEntranceLayers = (section: HTMLElement) => {
      const timer = releaseTimers.get(section);
      if (timer !== undefined) window.clearTimeout(timer);
      releaseTimers.delete(section);

      section.querySelectorAll<HTMLElement>(".motion-stagger-item").forEach((item) => {
        if (!belongsToScene(item, section)) return;
        item.classList.remove("motion-stagger-item");
        item.style.removeProperty("--motion-order");
        item.style.removeProperty("--motion-x");
        item.style.removeProperty("--motion-tilt");
      });
      section.querySelectorAll<HTMLElement>(".motion-heading, .motion-copy, .motion-visual").forEach((item) => {
        if (!belongsToScene(item, section)) return;
        item.classList.remove("motion-heading", "motion-copy", "motion-visual");
        item.style.removeProperty("--motion-order");
      });
      section.classList.add("motion-settled");
    };

    const clearDepthState = (section: HTMLElement) => {
      section.style.removeProperty("--motion-depth");
      section.style.removeProperty("--motion-depth-reverse");
      section.style.removeProperty("--motion-progress");
    };

    const revealSection = (section: HTMLElement) => {
      section.classList.add("is-visible");
      if (reducedMotion) {
        releaseEntranceLayers(section);
      } else if (!releaseTimers.has(section) && !section.classList.contains("motion-settled")) {
        releaseTimers.set(section, window.setTimeout(() => releaseEntranceLayers(section), 1200));
      }
    };

    scenes.forEach((section, sectionIndex) => {
      section.classList.add("motion-scene");
      if (sections.includes(section)) section.classList.add("motion-section");
      section.dataset.motionVariant = nestedScenes.includes(section)
        ? "focus"
        : motionVariant(section, sectionIndex);

      if (!section.classList.contains("hero")) {
        section.querySelectorAll<HTMLElement>("h1, h2").forEach((heading, headingIndex) => {
          if (!belongsToScene(heading, section)) return;
          heading.classList.add("motion-heading");
          heading.style.setProperty("--motion-order", String(Math.min(headingIndex, 3)));
        });
        section.querySelectorAll<HTMLElement>(copySelector).forEach((copy, copyIndex) => {
          if (!belongsToScene(copy, section)) return;
          copy.classList.add("motion-copy");
          copy.style.setProperty("--motion-order", String(Math.min(copyIndex, 3)));
        });
      }

      section.querySelectorAll<HTMLElement>(staggerSelector).forEach((item, itemIndex) => {
        if (!belongsToScene(item, section)) return;
        const direction = itemIndex % 2 === 0 ? -1 : 1;
        item.classList.add("motion-stagger-item");
        item.style.setProperty("--motion-order", String(Math.min(itemIndex, 6)));
        item.style.setProperty("--motion-x", `${direction * (12 + Math.min(itemIndex, 4) * 3)}px`);
        item.style.setProperty("--motion-tilt", `${direction * 0.7}deg`);
      });

      section.querySelectorAll<HTMLElement>(".product-visual").forEach((visual) => {
        if (belongsToScene(visual, section)) visual.classList.add("motion-visual");
      });

      section.querySelectorAll<HTMLElement>(depthSelector).forEach((target, targetIndex) => {
        target.classList.add(targetIndex % 2 === 0 ? "motion-depth-forward" : "motion-depth-reverse");
      });
    });

    const setStyleProperty = (element: HTMLElement, name: string, value: string) => {
      if (element.style.getPropertyValue(name) !== value) element.style.setProperty(name, value);
    };

    const syncScrollMotion = () => {
      motionFrame = 0;
      const progressNode = progressRef.current;
      const viewportHeight = Math.max(window.innerHeight, 1);
      const pageProgress = clamp(window.scrollY / scrollRange, 0, 1);
      const readingLine = viewportHeight * 0.48;
      let currentIndex: number | null = null;
      let currentDistance = Number.POSITIVE_INFINITY;
      const depthUpdates: Array<{
        section: HTMLElement;
        depth: string;
        reverseDepth: string;
        progress: string;
      }> = [];

      if (depthEnabled) {
        activeSections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const travel = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
          const centered = travel - 0.5;
          depthUpdates.push({
            section,
            depth: `${(centered * -12).toFixed(2)}px`,
            reverseDepth: `${(centered * 8).toFixed(2)}px`,
            progress: travel.toFixed(4),
          });

          const distance = rect.top <= readingLine && rect.bottom >= readingLine
            ? 0
            : Math.min(Math.abs(rect.top - readingLine), Math.abs(rect.bottom - readingLine));
          if (distance < currentDistance) {
            currentDistance = distance;
            currentIndex = sectionIndexes.get(section) ?? null;
          }
        });
      }

      depthUpdates.forEach(({ section, depth, reverseDepth, progress }) => {
        setStyleProperty(section, "--motion-depth", depth);
        setStyleProperty(section, "--motion-depth-reverse", reverseDepth);
        setStyleProperty(section, "--motion-progress", progress);
      });

      if (progressNode) {
        const progressValue = pageProgress.toFixed(4);
        const visibility = pageProgress > 0.012 && pageProgress < 0.992 ? "true" : "false";
        setStyleProperty(progressNode, "--page-progress", progressValue);
        if (progressNode.dataset.visible !== visibility) progressNode.dataset.visible = visibility;
        if (currentIndex !== null) {
          const sectionLabel = String(currentIndex + 1).padStart(2, "0");
          if (progressNode.dataset.section !== sectionLabel) progressNode.dataset.section = sectionLabel;
        }
      }
    };

    const scheduleScrollMotion = () => {
      if (!motionFrame && !document.hidden && !reducedMotion && window.innerWidth > 960) {
        motionFrame = window.requestAnimationFrame(syncScrollMotion);
      }
    };

    const reconcileDepthSections = () => {
      activeSections.clear();
      sections.forEach((section) => {
        if (depthEnabled && section.classList.contains("is-in-viewport")) activeSections.add(section);
        else clearDepthState(section);
      });
    };

    const refreshLayoutMetrics = () => {
      scrollRange = Math.max(root.scrollHeight - Math.max(window.innerHeight, 1), 1);
      depthEnabled = !reducedMotion && depthCapability.matches && "IntersectionObserver" in window;
      reconcileDepthSections();
      if ((reducedMotion || window.innerWidth <= 960) && motionFrame) {
        window.cancelAnimationFrame(motionFrame);
        motionFrame = 0;
      } else {
        scheduleScrollMotion();
      }
    };

    const revealObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries, observerInstance) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const section = entry.target as HTMLElement;
              revealSection(section);
              observerInstance.unobserve(section);
            });
          },
          { rootMargin: "0px 0px -8%", threshold: 0 },
        )
      : null;

    const activityObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const section = entry.target as HTMLElement;
              section.classList.toggle("is-in-viewport", entry.isIntersecting);
              if (entry.isIntersecting && depthEnabled) activeSections.add(section);
              else {
                activeSections.delete(section);
                clearDepthState(section);
              }
            });
            scheduleScrollMotion();
          },
          { rootMargin: "160px 0px", threshold: 0 },
        )
      : null;

    const syncDocumentVisibility = () => {
      root.classList.toggle("document-hidden", document.hidden);
      if (document.hidden && motionFrame) {
        window.cancelAnimationFrame(motionFrame);
        motionFrame = 0;
      } else if (!document.hidden) {
        refreshLayoutMetrics();
      }
    };

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      if (reducedMotion) scenes.forEach(revealSection);
      refreshLayoutMetrics();
    };

    const handleDepthCapability = () => refreshLayoutMetrics();

    root.classList.add("motion-enhanced");
    if (progressRef.current) {
      progressRef.current.dataset.total = String(sections.length).padStart(2, "0");
    }

    if (reducedMotion) scenes.forEach(revealSection);
    else if (sections[0]) revealSection(sections[0]);

    if (revealObserver) scenes.forEach((section) => revealObserver.observe(section));
    else scenes.forEach((section) => {
      revealSection(section);
    });

    if (activityObserver) sections.forEach((section) => activityObserver.observe(section));
    else sections.forEach((section) => section.classList.add("is-in-viewport"));

    const resizeObserver = main && "ResizeObserver" in window
      ? new ResizeObserver(refreshLayoutMetrics)
      : null;
    if (main) resizeObserver?.observe(main);

    syncDocumentVisibility();
    refreshLayoutMetrics();
    window.addEventListener("scroll", scheduleScrollMotion, { passive: true });
    window.addEventListener("resize", refreshLayoutMetrics, { passive: true });
    window.addEventListener("pageshow", refreshLayoutMetrics);
    document.addEventListener("visibilitychange", syncDocumentVisibility);
    motionPreference.addEventListener("change", handleMotionPreference);
    depthCapability.addEventListener("change", handleDepthCapability);

    return () => {
      revealObserver?.disconnect();
      activityObserver?.disconnect();
      resizeObserver?.disconnect();
      if (motionFrame) window.cancelAnimationFrame(motionFrame);
      releaseTimers.forEach((timer) => window.clearTimeout(timer));
      releaseTimers.clear();
      activeSections.clear();
      window.removeEventListener("scroll", scheduleScrollMotion);
      window.removeEventListener("resize", refreshLayoutMetrics);
      window.removeEventListener("pageshow", refreshLayoutMetrics);
      document.removeEventListener("visibilitychange", syncDocumentVisibility);
      motionPreference.removeEventListener("change", handleMotionPreference);
      depthCapability.removeEventListener("change", handleDepthCapability);
      root.classList.remove("document-hidden");

      scenes.forEach((section) => {
        releaseEntranceLayers(section);
        section.classList.remove("motion-scene", "motion-section", "motion-settled", "is-visible", "is-in-viewport");
        clearDepthState(section);
        delete section.dataset.motionVariant;
        section.querySelectorAll<HTMLElement>(".motion-depth-forward, .motion-depth-reverse").forEach((target) => {
          target.classList.remove("motion-depth-forward", "motion-depth-reverse");
        });
      });
    };
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      className="scroll-progress"
      data-section="01"
      data-total="00"
      data-visible="false"
      ref={progressRef}
    >
      <span>Scroll</span>
      <i><b /></i>
    </div>
  );
}
