import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how BudgetKE collects, uses, and protects your data when you use our templates and services.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-gray-50/40 min-h-screen">
        <div className="max-w-3xl mx-auto px-6 prose prose-gray prose-headings:font-black prose-a:text-primary">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-base font-medium mb-8">
            At BudgetKE, we take your privacy seriously. This policy explains
            what data we collect, how we use it, and the rights you have.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect the information you provide directly to us when you buy a
            template, sign up for our newsletter, or contact support. This may
            include your name, email address, phone number, and transaction
            details.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Process orders and deliver digital products</li>
            <li>Send receipts and important product updates</li>
            <li>Respond to support requests</li>
            <li>Improve our products and website experience</li>
          </ul>

          <h2>3. Payments & Security</h2>
          <p>
            All payments are processed securely via trusted providers like
            IntaSend and M-Pesa. We never store your card or M-Pesa PIN details
            on our servers.
          </p>

          <h2>4. Cookies & Analytics</h2>
          <p>
            We may use cookies and basic analytics to understand how visitors
            use the site so we can improve performance and usability. You can
            control cookies from your browser settings.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We keep basic order and account information for as long as
            reasonably necessary for accounting, legal, and product support
            purposes.
          </p>

          <h2>6. Your Rights</h2>
          <p>You can request to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion where applicable</li>
          </ul>

          <h2>7. Contact</h2>
          <p>
            For any privacy questions, contact us at{" "}
            <a href="mailto:support@budgetke.com">support@budgetke.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

