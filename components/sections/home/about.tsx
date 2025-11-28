"use client";

import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Est } from "./est";
import { Mission } from "./mission";
import { Services } from "./services";

const line1_1 = "Forging the future of enterprise IT—";
const line1_2 = "where innovation meets unwavering reliability.";

const line2_1 = "Since 2015, we've been the silent engine behind";
const line2_2 = "industry giants, delivering excellence that speaks for itself.";

const words1_1 = line1_1.split(" ");
const words1_2 = line1_2.split(" ");
const totalWords1 = words1_1.length + words1_2.length;

const words2_1 = line2_1.split(" ");
const words2_2 = line2_2.split(" ");
const totalWords2 = words2_1.length + words2_2.length;

export function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile ? <MobileAbout /> : <DesktopAbout />}
      <Services />
      <Mission />
    </>
  );
}

function DesktopAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  // Phase 1: Text reveal (0.0 - 0.15)
  const opacity1 = useTransform(scrollYProgress, [0.12, 0.15], [1, 0]);
  const pointerEvents1 = useTransform(scrollYProgress, (v) =>
    v > 0.15 ? "none" : "auto"
  );

  // Phase 2: Text reveal (0.15 - 0.35)
  const opacity2 = useTransform(
    scrollYProgress,
    [0.15, 0.18, 0.32, 0.35],
    [0, 1, 1, 0]
  );
  const pointerEvents2 = useTransform(scrollYProgress, (v) =>
    v < 0.15 || v > 0.35 ? "none" : "auto"
  );

  // Video: Slides in 0.35-0.4, Slides out 0.5-0.55
  const videoY = useTransform(smoothProgress, [0.35, 0.95], ["0%", "0%"]);
  const videoX = useTransform(
    smoothProgress,
    [0.35, 0.4, 0.5, 0.55],
    ["100%", "0%", "0%", "-100%"]
  );
  const videoOpacity = useTransform(smoothProgress, [0.35, 0.37], [0, 1]);

  // Est: Slides in 0.5-0.55
  const estX = useTransform(smoothProgress, [0.5, 0.55], ["100%", "0%"]);
  const estOpacity = useTransform(smoothProgress, [0.5, 0.52], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-x-clip overflow-y-hidden bg-[#fafafa] p-2 sm:p-4 lg:p-4">
        {/* Text Block 1 */}
        <motion.div
          style={{ opacity: opacity1, pointerEvents: pointerEvents1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex w-full max-w-[95vw] flex-col items-center justify-center px-4 text-center">
            <h2 className="flex w-full flex-col items-center justify-center font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight tracking-tight text-[#24221B]">
              <div className="flex w-full justify-center flex-wrap">
                {words1_1.map((word, i) => {
                  const start = 0.02 + (i / totalWords1) * 0.08;
                  const end = start + (1 / totalWords1) * 0.08;
                  return (
                    <Word
                      key={`1-l1-${i}`}
                      progress={scrollYProgress}
                      range={[start, end]}
                      index={i}
                    >
                      {word}
                    </Word>
                  );
                })}
              </div>
              <div className="flex w-full justify-center flex-wrap">
                {words1_2.map((word, i) => {
                  const globalIndex = words1_1.length + i;
                  const start = 0.02 + (globalIndex / totalWords1) * 0.08;
                  const end = start + (1 / totalWords1) * 0.08;
                  return (
                    <Word
                      key={`1-l2-${i}`}
                      progress={scrollYProgress}
                      range={[start, end]}
                      index={globalIndex}
                      isTarget={true}
                      highlightRange={[0.1, 0.13]}
                    >
                      {word}
                    </Word>
                  );
                })}
              </div>
            </h2>
          </div>
        </motion.div>

        {/* Text Block 2 */}
        <motion.div
          style={{ opacity: opacity2, pointerEvents: pointerEvents2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex w-full max-w-[95vw] flex-col items-center justify-center px-4 text-center">
            <h2 className="flex w-full flex-col items-center justify-center font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium leading-tight tracking-tight text-[#24221B]">
              <div className="flex w-full justify-center flex-wrap">
                {words2_1.map((word, i) => {
                  const start = 0.18 + (i / totalWords2) * 0.12;
                  const end = start + (1 / totalWords2) * 0.12;
                  return (
                    <Word
                      key={`2-l1-${i}`}
                      progress={scrollYProgress}
                      range={[start, end]}
                      index={i}
                    >
                      {word}
                    </Word>
                  );
                })}
              </div>
              <div className="flex w-full justify-center flex-wrap">
                {words2_2.map((word, i) => {
                  const globalIndex = words2_1.length + i;
                  const start = 0.18 + (globalIndex / totalWords2) * 0.12;
                  const end = start + (1 / totalWords2) * 0.12;
                  return (
                    <Word
                      key={`2-l2-${i}`}
                      progress={scrollYProgress}
                      range={[start, end]}
                      index={globalIndex}
                      isTarget={true}
                      highlightRange={[0.1, 0.13]}
                    >
                      {word}
                    </Word>
                  );
                })}
              </div>
            </h2>
          </div>
        </motion.div>

        {/* Video Reveal Section */}
        <motion.div
          style={{
            x: videoX,
            y: videoY,
            opacity: videoOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 lg:p-4"
        >
          <div className="relative h-full w-full flex flex-col lg:block overflow-y-auto lg:overflow-hidden">
            {/* Video Container with Heading Inside */}
            <div className="relative flex-shrink-0 h-[80vh] lg:h-full w-full overflow-hidden rounded-3xl bg-black shadow-2xl">
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source
                  src="https://cdn.builder.io/o/assets%2Fdf86a2c927524359b1806962d7ea4653%2Fd3648a7c22694415a83fe69259b9e90c?alt=media&token=d1520663-8850-4ee2-8c86-f7c161a92ce0&apiKey=df86a2c927524359b1806962d7ea4653"
                  type="video/mp4"
                />
              </video>

              {/* Overlay Content */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40 lg:bg-gradient-to-t lg:from-black/60 lg:via-transparent lg:to-transparent" />

              {/* Main Headline */}
              <div className="absolute top-6 left-6 lg:top-auto lg:bottom-12 lg:left-12 max-w-xs lg:max-w-md">
                <h3 className="font-heading text-2xl font-bold leading-[1.2] text-white sm:text-3xl lg:text-5xl">
                  Philippine IT excellence
                  <br />
                  <span className="italic">built for your business</span>
                </h3>
              </div>

              {/* Info Cards */}
              <div className="hidden lg:flex absolute bottom-8 right-8 flex-row gap-6 lg:bottom-12 lg:right-12">
                <InfoCard
                  iconSrc="/images/icons/flash.svg"
                  title="Full-Suite Services"
                  description="System integration, software development, professional services, and hardware deployment—all under one roof."
                />
                <InfoCard
                  iconSrc="/images/icons/shield-tick.svg"
                  title="Industry Expertise"
                  description="Trusted by government, finance, telecom, energy, maritime, healthcare, and more across the Philippines."
                />
                <InfoCard
                  iconSrc="/images/icons/profile-2user.svg"
                  title="Client-First Approach"
                  description="We understand your business deeply, delivering solutions from your perspective and your customers' needs."
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Est Section - Last Horizontal Slide */}
        <motion.div
          style={{
            x: estX,
            opacity: estOpacity,
          }}
          className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 lg:p-4"
        >
          <Est />
        </motion.div>
      </div>
    </section>
  );
}

function MobileAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 25,
    restDelta: 0.001,
  });

  // Text 1: Visible 0 - 0.45
  const opacity1 = useTransform(smoothProgress, [0.4, 0.45], [1, 0]);
  const pointerEvents1 = useTransform(smoothProgress, (v) =>
    v > 0.45 ? "none" : "auto"
  );

  // Text 2: Visible 0.45 - 0.9
  const opacity2 = useTransform(smoothProgress, [0.45, 0.5, 0.9, 0.95], [0, 1, 1, 0]);
  const pointerEvents2 = useTransform(smoothProgress, (v) =>
    v < 0.45 || v > 0.95 ? "none" : "auto"
  );

  return (
    <div className="flex flex-col w-full bg-[#fafafa]">
      {/* Sticky Text Animation Section */}
      <section ref={containerRef} className="relative h-[250vh]">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          {/* Text Block 1 */}
          <motion.div
            style={{ opacity: opacity1, pointerEvents: pointerEvents1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex w-full max-w-[95vw] flex-col items-center justify-center px-4 text-center">
              <h2 className="flex w-full flex-col items-center justify-center font-serif text-2xl sm:text-3xl font-medium leading-tight tracking-tight text-[#24221B]">
                <div className="flex w-full justify-center flex-wrap">
                  {words1_1.map((word, i) => {
                    const start = 0.0 + (i / totalWords1) * 0.3;
                    const end = start + (1 / totalWords1) * 0.3;
                    return (
                      <Word
                        key={`m-1-l1-${i}`}
                        progress={smoothProgress}
                        range={[start, end]}
                        index={i}
                      >
                        {word}
                      </Word>
                    );
                  })}
                </div>
                <div className="flex w-full justify-center flex-wrap">
                  {words1_2.map((word, i) => {
                    const globalIndex = words1_1.length + i;
                    const start = 0.0 + (globalIndex / totalWords1) * 0.3;
                    const end = start + (1 / totalWords1) * 0.3;
                    return (
                      <Word
                        key={`m-1-l2-${i}`}
                        progress={smoothProgress}
                        range={[start, end]}
                        index={globalIndex}
                        isTarget={true}
                        highlightRange={[0.35, 0.4]}
                      >
                        {word}
                      </Word>
                    );
                  })}
                </div>
              </h2>
            </div>
          </motion.div>

          {/* Text Block 2 */}
          <motion.div
            style={{ opacity: opacity2, pointerEvents: pointerEvents2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex w-full max-w-[95vw] flex-col items-center justify-center px-4 text-center">
              <h2 className="flex w-full flex-col items-center justify-center font-serif text-2xl sm:text-3xl font-medium leading-tight tracking-tight text-[#24221B]">
                <div className="flex w-full justify-center flex-wrap">
                  {words2_1.map((word, i) => {
                    const start = 0.5 + (i / totalWords2) * 0.3;
                    const end = start + (1 / totalWords2) * 0.3;
                    return (
                      <Word
                        key={`m-2-l1-${i}`}
                        progress={smoothProgress}
                        range={[start, end]}
                        index={i}
                      >
                        {word}
                      </Word>
                    );
                  })}
                </div>
                <div className="flex w-full justify-center flex-wrap">
                  {words2_2.map((word, i) => {
                    const globalIndex = words2_1.length + i;
                    const start = 0.5 + (globalIndex / totalWords2) * 0.3;
                    const end = start + (1 / totalWords2) * 0.3;
                    return (
                      <Word
                        key={`m-2-l2-${i}`}
                        progress={smoothProgress}
                        range={[start, end]}
                        index={globalIndex}
                      >
                        {word}
                      </Word>
                    );
                  })}
                </div>
              </h2>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section - Natural Scroll */}
      <div className="px-4 py-8 -mt-20 relative z-10 bg-[#fafafa]">
        <div className="relative w-full overflow-hidden rounded-3xl bg-black shadow-lg aspect-[4/5]">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://cdn.builder.io/o/assets%2Fdf86a2c927524359b1806962d7ea4653%2Fd3648a7c22694415a83fe69259b9e90c?alt=media&token=d1520663-8850-4ee2-8c86-f7c161a92ce0&apiKey=df86a2c927524359b1806962d7ea4653"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/40" />
          <div className="absolute top-6 left-6 max-w-xs">
            <h3 className="font-heading text-2xl font-bold leading-[1.2] text-white">
              Philippine IT excellence
              <br />
              <span className="italic">built for your business</span>
            </h3>
          </div>
        </div>
        
        {/* Info Cards (Below Video) */}
        <div className="flex flex-col gap-6 mt-8 px-2">
          <InfoCard
            iconSrc="/images/icons/flash.svg"
            title="Full-Suite Services"
            description="System integration, software development, professional services, and hardware deployment—all under one roof."
          />
          <InfoCard
            iconSrc="/images/icons/shield-tick.svg"
            title="Industry Expertise"
            description="Trusted by government, finance, telecom, energy, maritime, healthcare, and more across the Philippines."
          />
          <InfoCard
            iconSrc="/images/icons/profile-2user.svg"
            title="Client-First Approach"
            description="We understand your business deeply, delivering solutions from your perspective and your customers' needs."
          />
        </div>
      </div>

      {/* Est Section */}
      <Est />
    </div>
  );
}

const Word = ({
  children,
  progress,
  range,
  index,
  isTarget = false,
  highlightRange = [0.8, 0.9],
  isItalic = false,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  index: number;
  isTarget?: boolean;
  highlightRange?: [number, number];
  isItalic?: boolean;
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const color = useTransform(progress, highlightRange, ["#24221B", "#F2D04E"]);
  const badgeOpacity = useTransform(progress, highlightRange, [0, 1]);

  return (
    <span
      className={cn("relative mx-[0.15em] inline-block", isItalic && "italic")}
    >
      <motion.span
        style={{
          opacity,
          color: isTarget ? color : "#24221B",
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.1,
        }}
        className="relative"
      >
        {children}
        {isTarget && (
          <motion.span
            style={{ opacity: badgeOpacity }}
            className="absolute -right-3 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#F2D04E] text-[10px] font-bold text-[#24221B]"
          >
            1
          </motion.span>
        )}
      </motion.span>
    </span>
  );
};

const InfoCard = ({
  iconSrc,
  title,
  description,
}: {
  iconSrc: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start gap-4 lg:flex-col lg:max-w-[220px]">
      <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 lg:w-auto lg:h-auto">
        <Image
          src={iconSrc}
          alt={title}
          width={56}
          height={56}
          className="h-14 w-14 lg:h-10 lg:w-10 object-contain [filter:brightness(0)_saturate(100%)] lg:[filter:none]"
          priority
        />
      </div>
      <div className="text-left flex-1">
        <h4 className="font-heading text-lg font-bold text-[#24221B] lg:text-white mb-2 lg:text-base">
          {title}
        </h4>
        <p className="text-sm text-[#24221B]/70 lg:text-white/90 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
