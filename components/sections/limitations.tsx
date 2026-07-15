"use client";

import { motion } from "motion/react";
import { GridPanel, SectionHeading } from "./_shared";

// docs/04, 00 의 한계 서술을 그대로 반영.
const LIMITS = [
  {
    title: "실측을 좌우하는 변수는 계산 밖에 있다",
    body: "입자 크기, 표면 거칠기, 용매, pH, 농도, 교반, 필터 제작 방식 등이 실제 여과 성능을 결정합니다. xTB는 이를 담지 않습니다.",
  },
  {
    title: "대리 구조 기반 초기 선별이다",
    body: "실제 입자 전체가 아니라 단순화한 대리 구조끼리 비교합니다. 결과는 여과 효율의 직접 지표가 아니라 '먼저 볼 후보'를 좁히는 초기 선별입니다.",
  },
  {
    title: "안전성 판정은 1차 검토일 뿐",
    body: "안전성 에이전트는 실험 전 1차 스크리닝입니다. 실제 실험에는 물질안전보건자료(SDS)와 교사·전문가 검토가 반드시 필요합니다.",
  },
  {
    title: "의사결정 보조이지 결론이 아니다",
    body: "이 시스템은 후보를 동일 기준으로 비교하도록 돕는 보조 도구이며, 실험 결론을 대체하지 않습니다.",
  },
];

export default function Limitations() {
  return (
    <GridPanel id="limitations">
      <SectionHeading eyebrow="한계" title="시스템 사용시 주의사항">
        정직하게 밝히는 것이 신뢰의 출발점입니다. 아래는 결과를 읽을 때 반드시 함께 기억해야 할
        경계입니다.
      </SectionHeading>

      <div className="grid gap-4 md:grid-cols-2">
        {LIMITS.map((l, i) => (
          <motion.div
            key={l.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex gap-4 rounded-2xl border border-caution/30 bg-caution/[0.04] p-5"
          >
            <span className="font-mono text-sm text-caution">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{l.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {l.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </GridPanel>
  );
}
