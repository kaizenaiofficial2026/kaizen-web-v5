"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type StoryFrameProps = {
  children: ReactNode;
  final?: boolean;
  localProgress: number;
};

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function getFrameStyle(localProgress: number, final?: boolean) {
  const fadeWindow = 0.22;
  const fadeIn = clamp(localProgress / fadeWindow);
  const fadeOut = final ? 1 : clamp((1 - localProgress) / fadeWindow);
  const opacity = Math.min(fadeIn, fadeOut);
  const enteringY = (1 - fadeIn) * 34;
  const leavingY = final ? 0 : -(1 - fadeOut) * 34;
  const scale = 0.985 + opacity * (final ? 0.025 : 0.015);

  return {
    opacity,
    transform: `translate3d(0, ${enteringY + leavingY}px, 0) scale(${scale})`,
    textShadow: final
      ? `0 0 ${26 + opacity * 30}px rgba(196,154,48,${0.18 + opacity * 0.2})`
      : `0 0 ${12 + opacity * 20}px rgba(240,234,216,${0.06 + opacity * 0.1})`,
  };
}

function StoryFrame({ children, final, localProgress }: StoryFrameProps) {
  return (
    <div
      className="pointer-events-none text-center will-change-transform"
      style={getFrameStyle(localProgress, final)}
    >
      <div
        className={
          final
            ? "mx-auto max-w-6xl text-[clamp(2.15rem,5.6vw,5.8rem)] font-semibold uppercase leading-[0.94] tracking-tight text-[#F0EAD8]"
            : "mx-auto max-w-5xl text-[clamp(1.45rem,3.4vw,3.7rem)] font-semibold leading-[1.05] tracking-tight text-[#F0EAD8]"
        }
      >
        {children}
      </div>
    </div>
  );
}

function Highlight({ children }: { children: ReactNode }) {
  return (
    <span className="font-serif italic text-[#C49A30] [text-shadow:0_0_34px_rgba(196,154,48,0.3)]">
      {children}
    </span>
  );
}

const storyLines = [
  {
    content: (
      <>
        We are not an <Highlight>AI development</Highlight> company.
      </>
    ),
  },
  {
    content: (
      <>
        We are not an <Highlight>AI consulting</Highlight> company.
      </>
    ),
  },
  {
    content: (
      <>
        We are not your <Highlight>AI Education partner</Highlight>
      </>
    ),
  },
  {
    final: true,
    content: (
      <>
        WE ARE <Highlight>ALL OF THE ABOVE</Highlight> ;)
      </>
    ),
  },
];

function getActiveStory(progress: number) {
  const totalLines = storyLines.length;
  const scaledProgress = progress * totalLines;
  const activeIndex = Math.min(totalLines - 1, Math.floor(scaledProgress));
  const localProgress =
    activeIndex === 0 && scaledProgress === 0
      ? 1
      : scaledProgress - activeIndex;

  return {
    ...storyLines[activeIndex],
    localProgress,
  };
}

export function PositioningStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;

    const updateProgress = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollableDistance = Math.max(1, rect.height - window.innerHeight);
      const rawProgress = -rect.top / scrollableDistance;
      const progress = Math.max(0, Math.min(0.999, rawProgress));

      setScrollProgress(progress);
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  const activeStory = getActiveStory(scrollProgress);

  return (
    <section
      ref={sectionRef}
      aria-label="KaizenAI positioning"
      className="relative bg-black"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 hidden h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#C49A30]/12 blur-[120px] md:block"
      />
      <div className="h-[360svh] md:h-[400vh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <StoryFrame
              final={activeStory.final}
              localProgress={activeStory.localProgress}
            >
              {activeStory.content}
            </StoryFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
