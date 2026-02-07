"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  ArrowRight01Icon,
  Tick01Icon,
  Loading01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface NewsletterCTAProps {
  variant?: "inline" | "section";
  className?: string;
}

export function NewsletterCTA({
  variant = "section",
  className,
}: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "website" }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setEmail("");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          disabled={isSubmitting || isSuccess}
        />
        <Button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="rounded-full px-6"
        >
          {isSubmitting ? (
            <HugeiconsIcon
              icon={Loading01Icon}
              size={18}
              className="animate-spin"
            />
          ) : isSuccess ? (
            <HugeiconsIcon icon={Tick01Icon} size={18} />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    );
  }

  return (
    <section
      className={cn(
        "py-20 lg:py-32 bg-gray-50/50 relative overflow-hidden",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
            <HugeiconsIcon icon={Mail01Icon} size={12} />
            Journal Newsletter
          </div>

          <h2 className="mb-6 tracking-tight">
            Insights to master your money.
          </h2>

          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 5,000+ Kenyans receiving weekly tips on budgeting, saving, and
            growing wealth. Plus get early access to new templates.
          </p>

          <div className="max-w-md mx-auto">
            {isSuccess ? (
              <div className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-xl shadow-primary/5">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
                  <HugeiconsIcon icon={Tick01Icon} size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  You&apos;re subscribed!
                </h3>
                <p className="text-gray-500">
                  Check your email for a welcome message.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="relative group">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-16 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-primary px-8 rounded-2xl shadow-sm transition-all text-lg"
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/0 group-hover:ring-primary/10 transition-all pointer-events-none" />
                </div>

                {error && (
                  <p className="text-red-500 text-sm md:text-left px-2">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-16 px-10 bg-primary text-white hover:bg-primary/90 rounded-2xl font-bold text-lg shadow-xl shadow-primary/10 transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <HugeiconsIcon
                      icon={Loading01Icon}
                      size={20}
                      className="animate-spin mr-3"
                    />
                  ) : null}
                  Subscribe Now
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={20}
                    className="ml-3"
                  />
                </Button>
              </form>
            )}

            {!isSuccess && (
              <p className="text-gray-400 text-xs mt-6 italic">
                Subtle. No spam. One email a week.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
}
