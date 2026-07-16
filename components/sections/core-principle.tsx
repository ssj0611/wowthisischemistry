"use client";

import { motion } from "motion/react";

const NAIVE_FLOW = ["질문", "LLM 직접 추천", "근거 확인 어려움"];

const OUR_FLOW = [
  { label: "구조 입력", note: ".xyz" },
  { label: "xTB 계산", note: "GFN2-xTB" },
  { label: "JSON 근거", note: "SSOT" },
  { label: "역할별 검토", note: "규칙 기반 에이전트" },
  { label: "보고서", note: "report" },
];

const step = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

function Arrow() {
  return (
    <span aria-hidden className="text-muted-foreground font-mono text-sm">
      ↓
    </span>
  );
}

export default function CorePrinciple() {
  return (
    <section id="principle" className="scroll-mt-24 py-12 md:py-14">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-14 text-center">
          <p className="text-accent mb-4 font-mono text-xs tracking-[0.25em]">
            핵심 원칙
          </p>
          <h2
            className="text-foreground mx-auto mb-4 max-w-3xl text-4xl font-bold md:text-5xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            먼저 계산하고,
            <br />
            그다음에 해석한다.
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl break-keep font-mono text-sm leading-relaxed">
            추천보다 먼저, 계산 가능한 근거를 만듭니다. 수치와 순위의 출처는
            언제나 xTB 계산 결과이고, LLM은 보고서 문장을 다듬는 선택적 보조일
            뿐입니다.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid gap-5 md:grid-cols-2"
        >
          {/* 일반적인 접근 */}
          <motion.div
            variants={step}
            className="bg-card border-border rounded-xl border p-6 md:p-8"
          >
            <h3 className="mb-1 font-mono text-sm tracking-widest text-exclude">
              일반적인 접근
            </h3>
            <p className="text-muted-foreground mb-6 font-mono text-xs">
              LLM에게 바로 답을 요청
            </p>
            <ol className="flex flex-col items-start gap-2">
              {NAIVE_FLOW.map((label, i) => (
                <motion.li
                  key={label}
                  variants={step}
                  className="flex flex-col items-start gap-2"
                >
                  {i > 0 && <Arrow />}
                  <span
                    className={`rounded-md border px-4 py-2 font-mono text-sm ${
                      i === NAIVE_FLOW.length - 1
                        ? "border-exclude text-exclude"
                        : "border-border text-foreground"
                    }`}
                  >
                    {label}
                  </span>
                </motion.li>
              ))}
            </ol>
            <p className="text-muted-foreground mt-6 break-keep font-mono text-xs leading-relaxed">
              답은 빠르지만, 그 수치와 판단이 어디서 왔는지 확인할 방법이
              없습니다.
            </p>
          </motion.div>

          {/* 본 프로젝트 */}
          <motion.div
            variants={step}
            className="bg-card border-primary/40 relative rounded-xl border p-6 md:p-8"
            style={{
              backgroundImage: `
                linear-gradient(var(--border) 1px, transparent 1px),
                linear-gradient(90deg, var(--border) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          >
            <span
              aria-hidden
              className="text-foreground absolute top-3 right-4 font-sans text-2xl font-extralight opacity-40"
            >
              +
            </span>
            <h3 className="text-primary mb-1 font-mono text-sm tracking-widest">
              본 프로젝트
            </h3>
            <p className="text-muted-foreground mb-6 font-mono text-xs">
              계산 근거를 먼저 만들고, 그 위에서 검토
            </p>
            <ol className="flex flex-col items-start gap-2">
              {OUR_FLOW.map(({ label, note }, i) => (
                <motion.li
                  key={label}
                  variants={step}
                  className="flex flex-col items-start gap-2"
                >
                  {i > 0 && <Arrow />}
                  <span className="border-border bg-background/40 flex items-baseline gap-3 rounded-md border px-4 py-2">
                    <span className="text-foreground font-mono text-sm">
                      {label}
                    </span>
                    <span className="text-data font-mono text-xs">{note}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
            <p className="text-muted-foreground mt-6 break-keep font-mono text-xs leading-relaxed">
              모든 수치는 파서가 만든 JSON에서만 나오고, 에이전트는 같은 JSON을
              역할별 관점으로 검토합니다.
            </p>
          </motion.div>
        </motion.div>

        <p className="text-muted-foreground mx-auto mt-10 max-w-2xl break-keep text-center font-mono text-xs leading-relaxed">
          xTB는 실측 여과 효율의 예측기가 아니라, 대리 구조(proxy) 기반의 초기
          선별 도구입니다. 이 한계는 보고서와 UI에 항상 함께 표기합니다.
        </p>
      </div>
    </section>
  );
}
