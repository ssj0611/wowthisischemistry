"use client";

import { Fragment, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";

type Tone = "data" | "review" | "include";

const TONE: Record<Tone, { text: string; border: string; bg: string; glow: string }> = {
  data: {
    text: "text-data",
    border: "border-data",
    bg: "bg-data",
    glow: "shadow-[0_0_28px_-8px_var(--data)]",
  },
  review: {
    text: "text-review",
    border: "border-review",
    bg: "bg-review",
    glow: "shadow-[0_0_28px_-8px_var(--review)]",
  },
  include: {
    text: "text-include",
    border: "border-include",
    bg: "bg-include",
    glow: "shadow-[0_0_28px_-8px_var(--include)]",
  },
};

type Stage = {
  id: string;
  en: string;
  role: string;
  desc: string;
  chips: string[];
  tone: Tone;
};

const STAGES: Stage[] = [
  {
    id: "input",
    en: ".xyz 입력",
    role: "사전 준비된 3D 좌표 입력",
    desc: "후보 물질의 3D 좌표(.xyz)와 메타 정보(역할·전하·대조군 여부)를 입력한다. SMILES 자동 변환 없이 사전에 준비된 구조만 사용한다.",
    chips: [".xyz", "역할 · 전하", "대조군 여부"],
    tone: "data",
  },
  {
    id: "xtb",
    en: "xTB / GFN2-xTB",
    role: "구조 최적화 포함 계산 실행",
    desc: "GFN2-xTB로 구조 최적화를 포함한 계산을 실행하고, 원시 로그와 그 보관 경로를 기록한다. 이 단계는 계산만 하며 추천 판단은 하지 않는다.",
    chips: ["GFN2-xTB", "구조 최적화", "원시 로그"],
    tone: "data",
  },
  {
    id: "parser",
    en: "로그 파서",
    role: "원시 로그에서 필요 수치만 추출",
    desc: "비정형 로그에서 총 에너지, 원자별 부분전하의 극값, 쌍극자 모멘트, 수렴 여부만 추출해 구조화한다. 자연어 해석은 하지 않는다.",
    chips: ["원시 로그 입력", "필드 추출", "JSON 출력"],
    tone: "data",
  },
  {
    id: "json",
    en: "Evidence JSON",
    role: "모든 수치의 단일 근거 소스 (SSOT)",
    desc: "에이전트·보고서·UI가 읽는 모든 계산값의 단일 출처. LLM 응답이 이 JSON의 수치와 충돌하면 JSON이 이긴다.",
    chips: [
      "total_energy",
      "max_positive_charge · max_negative_charge",
      "dipole_moment",
      "geometry_converged",
    ],
    tone: "data",
  },
  {
    id: "review",
    en: "다중 계층 검토",
    role: "규칙 기반 멀티에이전트 검토",
    desc: "동일한 JSON을 역할별 에이전트와 Critic이 규칙 기반으로 평가한다. JSON에 없는 수치는 발명하지 않으며, API 키 없이도 동작한다.",
    chips: ["규칙 기반 에이전트", "비판 검토", "수치 발명 금지"],
    tone: "review",
  },
  {
    id: "report",
    en: "결정 보고서",
    role: "가중치 점수와 제외 규칙으로 결정",
    desc: "가중치 합산과 제외 규칙으로 include / caution / exclude를 결정해 실험 설계 보고서를 만든다. Gemini 등 LLM은 문장 서술 보강에만 선택적으로 쓰인다.",
    chips: ["가중치 점수", "include · caution · exclude", "LLM: 선택적 서술"],
    tone: "include",
  },
];

const GRID_BG = {
  backgroundImage:
    "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
} as const;

function CornerMarks() {
  return (
    <div aria-hidden="true">
      {["top-3 left-4", "top-3 right-4", "bottom-3 left-4", "bottom-3 right-4"].map((pos) => (
        <span
          key={pos}
          className={`absolute ${pos} font-sans text-2xl font-extralight leading-none text-foreground opacity-40`}
        >
          +
        </span>
      ))}
    </div>
  );
}

function Chips({ chips, tone }: { chips: string[]; tone: Tone }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {chips.map((c) => (
        <li
          key={c}
          className={`rounded-full border border-border bg-background/60 px-2 py-0.5 font-mono text-[11px] ${TONE[tone].text}`}
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

/** Connector between node i-1 and node i; drawn once stage i is reached. */
function Connector({ drawn, pulsing, tone }: { drawn: boolean; pulsing: boolean; tone: Tone }) {
  return (
    <div className={`relative h-2 min-w-6 flex-1 self-center ${TONE[tone].text}`} aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <line x1="0" y1="4" x2="100%" y2="4" stroke="var(--border)" strokeWidth="2" />
        <motion.line
          x1="0"
          y1="4"
          x2="100%"
          y2="4"
          stroke="currentColor"
          strokeWidth="2"
          initial={false}
          animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
        {drawn && pulsing && (
          <motion.circle
            cy="4"
            r="3.5"
            fill="currentColor"
            initial={{ cx: "0%", opacity: 0 }}
            animate={{ cx: "100%", opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.15 }}
          />
        )}
      </svg>
    </div>
  );
}

/** Static / mobile ordered pipeline. Semantic <ol>, all descriptions visible. */
function StageList({ animate }: { animate: boolean }) {
  return (
    <ol className="mx-auto max-w-xl list-none px-4">
      {STAGES.map((s, i) => {
        const card = (
          <div className={`rounded-xl border bg-card p-5 ${TONE[s.tone].border}`}>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
              <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 self-center rounded-full ${TONE[s.tone].bg}`} />
              <h3
                className="text-base font-semibold text-foreground"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {s.en}
              </h3>
            </div>
            <p className={`mt-1 font-mono text-xs ${TONE[s.tone].text}`}>{s.role}</p>
            <p className="mt-2 break-keep font-mono text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            <div className="mt-3">
              <Chips chips={s.chips} tone={s.tone} />
            </div>
          </div>
        );
        return (
          <li key={s.id} className="flex flex-col">
            {animate ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
              >
                {card}
              </motion.div>
            ) : (
              card
            )}
            {i < STAGES.length - 1 && (
              <div aria-hidden="true" className={`mx-auto h-8 w-px ${TONE[STAGES[i + 1].tone].bg} opacity-60`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function Architecture() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STAGES.length - 1, Math.floor(v * STAGES.length));
    if (idx !== active) {
      setActive(idx);
      setPicked(null);
    }
  });

  const shown = picked ?? active;
  const stage = STAGES[shown];

  const header = (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6">
      <p className="font-mono text-xs tracking-[0.3em] text-accent">파이프라인</p>
      <h2
        className="mt-2 text-3xl font-semibold text-foreground md:text-4xl"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        계산부터 판단까지, 한 흐름으로
      </h2>
      <p className="mt-3 max-w-2xl break-keep font-mono text-sm leading-relaxed text-muted-foreground">
        .xyz 입력부터 결정 보고서까지, 계산과 해석을 분리한 6단계 파이프라인. 모든 수치는 파서가 만든
        Evidence JSON 하나만을 근거로 흐른다. 계산·평가 단계는 MCP 도구 서버가 감싸 도구로 노출된다.
      </p>
    </div>
  );

  if (reduced) {
    return (
      <section id="pipeline" className="py-6">
        {header}
        <div className="mt-6">
          <StageList animate={false} />
        </div>
      </section>
    );
  }

  return (
    <section id="pipeline" className="py-6">
      {header}

      {/* Text-only sequence for desktop screen readers (interactive version shows one description at a time). */}
      <ol className="sr-only max-md:hidden">
        {STAGES.map((s, i) => (
          <li key={s.id}>
            {i + 1}단계 {s.en} — {s.role}. {s.desc}
          </li>
        ))}
      </ol>

      {/* Desktop: sticky scrollytelling */}
      <div ref={trackRef} className="relative mt-6 hidden h-[150vh] md:block" aria-hidden="false">
        <div className="sticky top-16 flex h-[70vh] flex-col justify-center overflow-hidden px-6">
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="flex items-stretch">
              {STAGES.map((s, i) => (
                <Fragment key={s.id}>
                  {i > 0 && <Connector drawn={active >= i} pulsing={active === i} tone={s.tone} />}
                  <motion.button
                    type="button"
                    onClick={() => setPicked(i)}
                    aria-label={`${i + 1}단계 ${s.en}: ${s.role}`}
                    aria-pressed={shown === i}
                    className={`group relative flex w-[7.5rem] flex-col items-center gap-2 rounded-lg border bg-card px-2 py-3 outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring ${
                      shown === i ? `${TONE[s.tone].border} ${TONE[s.tone].glow}` : "border-border"
                    }`}
                    initial={false}
                    animate={{
                      scale: shown === i ? 1.06 : 1,
                      opacity: i === active ? 1 : i < active ? 0.55 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
                    <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${TONE[s.tone].bg}`} />
                    <span className="break-keep text-center font-mono text-xs leading-tight text-foreground">
                      {s.en}
                    </span>
                    {/* hover / keyboard-focus tooltip */}
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-44 -translate-x-1/2 break-keep rounded-md border border-border bg-background p-2 font-mono text-[11px] leading-snug text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      {s.role}
                    </span>
                  </motion.button>
                </Fragment>
              ))}
            </div>

            <div className="relative mt-5 min-h-36 rounded-xl border border-border bg-card p-5" style={GRID_BG}>
              <CornerMarks />
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={shown}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 pr-10">
                    <span className="font-mono text-xs text-muted-foreground">
                      0{shown + 1} / 0{STAGES.length}
                    </span>
                    <h3
                      className="text-lg font-semibold text-foreground"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {stage.en}
                    </h3>
                    <span className={`font-mono text-xs ${TONE[stage.tone].text}`}>{stage.role}</span>
                  </div>
                  <p className="mt-3 max-w-3xl break-keep font-mono text-sm leading-relaxed text-muted-foreground">
                    {stage.desc}
                  </p>
                  <div className="mt-4">
                    <Chips chips={stage.chips} tone={stage.tone} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="mt-3 text-center font-mono text-[11px] text-muted-foreground">
              스크롤하면 단계가 진행됩니다
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: plain vertical pipeline, no scroll-trapping */}
      <div className="mt-6 md:hidden">
        <StageList animate />
      </div>
    </section>
  );
}
