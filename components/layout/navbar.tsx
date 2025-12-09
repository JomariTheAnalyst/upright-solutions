"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
    { label: "About us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact us", href: "/contact" },
];

const SOCIAL_LINKS = [
    { label: "Facebook", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Linkedin", href: "#" },
];

export function Navbar() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="fixed top-0 right-0 z-50 p-4 sm:p-6 lg:p-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative overflow-hidden bg-[#f2d04e] text-brand-dark"
                initial={false}
                animate={{
                    width: isHovered ? "400px" : "100px",
                    height: isHovered ? "500px" : "40px",
                    borderRadius: "12px", // Adjust radius as needed
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ originX: 1, originY: 0 }}
            >
                {/* Initial Menu Button State */}
                <motion.div
                    className="absolute top-0 right-0 flex h-10 w-full items-center justify-end px-4"
                    animate={{ opacity: isHovered ? 0 : 1 }}
                >
                    <span className="font-heading text-sm font-bold tracking-wide">MENU</span>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="flex h-full flex-col justify-between p-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <div className="flex flex-col items-end gap-0 pt-10">
                                <span className="mb-4 text-xs font-bold tracking-wide opacity-60">MENU</span>
                                {MENU_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="font-roslindale text-5xl font-bold uppercase leading-tight transition-colors hover:text-white sm:text-6xl"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="flex flex-col items-end gap-1">
                                {SOCIAL_LINKS.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="group relative text-sm font-medium transition-colors hover:text-white"
                                    >
                                        {link.label}
                                        <span className="absolute -bottom-1 right-0 h-[1px] w-0 bg-white transition-all duration-300 ease-out group-hover:w-full" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
