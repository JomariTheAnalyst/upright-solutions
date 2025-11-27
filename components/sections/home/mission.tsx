"use client";

import { useRef } from "react";
import Lottie from "lottie-react";
import missionAnimation from "@/public/animations/Mission.json";

export function Mission() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#fafafa]">
      <div className="flex flex-col items-center justify-center max-w-4xl px-6 text-center">
        {/* Lottie Animation */}
        <div className="mb-12 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
          <Lottie animationData={missionAnimation} loop={true} />
        </div>

        {/* Mission Statement */}
        <h3 className="font-heading text-2xl font-medium leading-relaxed tracking-tight text-[#24221B] sm:text-3xl lg:text-4xl">
          To deliver IT excellence across industries—
          <br className="hidden sm:block" />
          always from your perspective.
        </h3>
        <p className="mt-6 max-w-2xl font-body text-base text-[#24221B]/70 sm:text-lg">
          We understand your business deeply, creating solutions that respect your goals,
          empower your growth, and build meaningful partnerships.
        </p>
      </div>
    </div>
  );
}
