"use client";

import { Suspense, useState } from "react";
import Spline from "@splinetool/react-spline";

export default function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-white">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-white">
          <div className="text-center text-[#111111]">
            <div className="mb-2 text-lg">3D 장면 불러오는 중...</div>
            <div className="text-sm opacity-70">잠시만 기다려 주세요</div>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/jack-front.png"
            alt="Jack"
            className="h-[70%] w-auto object-contain"
          />
        </div>
      )}

      {!hasError && (
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            // 하늘색→파랑 쪽 hue, 대비↓·미세 블러로 그라데이션 부드럽게
            filter:
              "hue-rotate(72deg) saturate(1.12) brightness(0.94) contrast(0.84) blur(0.55px)",
          }}
        >
          <Suspense fallback={null}>
            <Spline
              scene="https://prod.spline.design/l8gr6AhxxCqDIdBx/scene.splinecode"
              onLoad={() => {
                setIsLoading(false);
                setHasError(false);
              }}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
              style={{
                width: "118%",
                height: "108%",
                marginLeft: "8%",
                marginTop: "-2%",
                background: "transparent",
              }}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
}
