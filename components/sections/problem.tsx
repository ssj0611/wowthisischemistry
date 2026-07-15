"use client";

import { motion } from "motion/react";

const PROBLEMS = [
  {
    tag: "P-01",
    label: "NO COMMON RULER",
    color: "text-data",
    title: "후보는 많고, 기준은 제각각",
    body: "실험 후보 물질이 많아질수록 동일한 기준으로 비교하고 순위화하기 어렵습니다. 후보마다 참고한 문헌과 조건이 달라, 공정한 비교 자체가 성립하지 않습니다.",
  },
  {
    tag: "P-02",
    label: "MOLECULAR SCALE",
    color: "text-caution",
    title: "직관·문헌만으로는 분자 수준 판단이 어렵다",
    body: "표면 화학·흡착·여과처럼 전하·극성·안정성이 결과를 좌우하는 실험에서는, 직관과 문헌 요약만으로 분자 수준의 차이를 가려내기 어렵고 정량 근거가 필요합니다.",
  },
  {
    tag: "P-03",
    label: "UNGROUNDED OUTPUT",
    color: "text-exclude",
    title: "LLM 단독 추천은 근거 확인이 어렵다",
    body: "LLM만으로 후보를 추천하면 존재하지 않는 물질이나 근거 없는 수치를 그럴듯하게 생성할 위험이 있습니다. 문제는 능력이 아니라, 판단의 근거를 확인할 수 없다는 점입니다.",
  },
];

const card = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 18 },
  },
};

export default function Problem() {
  return (
    <section id="problem" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-accent mb-3 font-mono text-xs tracking-[0.25em]">
          PROBLEM
        </p>
        <h2
          className="mb-4 max-w-2xl break-keep text-3xl font-bold text-foreground md:text-4xl"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          왜 &ldquo;그냥 추천&rdquo;으로는 부족한가
        </h2>
        <p className="text-muted-foreground mb-12 max-w-2xl break-keep font-mono text-sm leading-relaxed">
          실험 후보 물질을 고르는 과정에서 반복적으로 마주치는 세 가지 문제에서
          이 프로젝트가 출발했습니다.
        </p>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15 }}
          className="grid gap-5 md:grid-cols-3"
        >
          {PROBLEMS.map(({ tag, label, color, title, body }) => (
            <motion.li
              key={tag}
              variants={card}
              className="bg-card border-border relative rounded-xl border p-6"
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
              <div className="mb-4 flex items-baseline gap-3 font-mono text-xs tracking-widest">
                <span className="text-muted-foreground">{tag}</span>
                <span className={color}>{label}</span>
              </div>
              <h3 className="text-foreground mb-3 break-keep text-lg font-semibold">
                {title}
              </h3>
              <p className="text-muted-foreground break-keep font-mono text-sm leading-relaxed">
                {body}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
