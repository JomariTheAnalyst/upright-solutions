"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";

const ROTATING_WORDS = ["BUILD", "CONNECT", "INNOVATE", "EVOLVE", "DELIVER"];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full bg-[#fafafa] overflow-hidden">
      {/* SVG Clip Path Definition */}
      <svg className="absolute h-0 w-0">
        <defs>
          {/* Desktop clip path - reduced right spacing */}
          <clipPath id="heroClipDesktop" clipPathUnits="objectBoundingBox">
            <path
              d="
              M 0.15 0.006
              Q 0.15 0, 0.156 0
              L 0.994 0
              Q 1 0, 1 0.008
              L 1 0.992
              Q 1 1, 0.994 1
              L 0.006 1
              Q 0 1, 0 0.992
              L 0 0.14
              C 0 0.11, 0.008 0.095, 0.018 0.095
              L 0.13 0.095
              C 0.143 0.095, 0.15 0.075, 0.15 0.05
              L 0.15 0.006
              Z
            "
            />
          </clipPath>
          {/* Mobile/Tablet clip path - vertical reel style with logo cutout */}
          <clipPath id="heroClipMobileReel" clipPathUnits="objectBoundingBox">
            <path
              d="
              M 0.42 0.004
              Q 0.42 0, 0.43 0
              L 0.99 0
              Q 1 0, 1 0.006
              L 1 0.994
              Q 1 1, 0.99 1
              L 0.01 1
              Q 0 1, 0 0.994
              L 0 0.055
              C 0 0.045, 0.015 0.038, 0.035 0.038
              L 0.385 0.038
              C 0.408 0.038, 0.42 0.028, 0.42 0.018
              L 0.42 0.004
              Z
            "
            />
          </clipPath>
        </defs>
      </svg>

      {/* Logo - positioned in the white cutout area */}
      <div className="absolute top-4 left-4 z-30 sm:top-6 sm:left-6 lg:top-10 lg:left-12">
        <Link href="/" className="block">
          <Image
            src="/images/logo/Upright Logo2.png"
            alt="Upright Solutions"
            width={200}
            height={60}
            className="h-8 w-auto object-contain sm:h-10 lg:h-14"
            priority
          />
        </Link>
      </div>

      {/* Video container with SVG clip-path mask */}
      <div className="hero-clip-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/home/uprightsamplevideo.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay - stronger on mobile for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:from-black/30 lg:via-transparent" />
      </div>

      <Navbar />

      {/* Mobile/Tablet Layout - Bottom Content Container */}
      <div className="absolute inset-x-0 bottom-0 z-20 p-4 pb-8 sm:p-6 sm:pb-10 lg:hidden">
        <div className="relative flex min-h-[200px] flex-col justify-end sm:min-h-[240px]">
          {/* Description Text - Bottom Left */}
          <div className="absolute bottom-0 left-0 max-w-[55%] sm:max-w-[50%]">
            <p className="font-mono text-xs leading-relaxed text-white/90 sm:text-sm">
              Delivering innovative solutions worldwide to shape vibrant brand
              stories.
            </p>
          </div>

          {/* Animated Heading - Bottom Right */}
          <div className="absolute bottom-20 right-0 text-right">
            <h1 className="font-outline text-[2.5rem] font-extrabold uppercase leading-[0.9] tracking-tight text-brand-yellow sm:text-5xl md:text-6xl">
              <span className="block">WE ARE</span>
              <span className="block">MEANT TO</span>
              {/* Animated word container */}
              <span className="relative block h-[1em] w-full overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={index}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="absolute right-0 top-0 block whitespace-nowrap"
                  >
                    {ROTATING_WORDS[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Separate positioned elements */}
      {/* Bottom Left - Tagline Text Block (Desktop only) */}
      <div className="absolute bottom-16 left-12 z-20 hidden lg:block">
        <p className="max-w-md font-mono text-base leading-relaxed text-white/90">
          Delivering innovative solutions worldwide to
          <br />
          build transformative digital experiences.
        </p>
      </div>

      {/* Bottom Right - Animated Tagline (Desktop only) */}
      <div className="absolute bottom-16 right-12 z-20 hidden lg:block">
        <div className="text-right">
          <h1 className="font-outline text-7xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-yellow xl:text-8xl">
            <span className="block">WE ARE</span>
            <span className="block">MEANT TO</span>
            {/* Animated word container */}
            <span className="relative block h-[1em] w-full overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={index}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="absolute right-0 top-0 block whitespace-nowrap"
                >
                  {ROTATING_WORDS[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </div>
      </div>

      {/* Responsive clip-path styles */}
      <style jsx>{`
        .hero-clip-container {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          bottom: 12px;
          border-radius: 16px;
          overflow: hidden;
          clip-path: url(#heroClipMobileReel);
        }

        @media (min-width: 640px) {
          .hero-clip-container {
            top: 16px;
            left: 16px;
            right: 16px;
            bottom: 16px;
            border-radius: 20px;
          }
        }

        @media (min-width: 1024px) {
          .hero-clip-container {
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border-radius: 12px;
            clip-path: url(#heroClipDesktop);
          }
        }
      `}</style>
    </section>
  );
}
