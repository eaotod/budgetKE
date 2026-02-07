"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Download01Icon,
  CreditCardIcon,
  Loading03Icon,
} from "@hugeicons/core-free-icons";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface OrderItem {
  name: string;
  productId?: string;
  bundleId?: string;
  type: string;
}

interface OrderCardProps {
  order: {
    uuid: string;
    id: string; // Display ID
    date: string;
    total: number;
    status: string;
    downloadToken?: string;
    items: OrderItem[];
    email: string;
  };
}

export function OrderCard({ order }: OrderCardProps) {
  const router = useRouter();
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("254");
  const [isLoading, setIsLoading] = useState(false);

  const [isPolling, setIsPolling] = useState(false);
  const [pollingCount, setPollingCount] = useState(0);

  // Poll for payment status after payment initiation
  useEffect(() => {
    if (!isPolling || !order.uuid) return;

    const maxPolls = 60; // 3 minutes max (60 * 3s)
    const pollInterval = 3000;

    const poll = async () => {
      const res = await fetch(`/api/orders/${order.uuid}/status`);
      const data = await res.json();

      if (data.status === "completed") {
        setIsPolling(false);
        setIsPayOpen(false);
        toast.success("Payment confirmed! Your order is now complete.");
        router.refresh();
      } else if (data.status === "failed") {
        setIsPolling(false);
        toast.error(data.error || "Payment failed. Please try again.");
      } else if (pollingCount >= maxPolls) {
        setIsPolling(false);
        toast.error(
          "Payment timeout. Please check your M-Pesa and refresh the page.",
        );
      } else {
        setPollingCount((prev) => prev + 1);
      }
    };

    const interval = setInterval(poll, pollInterval);
    return () => clearInterval(interval);
  }, [isPolling, order.uuid, pollingCount, router]);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phoneNumber,
          amount: order.total,
          email: order.email,
          orderId: order.uuid,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to initiate payment");
      }

      toast.success("Payment request sent to your phone");
      setIsLoading(false);
      setIsPolling(true);
      setPollingCount(0);
    } catch {
      setIsLoading(false);
      toast.error("Failed to initiate payment");
    }
  };

  const isPending = order.status === "pending" || order.status === "failed";
  const isCompleted = order.status === "completed";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:shadow-sm hover:border-gray-200">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="font-bold text-gray-900">{order.id}</span>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              isCompleted
                ? "bg-green-100 text-green-700"
                : isPending
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {order.status}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-1">
          {format(new Date(order.date), "MMM d, yyyy")} • KES{" "}
          {order.total.toLocaleString()}
        </p>
        <p className="text-sm font-medium text-gray-700">
          {order.items.map((i) => i.name).join(", ")}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {isCompleted &&
          order.items.map((item, idx) => (
            <form
              key={idx}
              action={`/api/download/${order.downloadToken}/${item.productId || item.bundleId}`}
            >
              <Button
                size="sm"
                className="rounded-xl font-bold"
                disabled={!order.downloadToken}
              >
                <HugeiconsIcon
                  icon={Download01Icon}
                  size={16}
                  className="mr-2"
                />
                Download {item.type}
              </Button>
            </form>
          ))}

        {isPending && (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setIsPayOpen(true)}
              className="rounded-xl font-bold bg-gray-900 text-white hover:bg-gray-800"
            >
              <HugeiconsIcon icon={CreditCardIcon} size={16} className="mr-2" />
              Pay Now
            </Button>
          </div>
        )}
      </div>

      {/* Pay Dialog */}
      <Dialog open={isPayOpen} onOpenChange={setIsPayOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-8">
          <DialogHeader>
            <div className="w-16 h-10 bg-white border border-green-100 rounded-xl flex items-center justify-center shadow-sm mb-4">
              <NextImage
                src="/images/icons/mpesa.svg"
                alt="M-Pesa"
                width={32}
                height={24}
                className="h-6 w-auto"
              />
            </div>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
              Complete Payment
            </DialogTitle>
            <DialogDescription className="text-gray-500 font-medium">
              {isPolling
                ? "Check your phone and enter your M-Pesa PIN. We're waiting for payment confirmation..."
                : "Enter your M-Pesa number to receive a payment prompt."}
            </DialogDescription>
          </DialogHeader>
          {isPolling ? (
            <div className="space-y-6 mt-4">
              <div className="bg-green-50/50 border border-green-100 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                  <HugeiconsIcon
                    icon={Loading03Icon}
                    size={24}
                    className="text-primary"
                  />
                </div>
                <p className="text-gray-700 font-medium">
                  Waiting for payment confirmation...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please complete the payment on your phone.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsPolling(false);
                  setIsPayOpen(false);
                }}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <form onSubmit={handlePay} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-bold text-gray-700 ml-1">
                  Phone Number
                </Label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                    <NextImage
                      src="/images/icons/kenya.svg"
                      alt="KE"
                      width={24}
                      height={16}
                      className="w-6 h-auto rounded-sm shadow-sm"
                    />
                  </div>
                  <Input
                    id="phone"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-12 h-14 rounded-2xl border-green-200 bg-white focus:border-green-500 focus:ring-green-500/20 transition-all text-base font-mono"
                    placeholder="2547..."
                    required
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-2xl font-black uppercase tracking-widest text-base bg-gray-900 hover:bg-gray-800 text-white shadow-xl shadow-gray-200"
              >
                {isLoading ? (
                  <HugeiconsIcon
                    icon={Loading03Icon}
                    size={20}
                    className="animate-spin"
                  />
                ) : (
                  "Pay KES " + order.total.toLocaleString()
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
