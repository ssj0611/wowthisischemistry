"use client";

import { motion, useReducedMotion } from "motion/react";

const FIELDS = [
  {
    label: "Total Energy",
    key: "total_energy",
    proxy: "분자의 총 에너지. 같은 조성의 구조들 사이에서 상대 안정성을 비교하는 근거로 쓴다.",
    limit: "한계: 조성이 다른 분자 간에는 단순 비교할 수 없다.",
  },
  {
    label: "Partial Charge Extremes",
    key: "max_positive_charge · max_negative_charge",
    proxy:
      "원자별 부분전하의 극값(가장 양수·가장 음수). 정전기 상호작용 가능성의 대리 지표로 쓴다.",
    limit: "한계: 분자 순전하가 아니며, 실제 결합력을 뜻하지 않는다.",
  },
  {
    label: "Dipole Moment",
    key: "dipole_moment",
    proxy: "분자 전체의 극성. 극성 표면·용매와의 상호작용 가능성을 가늠하는 대리 지표.",
    limit: "한계: 실제 여과 효율이나 흡착 세기의 예측값이 아니다.",
  },
  {
    label: "Optimization Convergence",
    key: "geometry_converged",
    proxy: "구조 최적화 수렴 여부. 계산 결과 전체를 신뢰할 수 있는지 판단하는 관문.",
    limit: "한계: 수렴 실패 시 다른 모든 수치는 근거로 쓰지 않는다.",
  },
  {
    label: "Raw Log Traceability",
    key: "raw_log_path",
    proxy: "원시 로그 보관 경로. 모든 수치를 원본 계산까지 거슬러 감사·재현할 수 있게 한다.",
    limit: "한계: 경로 기록일 뿐, 로그 원문을 LLM 해석에 쓰지 않는다.",
  },
];

export default function EvidenceSchema() {
  const reduced = useReducedMotion();

  return (
    <section id="evidence" className="py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <p className="font-mono text-xs tracking-[0.3em] text-accent">EVIDENCE SCHEMA</p>
        <h2
          className="mt-2 text-3xl font-semibold text-foreground md:text-4xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          What the JSON Actually Holds
        </h2>
        <p className="mt-3 max-w-2xl break-keep font-mono text-sm leading-relaxed text-muted-foreground">
          평가의 중심이 되는 다섯 필드. 각각은 실측이 아니라 초기 선별을 위한 대리 지표이며, 그 한계를
          함께 명시한다.
        </p>

        <motion.ul
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          initial={reduced ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        >
          {FIELDS.map((f) => (
            <motion.li
              key={f.key}
              variants={
                reduced
                  ? undefined
                  : {
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                    }
              }
              whileHover={reduced ? undefined : { y: -4 }}
              className="group rounded-xl border border-border bg-card p-5 transition-colors hover:border-data"
            >
              <h3
                className="text-base font-semibold text-foreground"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {f.label}
              </h3>
              <p className="mt-1 font-mono text-xs text-data">{f.key}</p>
              <p className="mt-3 break-keep font-mono text-sm leading-relaxed text-muted-foreground">
                {f.proxy}
              </p>
              <p className="mt-2 break-keep font-mono text-xs leading-relaxed text-caution">
                {f.limit}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
