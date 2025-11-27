"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 101;
const INITIAL_LOAD_COUNT = 20;
const FRAME_PATH = "/images/upright-imagesec/ezgif-frame-";

const getFramePath = (index: number): string => {
  const frameNumber = String(index).padStart(3, "0");
  return `${FRAME_PATH}${frameNumber}.png`;
};

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailVideoRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef({ value: 1 });
  const [isReady, setIsReady] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();

    setTimeout(() => {
      if (imagesRef.current[1]) {
        renderFrame(1);
      }
    }, 100);

    const renderFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || !img.naturalWidth) return;

      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = rect.width / rect.height;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (canvasRatio > imgRatio) {
        drawWidth = rect.width;
        drawHeight = rect.width / imgRatio;
        drawX = 0;
        drawY = (rect.height - drawHeight) / 2;
      } else {
        drawHeight = rect.height;
        drawWidth = rect.height * imgRatio;
        drawX = (rect.width - drawWidth) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    const preloadImages = async () => {
      const images: HTMLImageElement[] = new Array(FRAME_COUNT + 1);
      imagesRef.current = images;

      const loadImage = (index: number): Promise<void> => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            images[index] = img;
            if (index === 1 && !isReady) {
              renderFrame(1);
              setIsReady(true);
            }
            resolve();
          };
          img.onerror = () => resolve();
          img.src = getFramePath(index);
        });
      };

      const initialPromises: Promise<void>[] = [];
      for (let i = 1; i <= INITIAL_LOAD_COUNT; i++) {
        initialPromises.push(loadImage(i));
      }
      await Promise.all(initialPromises);

      const loadRemainingFrames = async () => {
        for (let i = INITIAL_LOAD_COUNT + 1; i <= FRAME_COUNT; i++) {
          await loadImage(i);
          await new Promise((r) => setTimeout(r, 10));
        }
      };

      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => loadRemainingFrames());
      } else {
        setTimeout(loadRemainingFrames, 100);
      }
    };

    preloadImages();

    const handleResize = () => {
      setCanvasSize();
      renderFrame(frameIndexRef.current.value);
    };

    window.addEventListener("resize", handleResize);

    const setupScrollTrigger = () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill(true);
        }
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const frameIndex = Math.min(
              Math.max(Math.round(progress * (FRAME_COUNT - 1)) + 1, 1),
              FRAME_COUNT
            );

            if (frameIndex !== frameIndexRef.current.value) {
              frameIndexRef.current.value = frameIndex;
              requestAnimationFrame(() => renderFrame(frameIndex));
            }
          },
        },
      });
    };

    const checkReady = setInterval(() => {
      if (imagesRef.current[1]?.complete) {
        clearInterval(checkReady);
        setupScrollTrigger();
      }
    }, 50);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(checkReady);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill(true);
        }
      });
    };
  }, [isReady]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVideoPlaying) {
        handleCloseVideo();
      }
    };

    if (isVideoPlaying) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVideoPlaying]);

  const handleVideoClick = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleCloseVideo = () => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (thumbnailVideoRef.current) {
      thumbnailVideoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (thumbnailVideoRef.current) {
      thumbnailVideoRef.current.pause();
      thumbnailVideoRef.current.currentTime = 0;
    }
  };

  return (
    <section
      ref={containerRef}
      data-hero-section
      className="relative h-screen overflow-hidden bg-[#fafafa] p-2 sm:p-4 lg:p-4"
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl bg-brand-dark">
        {isMobile ? (
          <Image
            src="/images/home/bg-mobile.png"
            alt="Upright Solutions"
            fill
            className="absolute inset-0 z-0 h-full w-full rounded-3xl object-cover"
            priority
            quality={90}
          />
        ) : (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 h-full w-full rounded-3xl object-cover"
            style={{ display: "block" }}
          />
        )}

        <div className="absolute inset-0 z-10 p-4 pt-20 pl-8 lg:p-12 lg:pt-30 lg:pl-40">
          <div className="flex h-full flex-col justify-between">
            <div className="max-w-xl">
              <h1 className="mb-4 font-heading text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl whitespace-nowrap">
                <span className="italic">The future, </span>
                <span className="italic text-brand-yellow">integrated</span>
              </h1>
              <p className="max-w-md font-body text-base text-white leading-relaxed lg:text-lg">
                Meet Upright Solutions. A new kind of IT partner, designed for
                operational excellence and growth.
              </p>
            </div>

            {/* Video Thumbnail Card - Bottom Left */}
            <div className="flex justify-start">
              <div
                onClick={handleVideoClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="group relative w-48 cursor-pointer overflow-hidden rounded-xl border-2 border-brand-yellow/50 bg-black/30 backdrop-blur-sm transition-all hover:border-brand-yellow hover:shadow-xl hover:shadow-brand-yellow/30 sm:w-56 lg:w-64"
              >
                <div className="relative aspect-video">
                  {!isHovering && (
                    <Image
                      src="/images/home/Screenshot 2025-11-26 123037.png"
                      alt="Watch video"
                      fill
                      className="object-cover"
                    />
                  )}

                  <video
                    ref={thumbnailVideoRef}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                      isHovering ? "opacity-100" : "opacity-0"
                    }`}
                    muted
                    loop
                    playsInline
                  >
                    <source
                      src="/videos/home/uprightsamplevideo.mp4"
                      type="video/mp4"
                    />
                  </video>

                  {!isHovering && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-yellow text-brand-dark transition-transform group-hover:scale-110 shadow-lg sm:h-14 sm:w-14">
                        <Play className="h-5 w-5 fill-current ml-0.5 sm:h-6 sm:w-6" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-[5] rounded-3xl bg-gradient-to-r from-brand-dark/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 z-[5] rounded-3xl bg-gradient-to-t from-brand-dark/30 via-transparent to-brand-dark/20" />
      </div>

      {isVideoPlaying && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={handleCloseVideo}
        >
          <button
            onClick={handleCloseVideo}
            className="absolute top-8 right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
            aria-label="Close video"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative w-full max-w-6xl px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              className="w-full rounded-lg shadow-2xl"
              controls
              autoPlay
            >
              <source
                src="/videos/home/uprightsamplevideo.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
