"use client";

import { useState } from "react";
import { FullscreenMenu } from "./fullscreen-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Menu Toggle Button */}
      <div className="fixed top-4 right-4 z-[90] sm:top-6 sm:right-6 lg:top-8 lg:right-8">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="group flex h-10 items-center gap-2 rounded-full bg-[#f2d04e] px-4 text-brand-dark transition-all hover:bg-[#e5c344] sm:h-12 sm:px-5"
          aria-label="Open menu"
        >
          {/* Hamburger Icon */}
          <div className="flex flex-col gap-1">
            <span className="block h-0.5 w-4 bg-current transition-transform group-hover:translate-x-0.5" />
            <span className="block h-0.5 w-3 bg-current transition-all group-hover:w-4 group-hover:translate-x-0.5" />
          </div>
          <span className="font-heading text-xs font-bold tracking-wide sm:text-sm">
            MENU
          </span>
        </button>
      </div>

      {/* Fullscreen Menu */}
      <FullscreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}
