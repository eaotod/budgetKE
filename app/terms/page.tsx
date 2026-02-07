import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions for using BudgetKE templates, tools, and services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-gray-50/40 min-h-screen">
        <div className="max-w-3xl mx-auto px-6 prose prose-gray prose-headings:font-black prose-a:text-primary">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-base font-medium mb-8">
            By purchasing or using any BudgetKE digital product, you agree to
            the terms outlined below.
          </p>

          <h2>1. Digital Products</h2>
          <p>
            BudgetKE sells digital templates, tools, and related resources.
            After successful payment, you receive immediate access to downloads
            via email or the download page.
          </p>

          <h2>2. License & Usage</h2>
          <p>
            Templates are licensed for personal or internal business use. You
            may not resell, redistribute, or claim our products as your own
            without a specific written reseller or white-label agreement.
          </p>

          <h2>3. No Financial Advice</h2>
          <p>
            Our tools are for educational and planning purposes only and do not
            constitute legal, tax, or financial advice. Always consult a
            qualified professional for specific decisions.
          </p>

          <h2>4. Availability & Changes</h2>
          <p>
            We may update, improve, or discontinue products from time to time.
            When possible, we provide free updates for existing customers for
            that product version.
          </p>

          <h2>5. Limitation of Liability</h2>
          <p>
            BudgetKE is not liable for any losses, damages, or decisions made
            based on the use of our templates or tools. You are responsible for
            how you use the data and analysis generated.
          </p>

          <h2>6. Contact</h2>
          <p>
            For any questions about these terms, reach us at{" "}
            <a href="mailto:support@budgetke.com">support@budgetke.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

