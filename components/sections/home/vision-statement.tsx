"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const VisionStatement = () => {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(
    scrollVelocity,
    [-0.5, 0.5],
    ["45deg", "-45deg"]
  );
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  const xRaw = useTransform(scrollYProgress, [0, 0.8], ["100%", "-100%"]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0.85, 1],
    ["#f2d04e", "#ffffff"]
  );

  return (
    <motion.section
      ref={targetRef}
      style={{ backgroundColor }}
      className="relative h-[400vh] w-full"
    >

      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
        {/* Main Heading with Velocity Effect */}
        <div className="relative z-10 flex flex-1 items-center justify-center w-full">
          <motion.h2
            style={{ skewX, x }}
            className="whitespace-nowrap text-center text-[12vw] font-bold uppercase leading-[0.85] tracking-tighter text-black md:text-8xl lg:text-[15vw]"
          >
            We design the future with you.
          </motion.h2>
        </div>

        {/* Subheading */}
        <div className="relative z-10 mb-20 max-w-3xl text-center">
          <p className="font-medium text-black/100 text-lg md:text-2xl leading-relaxed">
            We build digital experiences that matter. By combining strategy, design, and technology, 
            we help brands connect with their audience in meaningful ways, creating a lasting impact 
            in a rapidly evolving digital landscape.
          </p>
        </div>
      </div>
    </motion.section>
  );
};
