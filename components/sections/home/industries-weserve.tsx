"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import ReactLenis from "lenis/react"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { VelocityScroll } from "@/components/ui/scroll-based-velocity"

const projects = [
  {
    title: "Government",
    category: "PUBLIC SECTOR",
    src: "/images/home/industries/government.png",
    tagline: "Empowering public service",
  },
  {
    title: "Maritime",
    category: "MARINE INDUSTRY",
    src: "/images/home/industries/maritime.png",
    tagline: "Navigating digital transformation",
  },
  {
    title: "Logistics",
    category: "SUPPLY CHAIN",
    src: "/images/home/industries/logistic.png",
    tagline: "Streamlining operations",
  },
  {
    title: "Healthcare",
    category: "MEDICAL SERVICES",
    src: "/images/home/industries/healthcare.png",
    tagline: "Advancing patient care",
  },
]

const StickyCard_001 = ({
  i,
  title,
  category,
  tagline,
  src,
  progress,
  range,
  targetScale,
}: {
  i: number
  title: string
  category: string
  tagline: string
  src: string
  progress: any
  range: [number, number]
  targetScale: number
}) => {
  const container = useRef<HTMLDivElement>(null)

  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="sticky top-0 h-screen flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5% + ${i * 25}px)`,
        }}
        className="relative flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl
                   w-[calc(100vw-80px)] h-[calc(100vh-80px)]
                   md:w-[calc(100vw-120px)] md:h-[calc(100vh-120px)]"
      >
        <div className="relative h-full w-full">
          <img src={src || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-16">
            
            {/* Top Center: Tagline (simulating the top text in reference) */}
            <div className="flex justify-center">
               {/* Placeholder for top center text if needed, currently empty in reference logic but can be tagline */}
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col gap-6 mt-auto">
              
              {/* Category Tag */}
              <div>
                <span className="inline-block bg-[#ff8ba7] text-black px-3 py-1 text-xs md:text-sm font-bold uppercase tracking-wider mb-4">
                  {category}
                </span>
              </div>

              {/* Title */}
              <h3 
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] tracking-tight max-w-4xl"
                style={{ fontFamily: 'var(--font-serif), "EB Garamond", serif' }}
              >
                {title}
              </h3>

              {/* Bottom Row: Badges & Button */}
              <div className="flex items-end justify-between mt-4">
                <div className="flex gap-3">
                  <span className="bg-[#a05a5a] text-white px-4 py-2 rounded-full text-sm font-medium uppercase">
                    2.5 Hours
                  </span>
                  <span className="bg-[#a05a5a] text-white px-4 py-2 rounded-full text-sm font-medium uppercase">
                    From 51 €
                  </span>
                </div>
                
                {/* Explore More button */}
                <div className="flex items-center gap-4">
                  <button className="bg-white text-black px-6 py-3 rounded-full font-medium text-sm md:text-base hover:bg-white/90 transition-colors">
                    Explore More
                  </button>
                  <button className="bg-[#ff8ba7] p-3 rounded-full hover:bg-[#ff8ba7]/90 transition-colors group">
                    <ArrowUpRight className="w-5 h-5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const ImagesScrollingAnimation = () => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <div className="bg-[#fafafa] py-20">
      {/* Velocity Scroll Header */}
      <VelocityScroll 
        text="Industries we serve" 
        default_velocity={5}
        className="text-7xl md:text-9xl lg:text-[12rem] font-bold text-black uppercase tracking-tight"
        style={{ fontFamily: 'var(--font-roslindale), serif' }}
        imageSrc="/images/home/ship.png"
      />
      
      <div className="mt-20">
        <ReactLenis root>
          <main
            ref={container}
            className="relative flex w-full flex-col items-center justify-center"
          >
            {projects.map((project, i) => {
              const targetScale = 1 - (projects.length - i - 1) * 0.05
              return (
                <StickyCard_001
                  key={`p_${i}`}
                  i={i}
                  {...project}
                  progress={scrollYProgress}
                  range={[i * 0.25, 1]}
                  targetScale={targetScale}
                />
              )
            })}
          </main>
        </ReactLenis>
      </div>
    </div>
  )
}

export { ImagesScrollingAnimation, StickyCard_001 }
