import type { ReactNode } from "react";

type Status = "include" | "caution" | "exclude";

const STATUS_META: Record<
  Status,
  { label: string; color: string; ring: string; icon: ReactNode }
> = {
  include: {
    label: "채택 후보",
    color: "text-include",
    ring: "border-include/50 bg-include/10",
    icon: (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden fill="none">
        <path
          d="M3 8.5l3 3 7-7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  caution: {
    label: "주의",
    color: "text-caution",
    ring: "border-caution/50 bg-caution/10",
    icon: (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden fill="none">
        <path
          d="M8 2L15 14H1L8 2z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M8 6.5v3M8 11.5v.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  exclude: {
    label: "제외",
    color: "text-exclude",
    ring: "border-exclude/50 bg-exclude/10",
    icon: (
      <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" aria-hidden fill="none">
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M4.5 4.5l7 7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
};

// 색만으로 상태를 표현하지 않도록 아이콘+라벨을 항상 함께 노출한다.
export function StatusBadge({
  status,
  className = "",
}: {
  status: Status;
  className?: string;
}) {
  const m = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-mono uppercase tracking-wide ${m.color} ${m.ring} ${className}`}
    >
      {m.icon}
      <span>{status}</span>
      <span className="text-foreground/70">· {m.label}</span>
    </span>
  );
}

export type { Status };

export function CornerMarks() {
  const pos = [
    "top-6 left-6",
    "top-6 right-6",
    "bottom-6 left-6",
    "bottom-6 right-6",
  ];
  return (
    <>
      {pos.map((p) => (
        <div
          key={p}
          aria-hidden
          className={`pointer-events-none absolute ${p} text-foreground opacity-40 text-4xl font-sans font-extralight leading-[0]`}
        >
          +
        </div>
      ))}
    </>
  );
}

// 프로젝트 공통 그래프-용지 그리드 패널.
export function GridPanel({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 rounded-4xl border border-solid border-border bg-card px-6 py-10 md:px-12 md:py-12 ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(var(--border) 1px, transparent 1px),
          linear-gradient(90deg, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <CornerMarks />
      <div className="relative">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14 max-w-3xl">
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
      <h2
        className="text-3xl md:text-4xl font-semibold text-foreground leading-tight"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {title}
      </h2>
      {children ? (
        <div className="mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
          {children}
        </div>
      ) : null}
    </div>
  );
}

// 대리 구조 초기 선별임을 알리는 고정 안내 배너 (사례/보고서에서 재사용).
export function ProxyNotice({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-2xl border border-data/40 bg-data/5 px-4 py-3 text-xs md:text-sm text-foreground/80 ${className}`}
    >
      <svg
        viewBox="0 0 20 20"
        className="mt-0.5 w-4 h-4 shrink-0 text-data"
        aria-hidden
        fill="none"
      >
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M10 9v5M10 6v.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <p>
        이 결과는 <strong className="text-data">실제 여과 효율 순위가 아니라</strong>{" "}
        분자 수준 대리 구조(proxy)를 근거로 한 <strong>초기 선별</strong> 지표입니다.
        실측은 입자 크기·표면 거칠기·pH·용매·필터 제작 방식 등에 좌우됩니다.
      </p>
    </div>
  );
}
