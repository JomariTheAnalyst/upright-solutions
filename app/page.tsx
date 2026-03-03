"use client";

import { useRef } from "react";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/home/hero";
import { Est } from "@/components/sections/home/est";
import { Services } from "@/components/sections/home/services";
import { ImagesScrollingAnimation } from "@/components/sections/home/industries-weserve";
import { VisionStatement } from "@/components/sections/home/vision-statement";
import { Projects } from "@/components/sections/home/projects";
import { YellowSectionsWrapper } from "@/components/sections/home/yellow-sections-wrapper";

export default function Home() {
  const visionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero />
        <Est />
        <Services />
        <YellowSectionsWrapper triggerRef={visionRef}>
          <ImagesScrollingAnimation />
          <VisionStatement ref={visionRef} />
          <Projects />
        </YellowSectionsWrapper>
      </main>
      <Footer />
    </div>
  );
}
