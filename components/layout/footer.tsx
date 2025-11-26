import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { companyConfig } from "@/config/company";
import { Container } from "@/components/ui/container";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-brand-dark">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="mb-6 inline-flex items-center gap-3">
              <Image
                src="/images/logo/Upright Logo2.png"
                alt="Upright Solutions"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <span className="font-heading text-xl font-bold text-white">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mb-6 max-w-xs text-brand-light/60 leading-relaxed">
              {companyConfig.tagline}. Delivering optimized IT solutions from
              requirements scoping to deployment.
            </p>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-brand-light/50">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3">
            <h3 className="mb-6 font-heading text-sm font-semibold uppercase tracking-widest text-brand-yellow">
              Services
            </h3>
            <ul className="space-y-4">
              {companyConfig.services.map((service) => (
                <li key={service.title}>
                  <Link
                    href="/services"
                    className="text-brand-light/70 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h3 className="mb-6 font-heading text-sm font-semibold uppercase tracking-widest text-brand-yellow">
              Company
            </h3>
            <ul className="space-y-4">
              {siteConfig.mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-brand-light/70 transition-colors hover:text-white"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="mb-6 font-heading text-sm font-semibold uppercase tracking-widest text-brand-yellow">
              Contact
            </h3>
            <ul className="space-y-4 text-brand-light/70">
              <li>
                <a
                  href={`mailto:${companyConfig.contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {companyConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${companyConfig.contact.phone}`}
                  className="transition-colors hover:text-white"
                >
                  {companyConfig.contact.phone}
                </a>
              </li>
              <li>{companyConfig.contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-brand-light/50">
            &copy; {new Date().getFullYear()} {companyConfig.name}. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-brand-light/50">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
