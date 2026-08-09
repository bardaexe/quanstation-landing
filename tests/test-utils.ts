import { vi } from "vitest";

export function mockMatchMedia(matches: (query: string) => boolean = () => false) {
  const matchMedia = vi.fn((query: string) => ({
    addEventListener: vi.fn(),
    addListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
    matches: matches(query),
    media: query,
    onchange: null,
    removeEventListener: vi.fn(),
    removeListener: vi.fn(),
  }) as unknown as MediaQueryList);

  vi.stubGlobal("matchMedia", matchMedia);
  return matchMedia;
}

export function mockReducedMotion(reduced = true) {
  return mockMatchMedia((query) => query.includes("prefers-reduced-motion") && reduced);
}
