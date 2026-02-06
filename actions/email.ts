"use server";

import { resend } from "@/lib/resend";
import { PurchaseReceiptEmail } from "@/components/emails/purchase-receipt";

interface SendReceiptParams {
  email: string;
  name: string;
  orderId: string;
  productName: string;
  amount: number;
  downloadToken: string;
}

export async function sendReceiptEmail({
  email,
  name,
  orderId,
  productName,
  amount,
  downloadToken,
}: SendReceiptParams) {
  try {
    const downloadLink = `${process.env.NEXT_PUBLIC_APP_URL}/download/${downloadToken}`;

    const { data, error } = await resend.emails.send({
      from: "BudgetKE <orders@budgetke.com>", // User needs to verify domain
      to: [email],
      subject: `Your Order Receipt: ${productName}`,
      react: PurchaseReceiptEmail({
        customerName: name,
        orderId,
        productName,
        downloadLink,
        amount,
      }),
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email Sending Failed:", error);
    return { success: false, error };
  }
}
