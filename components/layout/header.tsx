"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full px-6 py-6 transition-all duration-300 pointer-events-none">
      <div className="flex w-full items-start justify-between">
        {/* Logo - matches hero section style */}
        <Link href="/" className="relative z-10 flex items-center pointer-events-auto">
          <div className="rounded-lg bg-white/95 p-3 shadow-md backdrop-blur-sm">
            <Image
              src="/images/logo/Upright Logo2.png"
              alt="Upright Solutions"
              width={140}
              height={40}
              className="h-8 w-auto object-contain"
              priority
              quality={100}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 rounded-2xl bg-[#E4DFD8]/90 px-3 py-2 backdrop-blur-md lg:flex shadow-sm pointer-events-auto">
          <nav className="flex items-center px-2">
            {siteConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-2 text-sm font-medium text-brand-dark transition-colors hover:text-brand-blue"
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <Button className="rounded-xl bg-brand-yellow px-6 font-bold text-brand-dark hover:bg-brand-yellow/90">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden rounded-xl bg-[#E4DFD8]/90 p-2 backdrop-blur-md pointer-events-auto">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-brand-dark transition-colors hover:text-brand-blue"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#E4DFD8] transition-all duration-500 lg:hidden pointer-events-auto",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
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
            className="mt-4 w-full max-w-xs rounded-full bg-brand-yellow text-brand-dark font-bold hover:bg-brand-yellow/90 animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            Get Started
          </Button>
        </Container>
      </div>
    </header>
  );
}
