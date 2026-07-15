export default function SkipLink() {
  return (
    <a
      href="#overview"
      className="bg-primary text-primary-foreground sr-only rounded-md px-4 py-2 font-mono text-sm font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70]"
    >
      본문으로 건너뛰기
    </a>
  );
}
