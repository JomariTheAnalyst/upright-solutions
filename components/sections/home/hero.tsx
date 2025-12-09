"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";

const ROTATING_WORDS = [
  "BUILD",
  "INTEGRATE",
  "INNOVATE",
  "TRANSFORM",
  "DELIVER",
];

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
    <section className="relative h-screen w-full bg-[#fafafa] p-3 sm:p-4 lg:p-5">
      {/* Main container with rounded corners */}
      <div className="relative h-full w-full overflow-hidden" style={{ borderRadius: "24px" }}>
        {/* Background Video */}
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

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/5" />

        {/* Top Left Logo Container */}
        <div className="absolute top-0 left-0 z-20">
          <div
            className="bg-[#fafafa] px-6 py-4 lg:px-8 lg:py-6"
            style={{
              borderTopLeftRadius: "24px",
              borderBottomRightRadius: "48px",
            }}
          >
            <Link href="/" className="block">
              <Image
                src="/images/logo/Upright Logo2.png"
                alt="Upright Solutions"
                width={160}
                height={50}
                className="h-8 w-auto object-contain sm:h-10 lg:h-12"
                priority
              />
            </Link>
          </div>
        </div>

        <Navbar />

        {/* Bottom Right - Animated Tagline */}
        <div className="absolute bottom-8 right-4 z-20 sm:bottom-12 sm:right-8 lg:bottom-16 lg:right-12">
          <div className="text-right">
            <h1 className="font-outline text-4xl font-extrabold uppercase leading-[0.9] tracking-tight text-brand-yellow sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              <span className="block">WE ARE</span>
              <span className="block">MEANT TO</span>
              {/* Animated word container */}
              <span className="relative block h-[1.1em] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={index}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-start justify-end"
                  >
                    {ROTATING_WORDS[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
