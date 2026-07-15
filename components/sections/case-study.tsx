"use client";

import { motion } from "motion/react";
import { GridPanel, ProxyNotice, SectionHeading, StatusBadge } from "./_shared";

type Candidate = {
  name: string;
  role: string;
  rank?: "1순위" | "차순위";
};

// docs/04-case-microplastics.md — 필터 활성층 후보 (추천 대상).
const CANDIDATES: Candidate[] = [
  { name: "키토산 코팅", role: "양이온성 활성층", rank: "1순위" },
  { name: "4차 암모늄 유도체", role: "양이온성 활성층", rank: "차순위" },
  { name: "폴리도파민 유사 코팅", role: "부착·극성 활성층", rank: "차순위" },
  { name: "PEI 코팅", role: "양이온성 활성층" },
  { name: "양이온 전분", role: "양이온성 활성층" },
];

// 대조군 (비교 기준, 최종 추천 집합에서 제외).
const CONTROLS: Candidate[] = [
  { name: "중성 셀룰로오스", role: "중성 기준 구조" },
  { name: "방향족 활성탄 대리 구조", role: "소수성/방향족 기준" },
];

const card = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function CaseStudy() {
  return (
    <GridPanel id="case-study">
      <SectionHeading
        eyebrow="Case Study"
        title="풍화 미세플라스틱 제거 필터 활성층 선별"
      >
        풍화된 미세플라스틱 표면은{" "}
        <span className="text-foreground">조건에 따라 음전하 또는 극성을 띨 수 있다는 가설</span>에서
        출발합니다. 그렇다면 정전기적으로 상호작용할 수 있는 양전하 필터 활성층이 제거 가능성을
        높일 수 있습니다. 시스템은 대리 구조끼리 비교해 어떤 활성층부터 살펴볼지 초기 선별합니다.
      </SectionHeading>

      <ProxyNotice className="mb-10" />

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* 후보 그룹 */}
        <div className="rounded-2xl border border-include/40 bg-include/[0.04] p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-include" aria-hidden />
            <h3 className="text-sm font-semibold text-foreground">
              필터 활성층 후보 <span className="text-muted-foreground">· 추천 대상</span>
            </h3>
          </div>
          <motion.ul
            className="flex flex-col gap-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {CANDIDATES.map((c) => {
              const top = c.rank === "1순위";
              return (
                <motion.li
                  key={c.name}
                  variants={card}
                  transition={{ duration: 0.35 }}
                  className={`flex items-center justify-between gap-3 rounded-xl border p-4 ${
                    top
                      ? "border-include/70 bg-include/10"
                      : "border-border bg-background/50"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-foreground">{c.name}</span>
                      {c.rank ? (
                        <span
                          className={`rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase ${
                            top
                              ? "border-include bg-include/20 text-include"
                              : "border-accent/50 bg-accent/10 text-accent"
                          }`}
                        >
                          {c.rank}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{c.role}</p>
                  </div>
                  {c.rank ? (
                    <StatusBadge status="include" />
                  ) : (
                    <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-2.5 py-0.5 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                      평가 대상
                    </span>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* 대조군 그룹 */}
        <div className="rounded-2xl border border-dashed border-border bg-background/40 p-5 md:p-6">
          <div className="mb-4 flex items-center gap-2">
            <svg viewBox="0 0 12 12" className="h-3 w-3 text-muted-foreground" aria-hidden>
              <rect x="1" y="1" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeDasharray="2 2" />
            </svg>
            <h3 className="text-sm font-semibold text-foreground">
              대조군 <span className="text-muted-foreground">· 비교 기준</span>
            </h3>
          </div>
          <ul className="flex flex-col gap-3">
            {CONTROLS.map((c) => (
              <li
                key={c.name}
                className="rounded-xl border border-border bg-background/50 p-4"
              >
                <span className="text-foreground">{c.name}</span>
                <p className="mt-0.5 text-xs text-muted-foreground">{c.role}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                  control · 추천 집합 제외
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            대조군은 추천 후보가 아니라, 후보들이 정말 의미 있는 차이를 보이는지 판단하기 위한
            비교 기준으로 유지됩니다.
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-background/60 p-5 md:p-6">
        <h3 className="text-sm font-semibold text-foreground">초기 선별 결과 (소감문 기준)</h3>
        <div className="mt-3 flex flex-col gap-2 text-sm text-foreground/85 md:flex-row md:items-center md:gap-6">
          <p>
            <span className="text-include">1순위</span> 키토산 코팅 조합
          </p>
          <p className="hidden text-border md:block">/</p>
          <p>
            <span className="text-accent">차순위</span> 4차 암모늄 유도체 · 폴리도파민 유사 코팅
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          정전기 상호작용 항목의 가중치가 최대인 실험 목적에 맞춰 정렬된 결과이며, 실제 여과 효율
          순위가 아닙니다.
        </p>
      </div>
    </GridPanel>
  );
}
