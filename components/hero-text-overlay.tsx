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
      className="absolute top-20 left-4 z-20 max-w-[min(100%,22rem)] p-5 md:top-28 md:left-8 md:max-w-sm md:p-6"
      style={{
        // 여러 스탑으로 길게 페이드 → 장면과 끊기지 않게
        background:
          "linear-gradient(100deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 32%, rgba(255,255,255,0.55) 58%, rgba(255,255,255,0.18) 80%, rgba(255,255,255,0) 100%)",
      }}
    >
      <motion.p
        variants={item}
        className="mb-3 font-mono text-[11px] tracking-[0.25em] text-[#1a0ff7] md:text-xs"
      >
        xTB LAB HARNESS · 근거 우선 화학
      </motion.p>

      <motion.div variants={item} className="relative mb-3.5 inline-block" aria-hidden>
        {/* 외곽선 레이어 — stroke만으로 E/N이 깨져 보여서, 위 채움 레이어로 안쪽을 덮음 */}
        <span
          className="absolute inset-0 text-4xl font-bold tracking-wide md:text-6xl lg:text-7xl"
          style={{
            fontFamily: "var(--font-montserrat)",
            color: "#111111",
            WebkitTextStroke: "6px #111111",
          }}
        >
          SEOJIN
        </span>
        <span
          className="relative text-4xl font-bold tracking-wide md:text-6xl lg:text-7xl"
          style={{
            fontFamily: "var(--font-montserrat)",
            color: "#ffffff",
          }}
        >
          SEOJIN
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="mb-2 font-mono text-sm font-normal tracking-widest text-[#111111] md:text-base"
      >
        xTB Lab Harness — 계산 근거 기반
        <br />
        실험 후보 물질 선별 시스템
      </motion.h1>

      <motion.p
        variants={item}
        className="mb-6 max-w-xs break-keep font-mono text-xs leading-relaxed text-[#5f5f5f] md:text-sm"
      >
        xTB 계산으로 정량 근거를 만들고, 구조화된 JSON을 역할별 에이전트가
        검토해 실험 설계 보고서로 정리합니다.
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-3">
        <motion.a
          href="#pipeline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          whileFocus={{ scale: 1.05 }}
          transition={ctaSpring}
          className="rounded-full bg-[#1a0ff7] px-6 py-2.5 font-mono text-sm font-medium text-white hover:shadow-[0_0_20px_rgb(26,15,247,0.4)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a0ff7]"
        >
          계산 흐름 살펴보기
        </motion.a>
        <motion.a
          href="#case-study"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          whileFocus={{ scale: 1.05 }}
          transition={ctaSpring}
          className="rounded-full border border-[#e0e0e0] px-6 py-2.5 font-mono text-sm font-medium text-[#111111] transition-colors hover:border-[#1a0ff7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a0ff7]"
        >
          적용 사례 보기
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
