"use client";

import { useRef, forwardRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";

export const VisionStatement = forwardRef<HTMLDivElement>((_, forwardedRef) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const targetRef =
    (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;

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

  // Content fade in/out for smoother appearance
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.1, 0.8, 0.95],
    [0.3, 1, 1, 0.3]
  );

  return (
    <section
      ref={targetRef}
      className="relative h-[400vh] w-full bg-transparent"
    >
      <motion.div
        className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4"
        style={{ opacity: contentOpacity }}
      >
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
            We build digital experiences that matter. By combining strategy,
            design, and technology, we help brands connect with their audience
            in meaningful ways, creating a lasting impact in a rapidly evolving
            digital landscape.
          </p>
        </div>
      </motion.div>
    </section>
  );
});

VisionStatement.displayName = "VisionStatement";
