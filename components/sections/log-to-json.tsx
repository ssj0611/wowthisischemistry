"use client";

import { motion, useReducedMotion } from "motion/react";

const REDACT = "▮▮▮▮▮▮";

/** One highlighted log line per extracted field, surrounded by noise lines. */
const LOG_LINES: { text: string; field?: string }[] = [
  { text: "* xtb version · GFN2-xTB" },
  { text: "geometry optimization cycle ..." },
  { text: `:: GEOMETRY OPTIMIZATION CONVERGED ::`, field: "converged" },
  { text: "SCC iterations ..." },
  { text: `:: TOTAL ENERGY  ${REDACT} Eh ::`, field: "total_energy" },
  { text: "Mulliken/CM5 charges ..." },
  { text: `q(max) ${REDACT}   q(min) ${REDACT}`, field: "partial_charge" },
  { text: "orbital energies ..." },
  { text: `molecular dipole  ${REDACT} Debye`, field: "dipole_moment" },
  { text: "wall time ..." },
  { text: `output saved → runs/…/xtb.log`, field: "raw_log_path" },
];

const JSON_FIELDS: { key: string; value: string; from: string }[] = [
  { key: "total_energy", value: "number (hartree)", from: "total_energy" },
  { key: "max_positive_charge", value: "number (e)", from: "partial_charge" },
  { key: "max_negative_charge", value: "number (e)", from: "partial_charge" },
  { key: "dipole_moment", value: "number (Debye)", from: "dipole_moment" },
  { key: "geometry_converged", value: "boolean", from: "converged" },
  { key: "raw_log_path", value: "path (string)", from: "raw_log_path" },
];

const GRID_BG = {
  backgroundImage:
    "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
} as const;

export default function LogToJson() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, x: -24 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.45, delay },
        };

  return (
    <section id="evidence-log" className="pt-4 pb-12">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <p className="font-mono text-xs tracking-[0.3em] text-accent">로그 → JSON</p>
        <h2
          className="mt-2 text-3xl font-semibold text-foreground md:text-4xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          원시 로그에서 Evidence JSON으로
        </h2>
        <p className="mt-3 max-w-2xl break-keep font-mono text-sm leading-relaxed text-muted-foreground">
          긴 비정형 xTB 로그에서 파서가 필요한 필드만 추출해 엄격한 JSON으로 구조화한다. 로그
          원문은 LLM에 넣지 않는다.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Left: stylized raw log (구조 예시, values redacted) */}
          <div className="relative overflow-hidden rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-mono text-xs text-muted-foreground">xtb.log — raw output</span>
              <span className="font-mono text-[10px] text-muted-foreground">구조 예시 · 값 비공개</span>
            </div>
            <div className="overflow-x-auto whitespace-pre p-4 font-mono text-xs leading-6">
              {LOG_LINES.map((line, i) => (
                <div
                  key={i}
                  className={
                    line.field
                      ? "-mx-1 rounded bg-data/10 px-1 text-data"
                      : "text-muted-foreground opacity-60"
                  }
                >
                  {line.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: strict JSON card */}
          <div className="relative rounded-xl border border-data bg-card" style={GRID_BG}>
            <div className="flex items-center justify-between border-b border-border px-4 py-2">
              <span className="font-mono text-xs text-data">candidate_results.json — SSOT</span>
              <span className="font-mono text-[10px] text-muted-foreground">값 = 타입/상태 표기</span>
            </div>
            <div className="p-4 font-mono text-xs leading-7">
              <div className="text-muted-foreground">{"{"}</div>
              {JSON_FIELDS.map((f, i) => (
                <motion.div key={f.key} className="pl-4" {...reveal(i * 0.12)}>
                  <span className="text-data">&quot;{f.key}&quot;</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-foreground">&quot;{f.value}&quot;</span>
                  {i < JSON_FIELDS.length - 1 && <span className="text-muted-foreground">,</span>}
                </motion.div>
              ))}
              <div className="text-muted-foreground">{"}"}</div>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl break-keep font-mono text-sm leading-relaxed text-muted-foreground">
          이렇게 만든 단일 근거 구조(SSOT)가 누락과 단위 혼동을 줄인다. 에이전트·보고서·웹은 이 JSON만
          읽으며, LLM 서술이 수치와 충돌하면 JSON이 이긴다.
        </p>
      </div>
    </section>
  );
}
