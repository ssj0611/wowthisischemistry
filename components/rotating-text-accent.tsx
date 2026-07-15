"use client";

export default function RotatingTextAccent() {
  const text = "· XTB · 근거 우선 · 먼저 계산 · 그다음 해석 ";

  return (
    <div
      aria-hidden
      className="absolute bottom-20 right-8 w-24 h-24 md:w-32 md:h-32"
    >
      <div className="relative w-full h-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-primary-foreground md:h-16 md:w-16 md:text-2xl"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            W
          </span>
        </div>

        <div className="absolute inset-0 animate-spin-slow">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <path
                id="circle"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text className="text-xs fill-white font-medium">
              <textPath href="#circle" startOffset="0%">
                {text}
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
