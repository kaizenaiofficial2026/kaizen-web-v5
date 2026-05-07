export function Grain({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.18] mix-blend-overlay " +
        (className ?? "")
      }
    >
      <filter id="grain-filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  );
}
