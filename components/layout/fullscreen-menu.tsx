"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

interface FullscreenMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MAIN_MENU = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "SERVICES", href: "/services" },
];

const SUB_MENU = [
  { label: "FAQs", href: "/faqs" },
  { label: "Blogs or News", href: "/blog" },
  { label: "Contacts", href: "/contact" },
];

const SOCIALS = [
  { name: "Facebook", icon: "/images/logo/facebook.svg", href: "#" },
  { name: "Instagram", icon: "/images/logo/instagram.svg", href: "#" },
  {
    name: "LinkedIn",
    icon: "/images/logo/linkedin.svg",
    href: "https://www.linkedin.com/company/upright-solutions-and-systems-consultancy-corp/",
  },
  { name: "TikTok", icon: "/images/logo/tiktok-logo-2-3.svg", href: "#" },
  { name: "Twitter", icon: "/images/logo/twitter.svg", href: "#" },
];

export function FullscreenMenu({ isOpen, onClose }: FullscreenMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Smooth slide transition
  const slideTransition = {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const, // Custom cubic-bezier for ultra-smooth feel
  };

  const menuItemTransition = {
    duration: 0.5,
    ease: [0.33, 1, 0.68, 1] as const,
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={slideTransition}
          className="fixed inset-0 z-[100] flex flex-col bg-[#050511] text-white overflow-y-auto overflow-x-hidden"
        >
          {/* Header: Language & Close Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex items-center justify-between px-6 py-6 sm:px-12 sm:py-8"
          >
            <div className="flex gap-4 text-sm font-medium text-gray-400">
              <span className="text-white cursor-pointer hover:text-brand-yellow transition-colors">
                EN
              </span>
              <span className="cursor-pointer hover:text-white transition-colors">
                IT
              </span>
              <span className="cursor-pointer hover:text-white transition-colors">
                FR
              </span>
            </div>
            {/* Larger Close Button */}
            <button
              onClick={onClose}
              className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 transition-all duration-300 hover:bg-white/10 hover:border-white/40 sm:h-16 sm:w-16"
              aria-label="Close menu"
            >
              <X className="h-7 w-7 text-white transition-transform duration-500 group-hover:rotate-180 sm:h-8 sm:w-8" />
            </button>
          </motion.div>

          <div className="flex flex-1 flex-col lg:flex-row">
            {/* Left Column (Desktop: Cards, Mobile: Bottom) */}
            <div className="order-2 flex flex-col justify-end gap-4 px-6 pb-8 pt-4 lg:order-1 lg:w-[30%] lg:px-12 lg:pb-12 lg:pt-0">
              {/* Latest News Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...menuItemTransition, delay: 0.5 }}
                className="group relative overflow-hidden rounded-xl bg-[#0f0f1b] p-4 transition-colors hover:bg-[#1a1a2e]"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Latest News
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-brand-blue/20" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-heading text-sm font-bold leading-tight text-white group-hover:text-brand-yellow transition-colors">
                      LEC – Why resist?
                    </h3>
                  </div>
                  <div className="ml-auto flex items-center self-center">
                    <ArrowUpRight className="h-5 w-5 text-gray-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Instagram Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...menuItemTransition, delay: 0.6 }}
                className="group relative overflow-hidden rounded-xl bg-[#0f0f1b] p-4 transition-colors hover:bg-[#1a1a2e]"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Image
                    src="/images/logo/instagram.svg"
                    alt="IG"
                    width={16}
                    height={16}
                    className="opacity-70 brightness-0 invert"
                  />
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Instagram
                  </span>
                </div>
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="font-heading text-sm font-bold leading-tight text-white group-hover:text-brand-yellow transition-colors">
                      New 2025 helmet. I'm sure it will be a fast one
                    </h3>
                  </div>
                  <div className="ml-auto flex items-center self-center">
                    <ArrowUpRight className="h-5 w-5 text-gray-500 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Navigation positioned right before center */}
            <div className="order-1 flex flex-1 flex-col px-6 lg:order-2 lg:items-start lg:justify-center lg:pl-[25%] lg:pr-[20%] lg:text-left">
              {/* Main Navigation */}
              <nav className="flex flex-col gap-1 lg:gap-0">
                {MAIN_MENU.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      ...menuItemTransition,
                      delay: 0.2 + idx * 0.08,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="group relative inline-block overflow-hidden"
                      onClick={onClose}
                    >
                      <span className="block font-roslindale text-[3rem] font-black uppercase leading-[0.95] tracking-tighter text-white transition-transform duration-500 group-hover:-translate-y-full sm:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                        {item.label}
                      </span>
                      <span className="absolute inset-0 block translate-y-full font-roslindale text-[3rem] font-black uppercase leading-[0.95] tracking-tighter text-brand-yellow transition-transform duration-500 group-hover:translate-y-0 sm:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem]">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Sub Navigation */}
              <div className="mt-8 flex flex-col gap-3 lg:mt-10 lg:flex-row lg:gap-8">
                {SUB_MENU.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      ...menuItemTransition,
                      delay: 0.5 + idx * 0.08,
                    }}
                  >
                    <Link
                      href={item.href}
                      className="text-base font-medium text-gray-400 hover:text-white transition-colors lg:text-lg"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="mt-8 flex gap-5 lg:mt-10">
                {SOCIALS.map((social, idx) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={
                      social.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      ...menuItemTransition,
                      delay: 0.7 + idx * 0.05,
                    }}
                    className="group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:bg-white/20 hover:scale-110"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={20}
                      height={20}
                      className="h-5 w-5 opacity-70 brightness-0 invert transition-opacity group-hover:opacity-100"
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
