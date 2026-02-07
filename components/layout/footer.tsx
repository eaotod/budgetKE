import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, Location01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    store: {
      title: "Premium Templates",
      links: [
        {
          label: "Excel Personal Finance",
          href: "/templates?category=personal",
        },
        {
          label: "Business Management Tools",
          href: "/templates?category=business",
        },
        { label: "All Dashboard Templates", href: "/templates" },
        { label: "Best Seller Bundles", href: "/templates?filter=bundles" },
      ],
    },
    resources: {
      title: "Popular Resources",
      links: [
        { label: "Financial Journal", href: "/blog" },
        { label: "How it Works", href: "/#how-it-works" },
        { label: "Student Disounts", href: "/templates" },
        { label: "Affiliate Program", href: "/templates" },
      ],
    },
    legal: {
      title: "Company",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Policy", href: "/refund" },
      ],
    },
  };

  return (
    <footer className="bg-white border-t border-gray-50 py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand Pillar */}
          <div className="col-span-2 lg:col-span-4 max-w-sm">
            <Link
              href="/"
              className="flex items-center gap-2 mb-8 group"
              aria-label="BudgetKE Home"
            >
              <Image
                src="/images/logo.svg"
                alt="BudgetKE Logo"
                width={150}
                height={100}
              />
            </Link>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              Empowering Kenyans to master their money with professional,
              high-end Excel & Google Sheets templates tailored for local
              businesses and households.
            </p>
            <address className="not-italic flex flex-col gap-4">
              <a
                href="mailto:hi@budgetke.com"
                className="text-sm font-bold text-gray-600 hover:text-primary transition-colors flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary transition-colors">
                  <HugeiconsIcon icon={Mail01Icon} size={14} />
                </div>
                support@budgetke.com
              </a>
              <div className="text-sm font-bold text-gray-600 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <HugeiconsIcon icon={Location01Icon} size={14} />
                </div>
                Nairobi, Kenya
              </div>
            </address>
          </div>

          {/* Nav Pillars */}
          <div className="col-span-2 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            {Object.values(footerLinks).map((column) => (
              <nav key={column.title} aria-label={`${column.title} navigation`}>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-8">
                  {column.title}
                </h4>
                <ul className="space-y-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[15px] font-medium text-gray-600 hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium text-gray-400">
              © {currentYear} BudgetKE. Built for the modern Kenyan
              entrepreneur.
            </p>
          </div>

          <div className="flex items-center justify-center lg:justify-end gap-6 w-full lg:w-auto">
            <span style={{ display: "block", textAlign: "center" }}>
              <a
                href="https://intasend.com/security"
                target="_blank"
                rel="noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://intasend-prod-static.s3.amazonaws.com/img/trust-badges/intasend-trust-badge-with-mpesa-hr-light.png"
                  width="375px"
                  alt="IntaSend Secure Payments (PCI-DSS Compliant)"
                />
              </a>
              <strong>
                <a
                  style={{
                    display: "block",
                    color: "#454545",
                    textDecoration: "none",
                    fontSize: "0.8em",
                    marginTop: "0.6em",
                  }}
                  href="https://intasend.com/security"
                  target="_blank"
                  rel="noreferrer"
                >
                  Secured by IntaSend Payments
                </a>
              </strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
