"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import type { GlobalFAQ, ProductFAQ } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  faqs: (GlobalFAQ | ProductFAQ)[];
  className?: string;
  defaultOpen?: string;
}

export function FAQAccordion({
  faqs,
  className,
  defaultOpen,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<string | null>(
    defaultOpen || null,
  );

  const toggleFAQ = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className={cn("w-full", className)}>
      <ul className="list-none p-0 divide-y divide-gray-100">
        {faqs.map((faq) => (
          <li key={faq.id} className="relative">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full flex items-center justify-between py-8 text-left group focus:outline-none"
            >
              <h3 className="text-xl font-bold m-0 pr-10 text-gray-900 group-hover:text-primary transition-colors">
                {faq.question}
              </h3>
              <div className="shrink-0 text-primary">
                <div
                  className={cn(
                    "transition-transform duration-200",
                    openIndex === faq.id && "rotate-45",
                  )}
                >
                  <HugeiconsIcon icon={Add01Icon} size={24} />
                </div>
              </div>
            </button>

            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                openIndex === faq.id
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-8 text-gray-500 text-lg leading-relaxed max-w-2xl">
                  {faq.answer}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Section with FAQs and optional categories
interface FAQSectionProps {
  faqs: GlobalFAQ[];
  title?: string;
  description?: string;
  showCategories?: boolean;
}

export function FAQSection({
  faqs,
  title = "Frequently Asked Questions",
  description,
  showCategories = false,
}: FAQSectionProps) {
  const categories = showCategories
    ? Array.from(new Set(faqs.map((f) => f.category)))
    : [];

  const categoryLabels: Record<string, string> = {
    general: "General",
    payment: "Payment & Billing",
    downloads: "Downloads & Access",
    returns: "Returns & Refunds",
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            {title}
          </h2>
          {description && (
            <p className="max-w-2xl mx-auto text-gray-500 text-lg">
              {description}
            </p>
          )}
        </div>

        {showCategories && categories.length > 1 ? (
          <div className="max-w-3xl mx-auto space-y-16">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-8 pb-4 border-b border-gray-100">
                  {categoryLabels[category as keyof typeof categoryLabels] ||
                    category}
                </h3>
                <FAQAccordion
                  faqs={faqs.filter((f) => f.category === category)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <FAQAccordion faqs={faqs} />
          </div>
        )}
      </div>
    </section>
  );
}

// JSON-LD for FAQ structured data
export function FAQJsonLd({ faqs }: { faqs: (GlobalFAQ | ProductFAQ)[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
