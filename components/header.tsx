"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  { id: "overview", label: "개요" },
  { id: "pipeline", label: "파이프라인" },
  { id: "evidence", label: "근거" },
  { id: "agents", label: "에이전트" },
  { id: "case-study", label: "사례" },
  { id: "limitations", label: "한계" },
];

export default function Header() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const { id } of LINKS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const linkClass = (id: string) =>
    `font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring ${
      active === id
        ? "text-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <a
          href="#overview"
          className="flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <span
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-extrabold text-primary-foreground"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            W
          </span>
          <span
            className="text-sm font-bold tracking-wide text-foreground md:text-[15px]"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Wowthisischemistry
          </span>
        </a>

        <nav aria-label="주요 섹션" className="hidden items-center gap-6 md:flex">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={linkClass(id)}
            >
              {label}
            </a>
          ))}
          <a
            href="#pipeline"
            className="bg-primary text-primary-foreground rounded-full px-5 py-2 font-mono text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgb(29,237,131,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            계산 흐름 살펴보기
          </a>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground rounded-md p-2 focus-visible:outline-2 focus-visible:outline-ring md:hidden"
        >
          <span className="sr-only">{open ? "메뉴 닫기" : "메뉴 열기"}</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="border-b border-border bg-background/95 backdrop-blur-md md:hidden"
        >
          <nav aria-label="주요 섹션 (모바일)" className="flex flex-col gap-1 px-6 pb-5">
            {LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                aria-current={active === id ? "true" : undefined}
                className={`${linkClass(id)} py-2.5`}
              >
                {label}
              </a>
            ))}
            <a
              href="#pipeline"
              onClick={() => setOpen(false)}
              className="bg-primary text-primary-foreground mt-2 rounded-full px-5 py-2.5 text-center font-mono text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              계산 흐름 살펴보기
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
