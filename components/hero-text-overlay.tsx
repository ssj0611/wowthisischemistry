"use client";

import { motion } from "motion/react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

const ctaSpring = { type: "spring" as const, stiffness: 400, damping: 20 };

export default function HeroTextOverlay() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="absolute top-24 md:top-36 left-8 z-10 max-w-md"
    >
      <motion.p
        variants={item}
        className="text-accent mb-3 font-mono text-[11px] tracking-[0.25em] md:text-xs"
      >
        xTB LAB HARNESS · EVIDENCE-FIRST CHEMISTRY
      </motion.p>

      <motion.p
        variants={item}
        aria-hidden
        className="mb-3.5 text-6xl font-bold tracking-wider md:text-7xl lg:text-8xl"
        style={{
          fontFamily: "var(--font-montserrat)",
          color: "rgb(0, 0, 0)",
          WebkitTextStroke: "5px white",
          paintOrder: "stroke fill",
        }}
      >
        JACK
      </motion.p>

      <motion.h1
        variants={item}
        className="text-foreground mb-2 font-mono text-sm font-normal tracking-widest md:text-base"
      >
        xTB Lab Harness — 계산 근거 기반
        <br />
        실험 후보 물질 선별 시스템
      </motion.h1>

      <motion.p
        variants={item}
        className="text-muted-foreground mb-6 max-w-xs break-keep font-mono text-xs leading-relaxed md:text-sm"
      >
        xTB 계산으로 정량 근거를 만들고, 구조화된 JSON을 역할별 에이전트가
        검토해 실험 설계 보고서로 정리합니다. 마스코트 Jack이 안내합니다.
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-3">
        <motion.a
          href="#pipeline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          whileFocus={{ scale: 1.05 }}
          transition={ctaSpring}
          className="bg-primary text-primary-foreground rounded-full px-6 py-2.5 font-mono text-sm font-medium hover:shadow-[0_0_20px_rgb(29,237,131,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          계산 흐름 살펴보기
        </motion.a>
        <motion.a
          href="#case-study"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          whileFocus={{ scale: 1.05 }}
          transition={ctaSpring}
          className="border-border text-foreground hover:border-accent rounded-full border px-6 py-2.5 font-mono text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          적용 사례 보기
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
