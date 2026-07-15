"use client";

import { motion } from "motion/react";
import { GridPanel, SectionHeading } from "./_shared";

type Tool = {
  cmd: string;
  title: string;
  desc: string;
  out: string;
};

// docs/02-pipeline-and-mcp.md 의 6개 MCP 도구를 파이프라인 순서대로.
const TOOLS: Tool[] = [
  {
    cmd: "calculate_candidate",
    title: "단일 후보 계산",
    desc: "하나의 .xyz 3D 구조를 GFN2-xTB로 구조 최적화하고, 로그를 파싱해 구조화된 JSON으로 만든다.",
    out: "candidate.json",
  },
  {
    cmd: "calculate_candidate_batch",
    title: "다수 후보 일괄 계산",
    desc: "여러 후보를 한 번에 계산해 동일 기준으로 비교할 수 있게 정렬한다.",
    out: "batch/*.json",
  },
  {
    cmd: "generate_evidence_table",
    title: "근거 표 생성",
    desc: "후보별 계산 결과(에너지·부분전하·쌍극자·수렴 여부 등)를 하나의 Evidence 표로 모은다.",
    out: "evidence.json",
  },
  {
    cmd: "evaluate_candidates",
    title: "규칙 기반 평가",
    desc: "9개 에이전트가 같은 Evidence JSON을 서로 다른 관점으로 읽고 include / caution / exclude 를 판정한다.",
    out: "evaluation.json",
  },
  {
    cmd: "run_experiment_pipeline",
    title: "엔드투엔드 실행",
    desc: "입력 → 계산 → 평가 → 보고서까지 한 번에 연결하는 오케스트레이션 진입점.",
    out: "pipeline.run()",
  },
  {
    cmd: "generate_experiment_report",
    title: "실험 설계 보고서",
    desc: "평가 결과를 실험 설계 보고서로 정리한다. (선택적으로 LLM이 서술만 다듬는다)",
    out: "report.md",
  },
];

const line = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function McpToolchain() {
  return (
    <GridPanel id="mcp">
      <SectionHeading eyebrow="MCP Toolchain" title="6개의 MCP 도구가 순서대로 동작한다">
        MCP는 “도구 계약”을 지키는 진입점입니다. 각 도구는 정해진 입력을 받아 정해진 결과만
        내보내고, 핵심 판단은 규칙 기반 평가 단계에서 이뤄집니다.
      </SectionHeading>

      <div className="rounded-2xl border border-border bg-background/60 overflow-hidden font-mono">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-exclude/70" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-caution/70" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-include/70" aria-hidden />
          <span className="ml-3 text-xs text-muted-foreground">
            xtb-lab-harness · mcp
          </span>
        </div>

        <motion.ol
          className="divide-y divide-border"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.18 }}
        >
          {TOOLS.map((t, i) => (
            <motion.li
              key={t.cmd}
              variants={line}
              transition={{ duration: 0.4 }}
              className="px-4 py-4 md:px-6"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-4">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-review text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-include">$</span>
                  <code className="text-sm text-foreground">
                    {t.cmd}
                    <span className="text-muted-foreground">()</span>
                  </code>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground">{t.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {t.desc}
                  </p>
                </div>
                <div className="shrink-0 self-start rounded-md border border-data/40 bg-data/5 px-2 py-0.5 text-xs text-data">
                  → {t.out}
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Gemini 등 LLM은 <span className="text-review">선택 의존성</span>입니다. API 키가 없어도
        계산·평가·기본 보고서는 그대로 동작합니다.
      </p>
    </GridPanel>
  );
}
