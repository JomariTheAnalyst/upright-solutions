import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/home/hero";
import { Est } from "@/components/sections/home/est";
import { Services } from "@/components/sections/home/services";
import { ImagesScrollingAnimation } from "@/components/sections/home/industries-weserve";
import { VisionStatement } from "@/components/sections/home/vision-statement";
import { Projects } from "@/components/sections/home/projects";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Est />
        <Services />
        <ImagesScrollingAnimation />
        <VisionStatement />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
