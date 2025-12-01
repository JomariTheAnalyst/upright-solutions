"use client";

import { cn } from "@/lib/utils";

export function Est() {
  return (
    <section className="relative w-full min-h-screen bg-[#FFFFFF] flex items-center overflow-hidden">
      {/* Background Outline Text - Responsive positioning */}
      <div className="absolute top-24  w-full select-none pointer-events-none opacity-100 z-0 pt-4 md:pt-8 lg:pt-0">
        <h1
          className="text-[12vw] md:text-[13vw] lg:text-[13vw] font-bold leading-[1] text-transparent font-heading tracking-tighter text-left pl-4 md:pl-6 lg:pl-[8vw]"
          style={{
            WebkitTextStroke: "2px rgba(36, 34, 27, 0.15)",
            color: "transparent",
          }}
        >
          ABOUT US
        </h1>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full py-8">
        {/* Main Content - Tight overlap on mobile/tablet, normal on desktop */}
        <div className="relative pt-[8vw] sm:pt-[7vw] md:pt-[6vw] lg:pt-[10px]">
          {/* Line 26 - Change grid ratio */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_0.2fr] gap-8 items-end">

            {/* Left Column: Headline + Description */}
            <div className="max-w-4xl mx-auto lg:mx-0 space-y-6 pl-0 lg:pl-32">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-[#24221B] leading-[0.95] font-heading uppercase tracking-tight">
                <span className="whitespace-normal lg:whitespace-nowrap inline-block">
                  Since 2015, Upright Solutions
                </span>{" "}
                <br className="hidden lg:block" />
                <span className="whitespace-normal lg:whitespace-nowrap inline-block">
                  has delivered IT excellence
                </span>{" "}
                <br className="hidden lg:block" />
                <span className="whitespace-normal lg:whitespace-nowrap inline-block">
                  across industries
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-[24px] text-[#000000]/100 font-body leading-relaxed max-w-4xl text-left">
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
