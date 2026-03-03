"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface YellowSectionsWrapperProps {
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export function YellowSectionsWrapper({
  children,
  triggerRef,
}: YellowSectionsWrapperProps) {
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "end start"],
  });

  // Lights on/off effect based on vision-statement scroll position
  // Turns yellow when vision-statement enters, reverts when it exits
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.85, 0.92, 1],
    ["#ffffff", "#fffdf5", "#f2d04e", "#f2d04e", "#fffdf5", "#ffffff"]
  );

  // Light overlay opacity
  const lightOverlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.1, 0.85, 0.92, 1],
    [0, 0.3, 1, 1, 0.3, 0]
  );

  // Glow intensity
  const glowIntensity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.85, 0.92],
    [0, 1, 1, 0]
  );

  return (
    <motion.div style={{ backgroundColor }} className="relative">
      {/* Light overlay effect - simulates brightness/exposure */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          opacity: lightOverlayOpacity,
          background:
            "radial-gradient(ellipse at center, rgba(242, 208, 78, 0.15) 0%, transparent 70%)",
        }}
      />

      {/* Ambient glow effect */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ opacity: glowIntensity }}
      >
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[200%] h-[100%] bg-gradient-to-b from-[#f2d04e]/20 via-transparent to-transparent blur-3xl" />
      </motion.div>

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
