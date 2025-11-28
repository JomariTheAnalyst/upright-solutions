"use client";

import { cn } from "@/lib/utils";

export function Est() {
  return (
    <section className="relative w-full bg-[#fafafa] py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Outline Text - Matching Services Style */}
      <div className="absolute top-0 left-0 w-full select-none pointer-events-none opacity-100 z-0">
        <h1
          className="text-[15vw] font-bold leading-[1.5] text-transparent font-heading tracking-tighter text-left pl-[8vw]"
          style={{
            WebkitTextStroke: "3px rgba(36, 34, 27, 0.1)",
            color: "transparent",
          }}
        >
          ABOUT US
        </h1>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Main Content - Overlapping lower portion of ABOUT US */}
        <div className="relative pt-[12vw] sm:pt-[10vw] md:pt-[9vw] lg:pt-[8vw]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
            {/* Left Column: Headline + Description */}
            <div className="max-w-2xl space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#24221B] leading-[1.1] font-heading uppercase tracking-tight">
                <span className="whitespace-nowrap">Since 2015, Upright Solutions</span>
                <br />
                <span className="whitespace-nowrap">has delivered IT excellence</span>
                <br />
                <span className="whitespace-nowrap">across industries</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-[#24221B]/70 font-body leading-relaxed max-w-lg">
                In a world where technology is becoming increasingly complex,
                having a partner who understands every step is essential. From
                system integration to software development, we make sure no
                detail is overlooked.
              </p>
            </div>

            {/* Right Column: Handwritten Note (Visible on all screens) */}
            <div className="flex justify-end items-end pb-4 pr-4 sm:pr-8 lg:pr-[5vw] mt-8 lg:mt-0">
              <div className="flex flex-col items-center group cursor-default transform rotate-[-5deg]">
                {/* Arrow SVG */}
                <svg
                  width="80"
                  height="60"
                  viewBox="0 0 100 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#0000a1] mb-2 transform rotate-12 scale-75 sm:scale-100 transition-transform group-hover:scale-110"
                >
                  <path
                    d="M90 10 C 70 30, 40 40, 10 60"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M25 55 L 10 60 L 15 45"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <span
                  className="text-2xl sm:text-3xl text-[#0000a1] font-medium whitespace-nowrap"
                  style={{
                    fontFamily:
                      '"Caveat", "Brush Script MT", "Comic Sans MS", cursive',
                  }}
                >
                  Rooted in the Philippines
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
