"use client";

import { motion } from "motion/react";
import { GridPanel, SectionHeading } from "./_shared";

// docs/03 (가중치 재정의로 일반화), docs/00 (설계 원칙) 범위 안에서만 서술.
const IDEAS = [
  {
    tag: "generalize",
    title: "다른 실험으로 일반화",
    body: "실험 목적에 맞게 항목 가중치만 재정의하면 됩니다. 이번 사례는 정전기 상호작용 가중치가 최대였지만, 흡착·촉매 등 다른 목적에는 다른 가중치를 씁니다. 제외 규칙은 그대로 유지합니다.",
  },
  {
    tag: "evidence",
    title: "근거 필드 확장",
    body: "파서 JSON 스키마에 필드를 더하면 에이전트 관점도 함께 넓어집니다. 스키마·파서·문서·UI를 함께 갱신하는 규칙을 지키며 확장합니다.",
  },
  {
    tag: "audit",
    title: "재현·감사 원칙 유지",
    body: "raw_log_path 추적은 이미 현재 설계의 불변조건입니다. 필드와 실험이 늘어나는 확장 과정에서도 모든 판단을 원시 로그까지 되짚을 수 있는 상태를 그대로 유지합니다.",
  },
];

export default function FutureVision() {
  return (
    <GridPanel id="future">
      <SectionHeading eyebrow="Future" title="다음으로 넓혀갈 방향">
        핵심 원칙(수치의 단일 출처는 파서 JSON, 제외 우선)을 유지한 채, 도구를 더 넓은 실험으로
        확장하는 것을 목표로 합니다.
      </SectionHeading>

      <div className="grid gap-4 md:grid-cols-3">
        {IDEAS.map((idea, i) => (
          <motion.div
            key={idea.tag}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-background/60 p-5"
          >
            <span className="inline-block rounded-md border border-review/40 bg-review/5 px-2 py-0.5 font-mono text-[10px] uppercase text-review">
              {idea.tag}
            </span>
            <h3 className="mt-3 text-sm font-semibold text-foreground">
              {idea.title}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {idea.body}
            </p>
          </motion.div>
        ))}
      </div>
    </GridPanel>
  );
}
