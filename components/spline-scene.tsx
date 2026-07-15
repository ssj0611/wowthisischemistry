"use client";

import { Suspense, useState } from "react";
import Spline from "@splinetool/react-spline";

export default function SplineScene() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="absolute inset-0 w-full h-full bg-background">
      {isLoading && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="text-foreground text-center">
            <div className="text-lg mb-2">3D 장면 불러오는 중...</div>
            <div className="text-sm opacity-70">잠시만 기다려 주세요</div>
          </div>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="text-foreground text-center">
            <div className="text-lg mb-2">3D 장면을 불러올 수 없습니다</div>
            <div className="text-sm opacity-70">모델을 표시하지 못했습니다</div>
          </div>
        </div>
      )}

      {!hasError && (
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
              width: "100%",
              height: "100%",
              background: "transparent",
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
