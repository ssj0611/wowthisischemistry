import Image from "next/image";

const NAV = [
  { href: "#mcp", label: "MCP 도구" },
  { href: "#agents", label: "에이전트" },
  { href: "#safety-gate", label: "안전 게이트" },
  { href: "#case-study", label: "사례" },
  { href: "#report", label: "보고서" },
  { href: "#limitations", label: "한계" },
];

export default function Footer() {
  return (
    <footer className="w-full px-6 relative py-[0] mt-28 h-auto mb-0 bg-card">
      <div className="absolute top-8 right-6 text-accent text-2xl">+</div>
      <div className="absolute top-1/2 right-12 text-accent text-lg transform -translate-y-1/2">
        ✦
      </div>
      <div className="absolute bottom-12 right-20 text-accent text-xl">+</div>
      <div className="absolute top-16 right-32 text-accent text-sm">✦</div>
      <div className="absolute bottom-8 right-8 text-accent text-lg">✦</div>

      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex-1 max-w-lg mt-8">
            <h2
              className="text-foreground text-4xl md:text-5xl mb-8 leading-[3.5rem] md:leading-[4rem] font-semibold text-center md:text-left mt-0"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              근거가 추측을 이긴다.
            </h2>

            <div className="space-y-4 text-foreground">
              <div className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <p className="text-sm">
                  xTB 계산과 멀티에이전트 검증으로 실험 후보 물질을 동일 기준에서 초기 선별합니다.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <p className="text-sm">
                  수치의 단일 출처는 파서가 만든 xTB JSON이며, LLM은 서술만 돕습니다.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent mt-1">•</span>
                <p className="text-sm">
                  이 결과는 실측 여과 효율이 아니라 대리 구조 기반 초기 선별입니다.
                </p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-1 justify-end items-center relative">
            <div className="relative">
              <Image
                src="/jack-footer-ufo-new.png"
                alt="Jack in UFO"
                width={400}
                height={300}
                className="object-contain mb-0 mt-4"
              />
            </div>
          </div>
        </div>

        <div className="md:hidden flex justify-center mt-12">
          <div className="relative">
            <Image
              src="/jack-footer-ufo-new.png"
              alt="Jack in UFO"
              width={500}
              height={375}
              className="object-contain"
            />
          </div>
        </div>

        <div className="w-full px-6 py-16 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-0 border-t border-border mt-16">
          <div className="flex flex-col md:flex-row gap-2 text-center md:text-left">
            <h2 className="text-foreground font-mono text-xl font-bold">
              xTB Lab Harness
            </h2>
            <p className="text-foreground font-mono font-normal text-base">
              계산 화학 + 멀티에이전트 검증 기반 실험 후보 선별
            </p>
          </div>

          <nav
            aria-label="푸터 섹션 바로가기"
            className="flex flex-wrap justify-center gap-x-5 gap-y-2"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="w-full px-6 py-4 border-t border-border flex md:flex-row items-center justify-between gap-2 flex-row">
          <p className="text-muted-foreground text-sm font-mono">
            © 2026 대덕고 xTB 프로젝트
          </p>
          <p className="text-muted-foreground text-sm font-mono">
            GFN2-xTB · Rule-based Multi-agent
          </p>
        </div>
      </div>
    </footer>
  );
}
