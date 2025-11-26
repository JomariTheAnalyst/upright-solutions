"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { Zap, Shield, Users } from "lucide-react";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1: Text reveal (0.0 - 0.4)
  const opacity1 = useTransform(scrollYProgress, [0.35, 0.4], [1, 0]);
  const pointerEvents1 = useTransform(scrollYProgress, (v) =>
    v > 0.4 ? "none" : "auto"
  );

  // Phase 2: Text reveal (0.4 - 0.7) - Extended to show fully
  const opacity2 = useTransform(
    scrollYProgress,
    [0.4, 0.45, 0.65, 0.7],
    [0, 1, 1, 0]
  );
  const pointerEvents2 = useTransform(scrollYProgress, (v) =>
    v < 0.4 || v > 0.7 ? "none" : "auto"
  );

  // Phase 3: Video reveal (0.75 - 0.95) - Starts after text is fully gone
  const videoX = useTransform(scrollYProgress, [0.75, 0.95], ["100%", "0%"]);
  const videoOpacity = useTransform(scrollYProgress, [0.75, 0.78], [0, 1]);

  const line1_1 = "We refuse to accept a future where technology";
  const line1_2 = "complicates rather than simplifies your business.";

  const line2_1 = "Introducing Upright — technology that feels";
  const line2_2 = "clearer, calmer, and built for people.";

  const words1_1 = line1_1.split(" ");
  const words1_2 = line1_2.split(" ");
  const totalWords1 = words1_1.length + words1_2.length;

  const words2_1 = line2_1.split(" ");
  const words2_2 = line2_2.split(" ");
  const totalWords2 = words2_1.length + words2_2.length;

  return (
    <section ref={containerRef} className="relative h-[600vh]">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#fafafa]">
        {/* Text Block 1 */}
        <motion.div
          style={{ opacity: opacity1, pointerEvents: pointerEvents1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex w-full max-w-[95vw] flex-col items-center justify-center px-4 text-center">
            <h2 className="flex w-full flex-col items-center justify-center font-serif text-3xl font-medium leading-tight tracking-tight text-[#24221B] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <div className="flex w-full justify-center whitespace-nowrap">
                {words1_1.map((word, i) => {
                  const start = (i / totalWords1) * 0.35;
                  const end = start + (1 / totalWords1) * 0.35;
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
              <div className="flex w-full justify-center whitespace-nowrap">
                {words1_2.map((word, i) => {
                  const globalIndex = words1_1.length + i;
                  const start = (globalIndex / totalWords1) * 0.35;
                  const end = start + (1 / totalWords1) * 0.35;
                  const isTarget = i === words1_2.length - 1;
                  return (
                    <Word
                      key={`1-l2-${i}`}
                      progress={scrollYProgress}
                      range={[start, end]}
                      index={globalIndex}
                      isTarget={isTarget}
                      highlightRange={[0.4, 0.45]}
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
            <h2 className="flex w-full flex-col items-center justify-center font-serif text-3xl font-medium leading-tight tracking-tight text-[#24221B] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              <div className="flex w-full justify-center whitespace-nowrap">
                {words2_1.map((word, i) => {
                  const start = 0.5 + (i / totalWords2) * 0.15;
                  const end = start + (1 / totalWords2) * 0.15;
                  const isItalic = word === "Upright";
                  return (
                    <Word
                      key={`2-l1-${i}`}
                      progress={scrollYProgress}
                      range={[start, end]}
                      index={i}
                      isItalic={isItalic}
                    >
                      {word}
                    </Word>
                  );
                })}
              </div>
              <div className="flex w-full justify-center whitespace-nowrap">
                {words2_2.map((word, i) => {
                  const globalIndex = words2_1.length + i;
                  const start = 0.5 + (globalIndex / totalWords2) * 0.15;
                  const end = start + (1 / totalWords2) * 0.15;
                  return (
                    <Word
                      key={`2-l2-${i}`}
                      progress={scrollYProgress}
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

        {/* Video Reveal Section */}
        <motion.div
          style={{ x: videoX, opacity: videoOpacity }}
          className="absolute inset-0 flex items-center justify-center px-6 lg:px-12"
        >
          <div className="relative w-full max-w-7xl">
            {/* Video Container */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-2xl">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Main Headline - Left Side */}
              <div className="absolute bottom-8 left-8 max-w-md lg:bottom-12 lg:left-12">
                <h3 className="mb-2 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  The world's first
                  <br />
                  <span className="italic">enterprise-ready</span> IT solution
                </h3>
              </div>

              {/* Info Cards - Bottom Right */}
              <div className="absolute bottom-8 right-8 flex gap-6 lg:bottom-12 lg:right-12">
                <InfoCard
                  icon={<Zap className="h-5 w-5" />}
                  title="Lightning Fast"
                  description="Deploy in minutes, not months"
                />
                <InfoCard
                  icon={<Shield className="h-5 w-5" />}
                  title="Secure by Design"
                  description="Enterprise-grade security built-in"
                />
                <InfoCard
                  icon={<Users className="h-5 w-5" />}
                  title="Team Focused"
                  description="Built for collaboration"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
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
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-white/10 p-4 text-center backdrop-blur-md transition-all hover:bg-white/20">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow text-brand-dark">
        {icon}
      </div>
      <div>
        <h4 className="font-heading text-sm font-bold text-white">{title}</h4>
        <p className="text-xs text-white/80">{description}</p>
      </div>
    </div>
  );
};
