import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const supabase = createAdminClient();

    const { data: order, error } = await supabase
      .from("orders")
      .select("payment_status, download_token")
      .eq("id", id)
      .single();

    if (id.startsWith("mock-")) {
      // Simulate processing delay then success
      // In a real app we'd check a timestamp or something, but for now just say completed
      // to let the UI proceed to success.
      return NextResponse.json({
        status: "completed",
        hasDownload: true,
      });
    }

    if (error || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: order.payment_status,
      hasDownload: !!order.download_token,
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
