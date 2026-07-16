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
            className="w-full relative h-[480px] md:h-[520px]"
          >
            <SplineScene />
            <HeroTextOverlay />
            <RotatingTextAccent />
          </section>

          <div className="flex flex-col gap-2 md:gap-4 px-4 md:px-0">
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
