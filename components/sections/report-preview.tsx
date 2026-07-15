"use client";

import { motion } from "motion/react";
import { GridPanel, SectionHeading, StatusBadge } from "./_shared";

// Evidence 표에 들어가는 필드 이름 (docs/02). 실제 수치는 파서 JSON에서 채운다 — 여기서는 지어내지 않는다.
const FIELDS = [
  "total_energy",
  "max_positive_charge",
  "dipole_moment",
  "geometry_converged",
];

const ROWS: { name: string; status?: "include" }[] = [
  { name: "키토산 코팅", status: "include" },
  { name: "4차 암모늄 유도체", status: "include" },
  { name: "중성 셀룰로오스 (대조군)" },
];

export default function ReportPreview() {
  return (
    <GridPanel id="report">
      <SectionHeading
        eyebrow="Experiment Report"
        title="평가 결과가 실험 설계 보고서로 정리된다"
      >
        <code className="font-mono">generate_experiment_report</code>는 규칙 평가 결과를 그대로
        읽어 보고서 골격을 만듭니다. 수치·순위·제외 판단은 모두 xTB→파서 JSON에서 오고, Gemini는
        문장 서술만 다듬습니다.
      </SectionHeading>

      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
        className="mx-auto max-w-3xl rounded-2xl border border-border bg-background/70 p-6 md:p-8"
      >
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              report.md
            </p>
            <h3 className="mt-1 text-lg text-foreground">
              풍화 미세플라스틱 필터 활성층 초기 선별
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-md border border-data/40 bg-data/5 px-2 py-1 font-mono text-[10px] text-data">
              source: evidence.json
            </span>
            <span className="font-mono text-[10px] text-caution">
              예시 골격 · 실제 값 아님
            </span>
          </div>
        </div>

        <section className="mt-5">
          <h4 className="font-mono text-xs uppercase tracking-wide text-accent">
            1 · 가설
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-foreground/85">
            풍화된 미세플라스틱 표면이 조건에 따라 음전하·극성을 띨 수 있다는 가정 아래, 양전하
            필터 활성층의 정전기 상호작용 가능성을 대리 구조로 비교한다.
          </p>
        </section>

        <section className="mt-5">
          <h4 className="font-mono text-xs uppercase tracking-wide text-accent">
            2 · 근거 표 (Evidence)
          </h4>
          <div className="mt-2 overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="text-muted-foreground">
                  <th scope="col" className="border-b border-border py-2 pr-3 font-normal">
                    candidate
                  </th>
                  {FIELDS.map((f) => (
                    <th
                      key={f}
                      scope="col"
                      className="border-b border-border px-3 py-2 font-mono font-normal text-data"
                    >
                      {f}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.name} className="align-top">
                    <td className="border-b border-border py-2 pr-3 text-foreground">
                      {r.name}
                    </td>
                    <td className="border-b border-border px-3 py-2 text-muted-foreground">
                      <span className="font-mono">·값</span>
                    </td>
                    <td className="border-b border-border px-3 py-2 text-muted-foreground">
                      <span className="font-mono">·값</span>
                    </td>
                    <td className="border-b border-border px-3 py-2 text-muted-foreground">
                      <span className="font-mono">·값</span>
                    </td>
                    <td className="border-b border-border px-3 py-2 text-muted-foreground">
                      <span className="font-mono">·값</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            수치 셀(<span className="font-mono">·값</span>)은 파서가 만든 JSON에서 채워집니다.
            보고서·UI는 이 값을 지어내지 않습니다.
          </p>
        </section>

        <section className="mt-5">
          <h4 className="font-mono text-xs uppercase tracking-wide text-accent">
            3 · 평가 상태
          </h4>
          <ul className="mt-2 flex flex-col gap-2">
            {ROWS.map((r) => (
              <li
                key={r.name}
                className="flex items-center justify-between rounded-lg border border-border bg-card/60 px-3 py-2"
              >
                <span className="text-sm text-foreground">{r.name}</span>
                {r.status ? (
                  <StatusBadge status={r.status} />
                ) : (
                  <span className="inline-flex items-center rounded-full border border-border bg-background/60 px-2.5 py-0.5 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                    control · 비교 기준
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5 rounded-lg border border-review/40 bg-review/5 p-3">
          <div className="flex items-center gap-2">
            <span className="rounded border border-review/50 px-1.5 py-0.5 font-mono text-[9px] uppercase text-review">
              optional
            </span>
            <h4 className="font-mono text-xs uppercase tracking-wide text-review">
              Gemini 서술 보강
            </h4>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-foreground/80">
            API 키가 있으면 위 표와 상태를 바탕으로 문장 흐름만 다듬습니다. 수치·순위·제외 판단은
            바꾸지 않습니다. 키가 없으면 규칙 기반 기본 서술로 보고서가 완성됩니다.
          </p>
        </section>
      </motion.article>
    </GridPanel>
  );
}
