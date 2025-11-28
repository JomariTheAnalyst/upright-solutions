"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Software Development",
    description:
      "Custom applications tailored to your business workflows and goals",
    image: "/images/home/Laptop with Code in Serene Cityscape.png",
  },
  {
    id: "02",
    title: "Hardware Services",
    description: "Complete IT infrastructure setup, maintenance, and support",
    image: "/images/home/Tranquil Tech-nature Workspace.png",
  },
  {
    id: "03",
    title: "Professional Services",
    description:
      "Strategic consulting and expert guidance for digital transformation",
    image: "/images/home/Screenshot 2025-11-26 123037.png",
  },
];

export function Services() {
  return (
    <section className="relative w-full bg-[#fafafa] py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Outline Text - Enlarged and positioned for overlap */}
      <div className="absolute top-0 left-0 w-full select-none pointer-events-none opacity-100 z-0">
        <h1
          className="text-[15vw] font-bold leading-[1.5] text-transparent font-heading tracking-tighter text-left pl-[8vw]"
          style={{
            WebkitTextStroke: "3px rgba(36, 34, 27, 0.1)",
            color: "transparent",
          }}
        >
          SERVICES
        </h1>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Header Section */}
        <div className="relative mb-20 md:mb-32">
          {/* Main Content - Overlapping the lower portion of SERVICES */}
          <div className="relative pt-[12vw] sm:pt-[10vw] md:pt-[9vw] lg:pt-[8vw]">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
              {/* Left Column: Headline + Description */}
              <div className="max-w-2xl space-y-6">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#24221B] leading-[0.9] font-heading uppercase tracking-tight">
                  With you every step of the way
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-[#24221B]/70 font-body leading-relaxed max-w-lg">
                  We build more than just buildings — we build strong, lasting
                  partnerships. From planning to completion, our skilled teams,
                  in-house production, and specialized equipment keep your
                  project moving forward.
                </p>
              </div>

              {/* Right Column: Decorative Arrow - Positioned under the last 'S' */}
              <div className="flex justify-end items-end pb-4 pr-[10vw] sm:pr-[20vw] lg:pr-[32vw] mt-8 lg:mt-0">
                <svg
                  width="150"
                  height="200"
                  viewBox="0 0 150 200"
                  fill="none"
                  className="text-[#F2D04E] transform rotate-[-10deg] scale-75 sm:scale-100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Curved arrow path */}
                  <path
                    d="M 40 10 Q 80 60, 60 120 Q 55 135, 45 145"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Arrow head */}
                  <path
                    d="M 45 160 L 35 140 M 45 160 L 60 145"
                    stroke="currentColor"
                    strokeWidth="9"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Services Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={cn(
                "relative group perspective-1000",
                // Base rotation for the whole stack
                index % 2 === 0 ? "rotate-1" : "-rotate-1"
              )}
            >
              {/* Yellow Background Card - Appears/Shifts on Hover */}
              <div 
                className={cn(
                  "absolute inset-0 bg-[#F2D04E] border-2 border-[#24221B] transition-transform duration-500 ease-out origin-center",
                  "scale-[0.98] rotate-0 opacity-0 group-hover:opacity-100",
                  index % 2 === 0 
                    ? "group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2" 
                    : "group-hover:-rotate-3 group-hover:-translate-x-2 group-hover:translate-y-2"
                )} 
              />

              {/* Main Card */}
              <div 
                className="relative h-full bg-white border-2 border-[#24221B] transition-transform duration-500 ease-out group-hover:-translate-y-2"
              >
                {/* Image Container - Full Width, No Margins */}
                <div className="relative h-72 sm:h-80 md:h-96 w-full overflow-hidden border-b-2 border-[#24221B]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col h-auto">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#24221B] mb-4 uppercase font-heading leading-[0.9]">
                    {service.title}
                  </h3>
                  <p className="text-[#24221B]/70 mb-8 font-body text-lg md:text-xl leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mt-auto flex justify-end">
                    <ArrowRight 
                      className="w-12 h-12 text-[#24221B] transform transition-transform duration-300 group-hover:translate-x-2" 
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
