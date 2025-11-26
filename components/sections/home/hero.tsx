"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, X } from "lucide-react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration
const FRAME_COUNT = 101;
const INITIAL_LOAD_COUNT = 20; // Frames to load immediately
const FRAME_PATH = "/images/upright-imagesec/ezgif-frame-";

// Generate frame paths
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Set canvas size for high DPI displays
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

    // Initial render with a slight delay to ensure DOM is ready
    setTimeout(() => {
      if (imagesRef.current[1]) {
        renderFrame(1);
      }
    }, 100);

    // Render frame to canvas with cover behavior
    const renderFrame = (frameIndex: number) => {
      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || !img.naturalWidth) return;

      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Calculate cover dimensions
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

    // Preload images with priority strategy
    const preloadImages = async () => {
      const images: HTMLImageElement[] = new Array(FRAME_COUNT + 1);
      imagesRef.current = images;

      // Load first batch immediately (high priority)
      const loadImage = (index: number): Promise<void> => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            images[index] = img;
            // Render first frame immediately
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

      // Load initial frames for instant playback
      const initialPromises: Promise<void>[] = [];
      for (let i = 1; i <= INITIAL_LOAD_COUNT; i++) {
        initialPromises.push(loadImage(i));
      }
      await Promise.all(initialPromises);

      // Load remaining frames in background (low priority)
      const loadRemainingFrames = async () => {
        for (let i = INITIAL_LOAD_COUNT + 1; i <= FRAME_COUNT; i++) {
          await loadImage(i);
          // Small delay to prevent blocking main thread
          await new Promise((r) => setTimeout(r, 10));
        }
      };

      // Use requestIdleCallback if available, otherwise setTimeout
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => loadRemainingFrames());
      } else {
        setTimeout(loadRemainingFrames, 100);
      }
    };

    preloadImages();

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      renderFrame(frameIndexRef.current.value);
    };

    window.addEventListener("resize", handleResize);

    // Setup GSAP ScrollTrigger
    const setupScrollTrigger = () => {
      // Kill any existing ScrollTriggers on this container first
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill(true);
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300%", // 3x viewport height for smooth scrubbing
          pin: true,
          scrub: 0.5, // Smooth scrubbing
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

      return tl;
    };

    // Wait for initial frames before setting up scroll
    const checkReady = setInterval(() => {
      if (imagesRef.current[1]?.complete) {
        clearInterval(checkReady);
        setupScrollTrigger();
      }
    }, 50);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(checkReady);

      // Clean up ScrollTrigger instances properly
      const triggers = ScrollTrigger.getAll();
      triggers.forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill(true);
        }
      });
    };
  }, [isReady]);

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

  // Handle ESC key to close video
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

  return (
    <section
      ref={containerRef}
      data-hero-section
      className="relative h-screen w-full overflow-hidden bg-brand-dark"
    >
      {/* Canvas for image sequence */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{ display: "block" }}
      />

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10">
        <div className="mx-auto h-full max-w-7xl px-6 lg:px-8">
          <div className="relative flex h-full flex-col justify-between py-24">
            {/* Main Headline - Top */}
            <div className="max-w-xl pt-8">
              <h1 className="mb-6 font-heading text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="italic">The future,</span>
                <br />
                <span className="text-brand-yellow">integrated</span>
              </h1>
              <p className="max-w-md font-body text-lg text-white leading-relaxed">
                Meet Upright Solutions. A new kind of IT partner, designed for
                operational excellence and growth.
              </p>
            </div>

            {/* Video Thumbnail Card - Bottom Right */}
            <div className="absolute bottom-8 right-[-2rem] sm:right-[-1rem] lg:right-0">
              <div
                onClick={handleVideoClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="group relative w-56 cursor-pointer overflow-hidden rounded-xl border-2 border-brand-yellow/50 bg-black/30 backdrop-blur-sm transition-all hover:border-brand-yellow hover:shadow-xl hover:shadow-brand-yellow/30 sm:w-64 lg:w-72"
              >
                <div className="relative aspect-video">
                  {/* Thumbnail Image */}
                  {!isHovering && (
                    <Image
                      src="/images/home/Screenshot 2025-11-26 123037.png"
                      alt="Watch video"
                      fill
                      className="object-cover"
                    />
                  )}

                  {/* Thumbnail Video (plays on hover) */}
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

                  {/* Play Button - only show when not hovering */}
                  {!isHovering && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow text-brand-dark transition-transform group-hover:scale-110 shadow-lg">
                        <Play className="h-7 w-7 fill-current ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
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

      {/* Gradient overlays for text readability */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-brand-dark/70 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-brand-dark/30 via-transparent to-brand-dark/20" />
    </section>
  );
}
