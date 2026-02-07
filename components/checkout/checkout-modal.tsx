"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HugeiconsIcon } from "@hugeicons/react";
import { CallIcon, Loading03Icon } from "@hugeicons/core-free-icons";
// import { toast } from "sonner";

interface CheckoutModalProps {
  productName: string;
  amount: number;
}

export function CheckoutModal({ productName, amount }: CheckoutModalProps) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"input" | "processing">("input");

  const handlePayment = async () => {
    if (!phone.startsWith("254")) {
      alert("Please use format 2547XXXXXXXX");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("processing");
        // Here you would start polling for payment status or wait for webhook
      } else {
        alert(data.error || "Payment failed");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full h-12 text-lg rounded-full bg-primary hover:bg-primary/90 font-semibold shadow-lg shadow-primary/20"
        >
          Pay KES {amount} with M-Pesa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>M-Pesa Checkout</DialogTitle>
          <DialogDescription>
            Enter your M-Pesa number to pay for <strong>{productName}</strong>.
          </DialogDescription>
        </DialogHeader>

        {step === "input" ? (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                placeholder="Where should we send the files?"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">M-Pesa Number</Label>
              <div className="relative">
                <Input
                  id="phone"
                  placeholder="254712345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10"
                />
                <HugeiconsIcon
                  icon={CallIcon}
                  className="w-4 h-4 text-gray-400 absolute left-3 top-3"
                />
              </div>
            </div>
            <Button
              onClick={handlePayment}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={loading || !phone || !email}
            >
              {loading && (
                <HugeiconsIcon
                  icon={Loading03Icon}
                  className="mr-2 h-4 w-4 animate-spin"
                />
              )}
              {loading ? "Processsing..." : "Pay Now"}
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <HugeiconsIcon
                icon={CallIcon}
                className="w-6 h-6 text-green-600"
              />
            </div>
            <h3 className="text-lg font-bold">Check your phone!</h3>
            <p className="text-gray-500">
              A request has been sent to <strong>{phone}</strong>. Enter your
              M-Pesa PIN to complete payment.
            </p>
            <Button
              variant="outline"
              onClick={() => setStep("input")}
              className="mt-4"
            >
              Cancel / Try Again
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
