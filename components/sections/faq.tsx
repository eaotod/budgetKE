"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    question: "How do I purchase BudgetKE templates?",
    answer: (
      <p>
        Simply browse our store, add your desired templates to the cart, and
        proceed to checkout. We accept M-Pesa and all major cards.
      </p>
    ),
  },
  {
    question: "How do I download my templates?",
    answer: (
      <p>
        After a successful payment, you will receive an instant download link on
        the checkout success page and via email. You can also access your
        downloads from your account area.
      </p>
    ),
  },
  {
    question: "What files do I get?",
    answer: (
      <p>
        Most templates are delivered as Excel (.xlsx) files or Google Sheets
        links. Some also include PDF guides and video tutorials for setup.
      </p>
    ),
  },
  {
    question: "What if I already have a budgeting system?",
    answer: (
      <p>
        Our templates are designed to be flexible. You can easily import your
        existing data or use our templates to complement your current workflow.
      </p>
    ),
  },
  {
    question: "Can I change the layout or fonts?",
    answer: (
      <p>
        Yes, all our Excel and Google Sheets templates are fully unlocked. You
        can customize colors, fonts, and formulas to suit your specific needs.
      </p>
    ),
  },
  {
    question: "Do you provide setup support?",
    answer: (
      <p>
        Absolutely! Every template comes with a setup guide. If you get stuck,
        you can reach out to our support team for help at any time.
      </p>
    ),
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center max-w-[670px] mx-auto mb-16 lg:mb-24">
          Your BudgetKE FAQs, answered
        </h2>

        <ul className="max-w-[832px] mx-auto list-none p-0">
          {faqData.map((item, index) => (
            <li
              key={index}
              className="relative border-t border-gray-100 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between py-6 text-left group focus:outline-none"
              >
                <h3 className="text-xl font-bold m-0 pr-10 text-gray-900 group-hover:text-primary transition-colors">
                  {item.question}
                </h3>
                <div className="shrink-0 text-primary">
                  <div
                    className={cn(
                      "transition-transform duration-200",
                      openIndex === index && "rotate-45",
                    )}
                  >
                    <HugeiconsIcon icon={Add01Icon} size={28} />
                  </div>
                </div>
              </button>

              <div
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-10 text-gray-500 text-lg leading-relaxed max-w-2xl">
                    {item.answer}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
