"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    category: "GOVERNMENT",
    title: "DEPARTMENT OF EDUCATION - REGIONAL OFFICE SYSTEM",
    productsUsed: ["System Integration", "Network Infrastructure"],
    year: "2024",
    image: "/images/home/projects/government-system.png",
  },
  {
    id: 2,
    category: "MARITIME",
    title: "PORT MANAGEMENT & VESSEL TRACKING SYSTEM",
    productsUsed: ["Software Development", "Hardware Services"],
    year: "2024",
    image: "/images/home/projects/logistic-system.png",
  },
  {
    id: 3,
    category: "LOGISTICS",
    title: "WAREHOUSE INVENTORY & FLEET MANAGEMENT",
    productsUsed: ["Custom Software", "System Integration"],
    year: "2023",
    image: "/images/home/projects/inventory-management.png",
  },
  {
    id: 4,
    category: "HEALTHCARE",
    title: "HOSPITAL INFORMATION MANAGEMENT SYSTEM",
    productsUsed: ["Database Management", "Professional Services"],
    year: "2023",
    image: "/images/home/projects/healthcare-management-system.png",
  },
];

export function Projects() {
  return (
    <section className="relative w-full bg-[#ffffff] py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Outline Text */}
      <div className="absolute top-8 md:top-12 lg:top-16 left-20 w-full select-none pointer-events-none z-0">
        <h1
          className="text-[15vw] md:text-[14vw] lg:text-[13vw] pt-8 font-bold leading-[1] text-transparent font-heading tracking-tighter text-left pl-4 md:pl-6 lg:pl-[4vw]"
          style={{
            WebkitTextStroke: "2px rgba(36, 34, 27, 0.15)",
            color: "transparent",
          }}
        >
          PROJECTS
        </h1>
      </div>

      <div className="w-full px-3 md:px-4 lg:px-6 relative z-10">
        {/* Header Section */}
        <div className="relative pt-[12vw] sm:pt-[10vw] md:pt-[9vw] lg:pt-[8vw] text-left left-29  mb-12 md:mb-16 lg:mb-20 max-w-[1800px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12">
            {/* Left: Heading + Description */}
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#24221B] leading-[1.1] font-heading uppercase tracking-tight max-w-[600px] lg:max-w-[1000px]">
                Large-Scale Projects Across Industries
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#24221B]/70 font-body leading-relaxed max-w-2xl">
                Wherever your projects come to life, we're right there with you.
                From major infrastructure to custom builds, our IT expertise
                adapts to every scale and ambition.
              </p>
            </div>

            {/* Right: See All Projects Button - Adjusted alignment */}
            <div className="flex-shrink-0 lg:mr-10">
              <button className="group flex items-center border-2 border-[#24221B] bg-transparent hover:bg-[#24221B] transition-all duration-300">
                <span className="px-5 md:px-7 py-3 md:py-4 text-sm md:text-base lg:text-lg font-bold text-[#24221B] group-hover:text-white uppercase tracking-wide">
                  See All Projects
                </span>
                <div className="h-full border-l-2 border-[#24221B] group-hover:border-white px-4 md:px-5 py-3 md:py-4 flex items-center">
                  <ArrowRight
                    className="w-5 h-5 md:w-6 md:h-6 text-[#24221B] group-hover:text-white transition-transform group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Project Cards List - Compact & Hover Effects */}
        <div className="border border-[#24221B] max-w-[1800px] mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group hover:bg-[#f8f8f6] hover:shadow-lg hover:z-10 relative transition-all duration-300 cursor-pointer ${
                index !== projects.length - 1 ? "border-b border-[#24221B]" : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] xl:grid-cols-[450px_1fr] 2xl:grid-cols-[500px_1fr]">
                {/* Image with border - Reduced height */}
                <div className="relative h-56 sm:h-64 md:h-72 lg:h-full min-h-[220px] lg:min-h-[280px] overflow-hidden border-b lg:border-b-0 lg:border-r border-[#24221B]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content Panel - Compact */}
                <div className="bg-[#f5f5f3] group-hover:bg-[#f8f8f6] p-5 md:p-8 lg:p-10 flex flex-col justify-center relative transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 lg:mb-5">
                    {/* Category */}
                    <span className="text-xs md:text-sm lg:text-base font-semibold text-[#24221B]/50 uppercase tracking-widest">
                      {project.category}
                    </span>

                    {/* Year Badge */}
                    <span className="self-start sm:self-auto px-4 py-1.5 border-2 border-[#24221B]/20 rounded-full text-xs md:text-sm lg:text-base font-semibold text-[#24221B]">
                      {project.year}
                    </span>
                  </div>

                  {/* Project Title - Compact */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0066a1] font-heading uppercase tracking-tight mb-6 lg:mb-8 leading-[1.05] group-hover:text-[#004d7a] transition-colors pr-16 lg:pr-24">
                    {project.title}
                  </h3>

                  {/* Products Used - Compact Pills */}
                  <div className="mb-4 lg:mb-6">
                    <span className="text-xs md:text-sm lg:text-base font-semibold text-[#24221B]/50 uppercase tracking-widest mb-3 block">
                      Products Used:
                    </span>
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.productsUsed.map((product, idx) => (
                        <span
                          key={idx}
                          className="px-4 md:px-5 py-2 md:py-2.5 border-2 border-[#0066a1]/30 rounded-full text-xs md:text-sm lg:text-base text-[#0066a1] font-semibold hover:bg-[#0066a1]/5 transition-colors"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow Icon - Shifted Left */}
                  <div className="absolute right-8 md:right-12 lg:right-16 bottom-8 md:bottom-12 lg:bottom-14">
                    <ArrowRight
                      className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-[#24221B] transition-transform group-hover:translate-x-2"
                      strokeWidth={2}
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
