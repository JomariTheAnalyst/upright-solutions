"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Software Development",
    description: "Custom applications tailored to your business workflows and goals",
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
    description: "Strategic consulting and expert guidance for digital transformation",
    image: "/images/home/Screenshot 2025-11-26 123037.png",
  },
];

export function Services() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#fafafa] overflow-hidden px-8 py-12 lg:px-16 lg:py-16">
      <div className="relative w-full h-full max-w-[1920px] flex flex-col justify-between">
        
        {/* Top Section: Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden rounded-2xl mb-6 shadow-lg">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title and Description - Horizontal Layout */}
              <div className="flex items-start gap-6">
                {/* Title - Left */}
                <h3 className="font-heading text-base lg:text-lg font-bold text-[#24221B] whitespace-nowrap flex-shrink-0">
                  {service.title}
                </h3>

                {/* Description - Right */}
                <p className="font-body text-sm lg:text-base text-[#24221B]/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section: Large Headline + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-16 lg:mt-24">
          {/* Left: Large Headline */}
          <div>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#24221B] leading-[1.1]">
              Complete IT solutions for modern business
            </h2>
          </div>

          {/* Right: Description */}
          <div className="flex flex-col justify-end">
            <h4 className="font-heading text-base lg:text-lg font-bold text-[#24221B]/60 uppercase tracking-wider mb-4">
              Trusted by Industry Leaders
            </h4>
            <p className="font-body text-base lg:text-lg text-[#24221B]/80 leading-relaxed">
              We deliver end-to-end IT excellence across software development, hardware infrastructure, and strategic consulting. Our integrated approach ensures seamless solutions that drive real business value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
