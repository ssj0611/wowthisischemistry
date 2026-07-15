import type { Metadata } from "next";
import { IBM_Plex_Mono, Montserrat } from "next/font/google";
import MotionProvider from "@/components/motion-provider";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "xTB Lab Harness — 계산 근거 기반 실험 후보 선별",
  description:
    "xTB 계산 결과를 구조화된 JSON 근거로 만들고, 규칙 기반 멀티에이전트가 검토하여 실험 후보 물질의 우선순위와 판단 근거를 정리하는 초기 선별 시스템입니다.",
  openGraph: {
    title: "xTB Lab Harness",
    description:
      "Calculate first. Interpret second. 계산 화학 결과와 다중 검토를 활용한 실험 후보 물질 선별 시스템.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body
        className={`min-h-full flex flex-col font-mono ${ibmPlexMono.variable} ${montserrat.variable}`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
