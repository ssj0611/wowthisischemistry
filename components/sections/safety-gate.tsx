"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { GridPanel, SectionHeading, StatusBadge, type Status } from "./_shared";

// 하드 제외 규칙에 해당하는 3개 게이트 역할 (docs/03-multi-agents.md).
const GATE_ROLES = [
  { id: "stability", name: "구조 안정성", short: "안정성" },
  { id: "safety", name: "안전성", short: "안전" },
  { id: "critic", name: "비판 검토", short: "비판" },
] as const;

const CYCLE: Status[] = ["include", "caution", "exclude"];

export default function SafetyGate() {
  const [states, setStates] = useState<Record<string, Status>>({
    stability: "include",
    safety: "include",
    critic: "caution",
  });

  const excluded = GATE_ROLES.some((r) => states[r.id] === "exclude");

  const cycle = (id: string) =>
    setStates((s) => ({
      ...s,
      [id]: CYCLE[(CYCLE.indexOf(s[id]) + 1) % CYCLE.length],
    }));

  return (
    <GridPanel id="safety-gate">
      <SectionHeading eyebrow="안전 게이트" title="하드 제외 규칙: 하나라도 exclude면 탈락">
        구조 안정성 · 안전성 · 비판 검토(Critic) 세 역할은 <span className="text-exclude">거부권</span>을
        가집니다. 이 중 하나라도 <code className="font-mono">exclude</code>이면 다른 점수가 아무리 높아도
        최종 추천에서 제외됩니다. 아래 상태 칩을 눌러 규칙이 어떻게 작동하는지 확인해 보세요.
      </SectionHeading>

      <div className="grid gap-6 md:grid-cols-3">
        {GATE_ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => cycle(r.id)}
            className="group flex flex-col items-start gap-3 rounded-2xl border border-border bg-background/60 p-5 text-left transition-colors hover:border-review/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex w-full items-center justify-between">
              <div>
                <p className="text-sm text-foreground">{r.name}</p>
                <p className="font-mono text-[10px] text-muted-foreground">
                  {r.short}
                </p>
              </div>
              <span className="rounded-full border border-exclude/50 bg-exclude/10 px-2 py-0.5 text-[9px] font-mono uppercase text-exclude">
                게이트
              </span>
            </div>
            <StatusBadge status={states[r.id]} />
            <span className="font-mono text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              클릭하여 상태 변경
            </span>
          </button>
        ))}
      </div>

      {/* 게이트 결과 */}
      <div className="mt-8 flex flex-col items-center" aria-live="polite">
        <svg
          viewBox="0 0 24 40"
          className="h-8 w-6 text-border"
          aria-hidden
          fill="none"
        >
          <path
            d="M12 0v34m0 0l-6-6m6 6l6-6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <AnimatePresence mode="wait">
          <motion.div
            key={excluded ? "out" : "pass"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={`flex w-full max-w-md items-center gap-4 rounded-2xl border p-5 ${
              excluded
                ? "border-exclude/60 bg-exclude/10"
                : "border-include/60 bg-include/10"
            }`}
            style={{
              // 색맹 접근성: 상태에 따라 대각선 패턴을 함께 부여.
              backgroundImage: excluded
                ? "repeating-linear-gradient(45deg, color-mix(in oklch, var(--exclude) 12%, transparent) 0 6px, transparent 6px 12px)"
                : "none",
            }}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
                excluded
                  ? "border-exclude text-exclude"
                  : "border-include text-include"
              }`}
            >
              {excluded ? (
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8 8l8 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <div>
              <p
                className={`text-lg font-semibold ${
                  excluded ? "text-exclude" : "text-include"
                }`}
              >
                {excluded ? "최종 추천 제외 (탈락)" : "게이트 통과"}
              </p>
              <p className="mt-1 text-xs text-foreground/80">
                {excluded
                  ? "게이트 역할 중 exclude가 있어 후보 집합에서 빠집니다. 점수로 되돌릴 수 없습니다."
                  : "게이트 3개 모두 exclude가 아니므로 후속 순위 평가로 넘어갑니다."}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        ※ 안전성 에이전트의 판정은 <span className="text-caution">1차 검토</span>일 뿐입니다. 실제
        실험 전에는 물질안전보건자료(SDS)와 교사·전문가 검토가 반드시 필요합니다.
      </p>
    </GridPanel>
  );
}
