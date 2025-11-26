import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero, About } from "@/components/sections/home";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        {/* Placeholder content to enable scrolling */}
        <section className="min-h-screen bg-brand-light py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="font-heading text-4xl font-bold text-brand-dark">
              More content coming soon...
            </h2>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
