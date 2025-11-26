"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Header() {
  const [showBackground, setShowBackground] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Wait for hero section to be available
    const checkHero = setInterval(() => {
      const heroSection = document.querySelector("[data-hero-section]");
      if (heroSection) {
        clearInterval(checkHero);

        // Create ScrollTrigger that activates after hero section
        ScrollTrigger.create({
          trigger: heroSection,
          start: "bottom top", // When bottom of hero reaches top of viewport
          end: "bottom top",
          onEnter: () => setShowBackground(true),
          onLeaveBack: () => setShowBackground(false),
        });
      }
    }, 100);

    return () => {
      clearInterval(checkHero);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.vars.trigger === document.querySelector("[data-hero-section]")
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 z-50 w-full">
      {/* Background layer with transition */}
      <div
        className={cn(
          "absolute inset-0 transition-all duration-700",
          showBackground
            ? "bg-white/60 backdrop-blur-lg shadow-sm opacity-100"
            : "bg-transparent opacity-0"
        )}
      />

      {/* Content layer - always visible */}
      <Container className="relative flex h-20 items-center justify-between">
        {/* Logo Only */}
        <Link href="/" className="relative z-10 flex items-center">
          <Image
            src="/images/logo/Upright Logo2.png"
            alt="Upright Solutions"
            width={140}
            height={40}
            className="h-10 w-auto object-contain"
            priority
            quality={100}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 lg:flex">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-5 py-2 text-sm font-bold transition-colors group",
                showBackground
                  ? "text-brand-dark hover:text-brand-blue"
                  : "text-white hover:text-brand-yellow"
              )}
            >
              {item.title}
              <span
                className={cn(
                  "absolute bottom-0 left-1/2 h-0.5 w-0 transition-all duration-300 group-hover:left-4 group-hover:w-[calc(100%-2rem)]",
                  showBackground ? "bg-brand-blue" : "bg-brand-yellow"
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button className="hidden bg-brand-yellow text-brand-dark font-bold hover:bg-brand-yellow/90 hover:scale-105 transition-all duration-300 sm:flex">
            Get Started
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "relative z-10 p-2 lg:hidden transition-colors",
              showBackground ? "text-brand-dark" : "text-white"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white/98 backdrop-blur-md transition-all duration-500 lg:hidden",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <Container className="flex h-full flex-col items-center justify-center gap-8 pt-20">
          {siteConfig.mainNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "font-heading text-3xl font-bold text-brand-dark transition-all hover:text-brand-blue",
                isMobileMenuOpen && "animate-fade-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.title}
            </Link>
          ))}
          <Button
            className="mt-4 bg-brand-yellow text-brand-dark font-bold hover:bg-brand-yellow/90 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            Get Started
          </Button>
        </Container>
      </div>
    </header>
  );
}
