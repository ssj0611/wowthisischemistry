"use client";

import { motion } from "motion/react";
import { GridPanel } from "./_shared";

export default function FinalCta() {
  return (
    <GridPanel id="cta" className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl"
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
          xTB Lab Harness
        </p>
        <h2
          className="text-3xl md:text-5xl font-semibold leading-tight text-foreground"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          계산은 근거를, 검증은 신뢰를.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
          xTB 정량 계산과 9개 규칙 기반 에이전트가 같은 Evidence JSON을 함께 읽고, 어떤 실험 후보를
          먼저 살펴볼지 투명하게 좁혀 줍니다. 판단의 근거는 언제나 추적 가능한 상태로 남습니다.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#case-study"
            className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-mono font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgb(29,237,131,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            사례 다시 보기
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 7h10v10M7 17L17 7" />
            </svg>
          </a>
          <a
            href="#agents"
            className="flex items-center gap-2 rounded-full border border-border px-8 py-4 font-mono text-foreground transition-colors hover:border-review/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            에이전트 구조 보기
          </a>
        </div>
      </motion.div>
    </GridPanel>
  );
}
