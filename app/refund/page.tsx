import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Due to the digital nature of our products, all BudgetKE template sales are final and non-refundable.",
};

export default function RefundPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-20 bg-gray-50/40 min-h-screen">
        <div className="max-w-3xl mx-auto px-6 prose prose-gray prose-headings:font-black prose-a:text-primary">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-6">
            Refund Policy
          </h1>
          <p className="text-gray-600 text-base font-medium mb-8">
            We want you to be confident when you purchase from BudgetKE. Please
            read this refund policy carefully before completing your order.
          </p>

          <h2>No Refunds on Digital Products</h2>
          <p>
            Due to the digital nature of our products,{" "}
            <strong>we do not issue refunds</strong> once a purchase has been
            completed. After your payment is confirmed, you immediately receive
            access to files that cannot be “returned”.
          </p>

          <h2>Before You Buy</h2>
          <p>
            If you are unsure whether a specific template or bundle is right for
            you, please contact us at{" "}
            <a href="mailto:support@budgetke.com">support@budgetke.com</a>{" "}
            before purchasing and we will gladly help you choose the best
            option.
          </p>

          <h2>Download & Access Issues</h2>
          <p>
            If you experience any technical issues accessing your files (for
            example, broken download link or file corruption), contact us and we
            will{" "}
            <strong>
              re-send or restore access to your purchase at no extra cost
            </strong>
            .
          </p>

          <h2>Chargebacks</h2>
          <p>
            Initiating a chargeback after successfully receiving your digital
            products is considered misuse of the payments system. We reserve the
            right to block future purchases from accounts associated with
            fraudulent chargebacks.
          </p>

          <h2>Questions</h2>
          <p>
            If you have any questions about this policy, email us at{" "}
            <a href="mailto:support@budgetke.com">support@budgetke.com</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

