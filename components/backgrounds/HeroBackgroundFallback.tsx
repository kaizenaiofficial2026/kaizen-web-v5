export function HeroBackgroundFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute inset-0 h-full w-full " + (className ?? "")
      }
      style={{
        backgroundImage: [
          "radial-gradient(80% 60% at 50% 0%, rgba(201,160,61,0.35) 0%, rgba(201,160,61,0) 60%)",
          "radial-gradient(60% 50% at 30% 60%, rgba(141,111,36,0.22) 0%, rgba(141,111,36,0) 65%)",
          "radial-gradient(70% 60% at 80% 80%, rgba(236,212,121,0.18) 0%, rgba(236,212,121,0) 65%)",
          "linear-gradient(180deg, rgba(10,9,7,0.2) 0%, rgba(10,9,7,0.85) 100%)",
        ].join(", "),
      }}
    />
  );
}
