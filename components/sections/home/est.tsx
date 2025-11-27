"use client";

import { cn } from "@/lib/utils";

export function Est() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#fafafa] overflow-hidden">
      <div className="relative w-full max-w-7xl px-6 lg:px-8 flex flex-col justify-center h-full">
        {/* Background "ABOUT US" Text */}
        <div className="absolute top-10 -left-32 sm:top-20 sm:-left-24 lg:-left-16 select-none pointer-events-none z-0">
          <span
            className="font-heading text-[8rem] sm:text-[12rem] lg:text-[18rem] font-bold leading-none text-transparent opacity-[0.08] whitespace-nowrap"
            style={{ WebkitTextStroke: "2px #24221B" }}
          >
            ABOUT US
          </span>
        </div>

        {/* Main Content */}
        <div className="relative z-10 mt-20 sm:mt-32 lg:mt-40 max-w-5xl">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-6xl font-bold text-[#24221B] leading-[1.1] tracking-tight uppercase mb-8 sm:mb-12">
            Since 2015, Upright Solutions <br className="hidden lg:block" />
            has delivered IT excellence <br className="hidden lg:block" />
            across industries
          </h2>

          <p className="font-body text-lg sm:text-xl text-[#24221B]/80 leading-relaxed max-w-2xl">
            In a world where technology is becoming increasingly complex, having
            a partner who understands every step is essential. From systemp
            integration to software development, we make sure no detail is
            overlooked.
          </p>
        </div>

        {/* Handwritten Note */}
        <div className="absolute bottom-20 right-6 sm:bottom-32 sm:right-20 lg:right-32 transform rotate-[-5deg] z-10">
          <div className="flex flex-col items-center group cursor-default">
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
  );
}
