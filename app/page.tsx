import Image from "next/image";
import SplineScene from "@/components/spline-scene";
import Header from "@/components/header";
import RotatingTextAccent from "@/components/rotating-text-accent";
import Footer from "@/components/footer";
import HeroTextOverlay from "@/components/hero-text-overlay";
import SkipLink from "@/components/skip-link";
import ScrollProgress from "@/components/scroll-progress";
import Problem from "@/components/sections/problem";
import CorePrinciple from "@/components/sections/core-principle";
import Architecture from "@/components/sections/architecture";
import LogToJson from "@/components/sections/log-to-json";
import EvidenceSchema from "@/components/sections/evidence-schema";
import McpToolchain from "@/components/sections/mcp-toolchain";
import AgentConstellation from "@/components/sections/agent-constellation";
import SafetyGate from "@/components/sections/safety-gate";
import CaseStudy from "@/components/sections/case-study";
import ReportPreview from "@/components/sections/report-preview";
import Limitations from "@/components/sections/limitations";
import FutureVision from "@/components/sections/future-vision";
import FinalCta from "@/components/sections/final-cta";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-background">
      <SkipLink />
      <ScrollProgress />
      <Header />

      <div className="max-w-[1200px] mx-auto">
        <main id="overview" className="scroll-mt-24">
          <section
            aria-label="소개"
            className="w-full relative h-[600px]"
          >
            <SplineScene />
            <HeroTextOverlay />
            <RotatingTextAccent />
          </section>

          {/* Jack 캐릭터 시트 — 기존 3D 렌더링·디자인 유지 */}
          <section
            aria-label="가이드 캐릭터 Jack"
            className="relative rounded-4xl py-7 mx-4 md:mx-0 w-[calc(100%-2rem)] md:w-full bg-card border border-solid border-border pb-20"
            style={{
              backgroundImage: `
                linear-gradient(var(--border) 1px, transparent 1px),
                linear-gradient(90deg, var(--border) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          >
            <div className="absolute top-8 left-8 text-foreground opacity-50 text-5xl font-extralight font-sans leading-[0rem]">
              +
            </div>
            <div className="absolute top-8 right-8 text-foreground opacity-50 text-5xl font-sans leading-[0] font-extralight">
              +
            </div>
            <div className="absolute bottom-8 left-8 text-foreground opacity-50 text-5xl font-sans font-extralight">
              +
            </div>
            <div className="absolute bottom-8 right-8 text-foreground opacity-50 text-5xl font-sans font-extralight">
              +
            </div>

            <div className="px-6 md:px-40">
              <div className="flex items-center justify-center mb-3.5 md:gap-11">
                <div className="flex flex-col items-center">
                  <Image
                    src="/jack-front.png"
                    alt="가이드 캐릭터 Jack 정면"
                    width={224}
                    height={224}
                    className="w-48 h-48 md:w-56 md:h-56 object-contain"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/jack-side.png"
                    alt="가이드 캐릭터 Jack 측면"
                    width={224}
                    height={224}
                    className="w-48 h-48 md:w-56 md:h-56 object-contain"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <Image
                    src="/jack-back.png"
                    alt="가이드 캐릭터 Jack 후면"
                    width={224}
                    height={224}
                    className="w-48 h-48 md:w-56 md:h-56 object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 max-w-5xl break-keep">
                <div className="flex items-center gap-4">
                  <span className="text-accent font-mono text-sm">Name</span>
                  <span className="text-foreground font-mono text-sm">Jack</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-accent font-mono text-sm">Species</span>
                  <span className="text-foreground font-mono text-sm">
                    Alien from Planet Flapjack
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-accent font-mono text-sm">Role</span>
                  <span className="text-foreground font-mono text-sm">
                    xTB Lab Harness의 안내자. 근거 없는 추측을 싫어하고, 계산
                    결과를 구조화해 정리하는 일에 진심인 외계인.
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-6 md:gap-10 px-4 md:px-0 mt-10">
            <Problem />
            <CorePrinciple />
            <Architecture />
            <LogToJson />
            <EvidenceSchema />
            <McpToolchain />
            <AgentConstellation />
            <SafetyGate />
            <CaseStudy />
            <ReportPreview />
            <Limitations />
            <FutureVision />
            <FinalCta />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
