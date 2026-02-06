import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend inside handler to avoid build-time errors if key is missing
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface ReceiptData {
  orderId: string;
  email: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  downloadToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ReceiptData = await request.json();
    const { orderId, email, orderNumber, items, total, downloadToken } = body;

    if (!email || !orderId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const resend = getResendClient();

    // MOCK MODE: If no API key, simulate success
    if (!resend) {
      console.log("Resend API key missing, simulating email send for:", email);
      return NextResponse.json({ 
        success: true, 
        messageId: `mock-email-${Date.now()}`,
        isMock: true 
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://budget.ke";
    const downloadUrl = `${baseUrl}/download/${downloadToken}`;

    // Create items list HTML
    const itemsHtml = items
      .map(
        (item) => `
        <div style="padding: 12px 0; border-bottom: 1px solid #eee;">
          <strong>${item.name}</strong><br>
          <span style="color: #666;">Qty: ${item.quantity} × KES ${item.price.toLocaleString()}</span>
        </div>
      `
      )
      .join("");

    const { data, error } = await resend.emails.send({
      from: "BudgetKE <orders@budget.ke>",
      to: [email],
      subject: `Your BudgetKE Order #${orderNumber} is Ready!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          
          <!-- Header -->
          <div style="text-align: center; padding: 30px 0; border-bottom: 1px solid #eee;">
            <h1 style="margin: 0; font-size: 28px; color: #16a34a;">BudgetKE</h1>
            <p style="color: #666; margin-top: 8px;">Thank you for your purchase!</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 30px 0;">
            <h2 style="margin: 0 0 20px;">Your download is ready 🎉</h2>
            
            <p>Hi there,</p>
            <p>Your payment has been confirmed and your files are ready to download.</p>
            
            <!-- Download Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="${downloadUrl}" style="display: inline-block; background: #16a34a; color: white; padding: 16px 40px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 18px;">
                Download Now →
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; text-align: center;">
              Link valid for 5 downloads. Keep this email safe!
            </p>
            
            <!-- Order Details -->
            <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin: 30px 0;">
              <h3 style="margin: 0 0 15px; font-size: 16px; color: #333;">Order Details</h3>
              <p style="margin: 0; color: #666;"><strong>Order Number:</strong> ${orderNumber}</p>
              
              <div style="margin-top: 20px;">
                ${itemsHtml}
              </div>
              
              <div style="margin-top: 20px; padding-top: 15px; border-top: 2px solid #ddd;">
                <strong style="font-size: 18px;">Total: KES ${total.toLocaleString()}</strong>
              </div>
            </div>
          </div>
          
          <!-- Help Section -->
          <div style="background: #fffbeb; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <h4 style="margin: 0 0 10px; color: #92400e;">Need Help?</h4>
            <p style="margin: 0; color: #b45309; font-size: 14px;">
              If you have any issues with your download, reply to this email or contact us at 
              <a href="mailto:support@budget.ke" style="color: #92400e;">support@budget.ke</a>
            </p>
          </div>
          
          <!-- Footer -->
          <div style="text-align: center; padding: 30px 0; border-top: 1px solid #eee; color: #9ca3af; font-size: 13px;">
            <p>© ${new Date().getFullYear()} BudgetKE. All rights reserved.</p>
            <p>Nairobi, Kenya</p>
            <p style="margin-top: 15px;">
              <a href="${baseUrl}" style="color: #16a34a; text-decoration: none;">Visit our website</a>
            </p>
          </div>
          
        </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error("Receipt email error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
