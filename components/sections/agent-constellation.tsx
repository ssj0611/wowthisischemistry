"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { GridPanel, SectionHeading } from "./_shared";

type Role = {
  id: string;
  name: string;
  short: string;
  perspective: string;
  reads: string[];
  gate: boolean;
};

// docs/03-multi-agents.md 의 9개 역할. 모두 동일한 Evidence JSON을 관점만 달리해 읽는다.
const ROLES: Role[] = [
  {
    id: "orchestrator",
    name: "총괄",
    short: "Orchestrator",
    perspective: "전체 계산·평가 흐름을 조율하고 각 에이전트 결과를 모은다.",
    reads: ["candidate_id", "role", "is_control"],
    gate: false,
  },
  {
    id: "hypothesis",
    name: "가설 정리",
    short: "Hypothesis",
    perspective: "실험 목적을 검증 가능한 가설로 정리한다.",
    reads: ["role", "charge"],
    gate: false,
  },
  {
    id: "candidate",
    name: "후보 물질",
    short: "Candidate",
    perspective: "후보의 역할과 실험 적합성을 살핀다.",
    reads: ["candidate_id", "role", "charge"],
    gate: false,
  },
  {
    id: "electrostatic",
    name: "정전기 상호작용",
    short: "Electrostatic",
    perspective:
      "부분전하·쌍극자를 근거로 정전기 상호작용 가능성을 본다. 이 사례에서는 가중치가 최대다.",
    reads: ["max_positive_charge", "max_negative_charge", "dipole_moment"],
    gate: false,
  },
  {
    id: "noncovalent",
    name: "비공유 상호작용",
    short: "Non-covalent",
    perspective: "분산력 등 약한 비공유 상호작용 경향을 살핀다.",
    reads: ["dipole_moment", "total_energy"],
    gate: false,
  },
  {
    id: "stability",
    name: "구조 안정성",
    short: "Stability",
    perspective: "구조 수렴 여부와 상대 안정성을 판정한다.",
    reads: ["geometry_converged", "total_energy"],
    gate: true,
  },
  {
    id: "safety",
    name: "안전성",
    short: "Safety",
    perspective:
      "실험 전 1차 안전성을 검토한다. 실제 실험에는 SDS·교사/전문가 검토가 필요하다.",
    reads: ["role", "charge"],
    gate: true,
  },
  {
    id: "variables",
    name: "변인 통제",
    short: "Variables",
    perspective: "독립·종속·통제 변인을 정리한다.",
    reads: ["is_control", "role"],
    gate: false,
  },
  {
    id: "critic",
    name: "비판 검토",
    short: "Critic",
    perspective: "근거 부족·과잉 해석·방법론적 한계를 지적한다.",
    reads: ["geometry_converged", "raw_log_path"],
    gate: true,
  },
];

// 결정론적 각도(-90°에서 시계방향). Math.random 사용 금지.
const positions = ROLES.map((_, i) => {
  const angle = (-90 + (360 / ROLES.length) * i) * (Math.PI / 180);
  return { x: Math.cos(angle), y: Math.sin(angle) };
});

const RADIUS = 168;

export default function AgentConstellation() {
  const [active, setActive] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  const activeRole = ROLES.find((r) => r.id === active) ?? null;

  return (
    <GridPanel id="agents">
      <SectionHeading
        eyebrow="Agent Constellation"
        title="9개 에이전트가 하나의 Evidence JSON을 함께 읽는다"
      >
        모든 에이전트는 <span className="text-data">같은 xTB 결과 JSON</span>을 입력으로 받고,
        관점만 다르게 해석합니다. 규칙 기반 Python으로 동작하므로 API 키 없이도 평가가 완결됩니다.
        역할을 누르면 어떤 필드를 어떤 시선으로 보는지 볼 수 있어요.
      </SectionHeading>

      {/* 데스크톱: 방사형 배치 */}
      <div
        ref={ref}
        className="relative mx-auto hidden md:block"
        style={{ width: 520, height: 460 }}
      >
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 520 460"
          aria-hidden
        >
          {positions.map((p, i) => (
            <motion.line
              key={ROLES[i].id}
              x1={260}
              y1={230}
              x2={260 + p.x * RADIUS}
              y2={230 + p.y * RADIUS}
              stroke={
                ROLES[i].gate ? "var(--exclude)" : "var(--review)"
              }
              strokeWidth={active === ROLES[i].id ? 2 : 1}
              strokeDasharray={ROLES[i].gate ? "4 4" : "0"}
              strokeOpacity={active === ROLES[i].id ? 0.9 : 0.35}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
            />
          ))}
        </svg>

        {/* 중앙 Evidence JSON 노드 + 느린 호흡 펄스 */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={
            inView && !reduce
              ? { scale: [1, 1.06, 1] }
              : { scale: 1 }
          }
          transition={
            inView && !reduce
              ? { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3 }
          }
        >
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl border border-data/60 bg-data/10 text-center">
            <span className="font-mono text-xs text-data">Evidence</span>
            <span className="font-mono text-sm text-foreground">JSON</span>
            <span className="mt-1 font-mono text-[10px] text-muted-foreground">
              single source
            </span>
          </div>
        </motion.div>

        {/* 역할 노드: 순차 활성화 */}
        <motion.div
          className="absolute inset-0"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {positions.map((p, i) => {
            const r = ROLES[i];
            const isActive = active === r.id;
            return (
              <motion.button
                key={r.id}
                type="button"
                variants={{
                  hidden: { opacity: 0, scale: 0.6 },
                  show: { opacity: 1, scale: 1 },
                }}
                onClick={() => setActive(isActive ? null : r.id)}
                aria-pressed={isActive}
                className={`absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-xl border px-2 py-2 text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isActive
                    ? "border-review bg-review/20"
                    : "border-border bg-background/80 hover:border-review/60"
                }`}
                style={{
                  left: 260 + p.x * RADIUS,
                  top: 230 + p.y * RADIUS,
                  width: 104,
                }}
              >
                <span className="text-xs text-foreground">{r.name}</span>
                <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                  {r.short}
                </span>
                {r.gate ? (
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-exclude/50 bg-exclude/10 px-1.5 text-[9px] font-mono uppercase text-exclude">
                    <svg
                      viewBox="0 0 12 12"
                      className="h-2.5 w-2.5"
                      aria-hidden
                      fill="none"
                    >
                      <path
                        d="M3 6h6M6 3v6"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        transform="rotate(45 6 6)"
                      />
                    </svg>
                    gate
                  </span>
                ) : null}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* 모바일: 리스트/그리드 배치 */}
      <div className="grid grid-cols-2 gap-2 md:hidden">
        <div className="col-span-2 mb-1 flex flex-col items-center rounded-xl border border-data/60 bg-data/10 px-4 py-3 text-center">
          <span className="font-mono text-xs text-data">Evidence JSON</span>
          <span className="font-mono text-[10px] text-muted-foreground">
            9개 에이전트 공통 입력 · single source
          </span>
        </div>
        {ROLES.map((r) => {
          const isActive = active === r.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(isActive ? null : r.id)}
              aria-pressed={isActive}
              className={`flex flex-col items-start rounded-xl border px-3 py-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "border-review bg-review/20"
                  : "border-border bg-background/70"
              }`}
            >
              <span className="text-sm text-foreground">{r.name}</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {r.short}
              </span>
              {r.gate ? (
                <span className="mt-1 rounded-full border border-exclude/50 bg-exclude/10 px-1.5 text-[9px] font-mono uppercase text-exclude">
                  gate
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* 상세 패널 */}
      <AnimatePresence mode="wait">
        {activeRole ? (
          <motion.div
            key={activeRole.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="mt-8 rounded-2xl border border-review/50 bg-review/5 p-5 md:p-6"
          >
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg text-foreground">{activeRole.name}</h3>
              <span className="font-mono text-xs text-muted-foreground">
                {activeRole.short}
              </span>
              {activeRole.gate ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-exclude/50 bg-exclude/10 px-2 py-0.5 text-[10px] font-mono uppercase text-exclude">
                  Safety Gate 연결
                </span>
              ) : null}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
              {activeRole.perspective}
            </p>
            <div className="mt-4">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                주로 참조하는 Evidence 필드 (예시)
              </p>
              <div className="flex flex-wrap gap-2">
                {activeRole.reads.map((f) => (
                  <code
                    key={f}
                    className="rounded-md border border-data/40 bg-data/5 px-2 py-0.5 font-mono text-xs text-data"
                  >
                    {f}
                  </code>
                ))}
              </div>
            </div>
            {activeRole.gate ? (
              <p className="mt-4 text-xs text-exclude/90">
                이 역할이 <code className="font-mono">exclude</code>를 내면 점수와 무관하게 최종
                추천에서 제외됩니다.
              </p>
            ) : null}
          </motion.div>
        ) : (
          <p className="mt-8 text-center text-xs text-muted-foreground">
            역할 노드를 선택하면 관점과 참조 필드가 여기에 표시됩니다.
          </p>
        )}
      </AnimatePresence>
    </GridPanel>
  );
}
