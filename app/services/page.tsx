import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FileEditIcon,
  CodeIcon,
  Settings02Icon,
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  Rocket02Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Services | BudgetKE",
  description:
    "Get custom Excel templates and PWA applications built specifically for your business needs. From simple templates to enterprise apps.",
};

const services = [
  {
    id: "custom-template",
    name: "Custom Excel Template",
    price: "KES 15,000 - 30,000",
    timeline: "3-5 days",
    icon: FileEditIcon,
    description:
      "Fully customized Excel/Sheets template built to your exact specifications.",
    features: [
      "1-2 consultation calls",
      "Fully customized to your needs",
      "Unlimited revisions",
      "30 days support",
      "Video tutorial included",
    ],
  },
  {
    id: "advanced-template",
    name: "Advanced Custom Template",
    price: "KES 30,000 - 60,000",
    timeline: "1-2 weeks",
    icon: Settings02Icon,
    description:
      "Complex templates with automations, macros, and API integrations.",
    features: [
      "Complex calculations & automations",
      "Multiple connected sheets",
      "Dashboard with live charts",
      "Google Apps Script/VBA macros",
      "60 days priority support",
    ],
  },
  {
    id: "custom-pwa",
    name: "Custom PWA Application",
    price: "KES 60,000 - 300,000",
    timeline: "2-8 weeks",
    icon: CodeIcon,
    description:
      "Offline-first Progressive Web App that works like a native mobile app.",
    features: [
      "Works offline, syncs when online",
      "Installable on phone & desktop",
      "Custom branding & design",
      "Cloud backend available",
      "Multi-user support possible",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="pb-20 lg:pb-32">
        {/* Hero Section */}
        <section className="bg-linear-to-b from-gray-50 to-white pt-32 pb-20 lg:pb-32">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-8">
              <HugeiconsIcon icon={Rocket02Icon} size={16} />
              Custom Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight mb-6">
              Built for <span className="text-primary">your</span> business
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
              Our templates are great, but sometimes you need something built
              specifically for how your business works. We can help.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 lg:py-32">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-[2.5rem] border border-gray-100 p-8 lg:p-10 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-primary/20 transition-all duration-500 group"
                >
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                    <HugeiconsIcon
                      icon={service.icon}
                      size={28}
                      className="text-primary"
                    />
                  </div>

                  <h3 className="text-xl font-black text-gray-900 tracking-tight mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mb-6">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        Price
                      </div>
                      <div className="text-lg font-black text-gray-900">
                        {service.price}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-gray-100" />
                    <div>
                      <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                        Timeline
                      </div>
                      <div className="text-lg font-black text-gray-900">
                        {service.timeline}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          size={18}
                          className="text-primary shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-gray-600 font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-32 bg-gray-900">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-medium">
              Tell us about your project and we&apos;ll get back to you within
              24 hours with a quote and timeline.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="h-16 px-10 text-base font-black rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 uppercase tracking-widest"
              >
                Request a Quote
                <HugeiconsIcon
                  icon={ArrowRight02Icon}
                  size={20}
                  className="ml-2"
                />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
