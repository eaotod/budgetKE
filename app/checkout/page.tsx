"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingBag02Icon,
  Delete02Icon,
  ArrowLeft02Icon,
  SecurityCheckIcon,
  FlashIcon,
  Loading03Icon,
  CheckmarkCircle02Icon,
  SmartPhone01Icon,
  Mail01Icon,
  UserIcon,
  CreditCardIcon,
  AlertCircleIcon,
  Download01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useCartStore } from "@/lib/cart-store";
import { checkoutSchema } from "@/lib/types";
import { cn } from "@/lib/utils";
import { z } from "zod";

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type CheckoutStep = "details" | "processing" | "success" | "failed";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, total, removeItem, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<CheckoutStep>("details");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pollingCount, setPollingCount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      phone: "254",
    },
  });

  // Hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0 && step === "details") {
      router.push("/templates");
    }
  }, [items.length, mounted, router, step]);

  // Poll for payment status
  useEffect(() => {
    if (step !== "processing" || !orderId) return;

    const maxPolls = 60; // 3 minutes max (60 * 3s)
    const pollInterval = 3000;

    const poll = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}/status`);
        const data = await res.json();

        if (data.status === "completed") {
          setStep("success");
          clearCart();
        } else if (data.status === "failed") {
          setStep("failed");
          setError(data.error || "Payment failed. Please try again.");
        } else if (pollingCount >= maxPolls) {
          setStep("failed");
          setError("Payment timeout. Please check your M-Pesa and try again.");
        } else {
          setPollingCount((prev) => prev + 1);
        }
      } catch {
        console.error("Polling error");
      }
    };

    const interval = setInterval(poll, pollInterval);
    return () => clearInterval(interval);
  }, [step, orderId, pollingCount, clearCart]);

  const onSubmit = async (data: CheckoutFormData) => {
    setError(null);

    try {
      // Create order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            type: item.type,
          })),
          total,
        }),
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create order");
      }

      const { orderId: newOrderId } = await orderRes.json();
      setOrderId(newOrderId);

      // Initiate M-Pesa STK Push
      const stkRes = await fetch("/api/mpesa/stk-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: data.phone,
          amount: total,
          email: data.email,
          orderId: newOrderId,
        }),
      });

      if (!stkRes.ok) {
        throw new Error("Failed to initiate payment");
      }

      setStep("processing");
      setPollingCount(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 font-bold transition-colors"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
              Continue Shopping
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Content Area */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              {step === "details" && (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 md:p-10 shadow-xl shadow-gray-200/50 animate-in fade-in duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                      <HugeiconsIcon icon={CreditCardIcon} size={24} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                        Secure Checkout
                      </h1>
                      <p className="text-gray-500 font-medium text-sm">
                        Complete your purchase securely
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Contact Details */}
                    <div className="space-y-6">
                      <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                        Contact Information
                      </h2>

                      <div className="grid gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="font-bold text-gray-700 ml-1"
                          >
                            Email Address
                          </Label>
                          <div className="relative">
                            <HugeiconsIcon
                              icon={Mail01Icon}
                              size={20}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              {...register("email")}
                              className={cn(
                                "pl-12 h-14 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all text-base",
                                errors.email &&
                                  "border-red-500 bg-red-50/50 focus:bg-red-50/50",
                              )}
                            />
                          </div>
                          {errors.email ? (
                            <p className="text-sm text-red-500 font-medium ml-1 flex items-center gap-1.5">
                              <HugeiconsIcon icon={AlertCircleIcon} size={14} />
                              {errors.email.message}
                            </p>
                          ) : (
                            <p className="text-xs text-gray-400 font-medium ml-1">
                              We'll send your receipt and download link here
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="customerName"
                            className="font-bold text-gray-700 ml-1"
                          >
                            Full Name (Optional)
                          </Label>
                          <div className="relative">
                            <HugeiconsIcon
                              icon={UserIcon}
                              size={20}
                              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <Input
                              id="customerName"
                              placeholder="John Doe"
                              {...register("customerName")}
                              className="pl-12 h-14 rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white transition-all text-base"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-6 pt-6 border-t border-gray-100">
                      <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                        Payment Method
                      </h2>

                      <div className="bg-green-50/50 border border-green-100 rounded-3xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-14 h-9 bg-white border border-green-100 rounded-xl flex items-center justify-center shadow-sm">
                            <img
                              src="/images/icons/mpesa.svg"
                              alt="M-Pesa"
                              className="h-6 w-auto"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">
                              M-Pesa Express
                            </h3>
                            <p className="text-sm text-gray-500 font-medium">
                              Fast and secure mobile payment
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="font-bold text-gray-700 ml-1"
                          >
                            M-Pesa Phone Number
                          </Label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                              <img
                                src="/images/icons/kenya.svg"
                                alt="KE"
                                className="w-6 h-auto rounded-sm shadow-sm"
                              />
                            </div>
                            <Input
                              id="phone"
                              type="tel"
                              placeholder="2547..."
                              {...register("phone")}
                              className={cn(
                                "pl-12 h-14 rounded-2xl border-green-200 bg-white focus:border-green-500 focus:ring-green-500/20 transition-all text-base font-mono",
                                errors.phone && "border-red-500",
                              )}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-sm text-red-500 font-medium ml-1 flex items-center gap-1.5">
                              <HugeiconsIcon icon={AlertCircleIcon} size={14} />
                              {errors.phone.message}
                            </p>
                          )}
                          <p className="text-xs text-green-700 font-bold ml-1 flex items-center gap-1">
                            <HugeiconsIcon
                              icon={FlashIcon}
                              size={12}
                              className="fill-green-600"
                            />
                            You will receive an STK push on your phone
                          </p>
                        </div>
                      </div>
                    </div>

                    {error && (
                      <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-sm font-bold flex items-center gap-3">
                        <HugeiconsIcon icon={AlertCircleIcon} size={20} />
                        {error}
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-16 rounded-full text-lg font-black uppercase tracking-widest bg-gray-900 hover:bg-gray-800 text-white shadow-xl shadow-gray-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <HugeiconsIcon
                          icon={Loading03Icon}
                          size={24}
                          className="animate-spin"
                        />
                      ) : (
                        <span className="flex items-center gap-2">
                          Pay KES {total.toLocaleString()}
                          <HugeiconsIcon icon={SecurityCheckIcon} size={20} />
                        </span>
                      )}
                    </Button>

                    <div className="flex items-center justify-center gap-6 pt-2">
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                        <HugeiconsIcon icon={SecurityCheckIcon} size={14} />
                        SSL Encrypted
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                        <HugeiconsIcon icon={FlashIcon} size={14} />
                        Instant Delivery
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {step === "processing" && (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-12 lg:p-16 shadow-xl shadow-gray-200/50 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <HugeiconsIcon
                      icon={SmartPhone01Icon}
                      size={32}
                      className="text-primary"
                    />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                    Check your phone
                  </h2>
                  <p className="text-gray-500 font-medium text-lg mb-8 max-w-md mx-auto">
                    We've sent an M-Pesa payment request to your phone number.
                    Please enter your PIN to complete the transaction.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-gray-500 font-bold text-xs uppercase tracking-widest animate-pulse">
                    <HugeiconsIcon
                      icon={Loading03Icon}
                      size={14}
                      className="animate-spin"
                    />
                    Waiting for payment confirmation...
                  </div>
                </div>
              )}

              {step === "success" && (
                <div className="bg-white rounded-[2.5rem] border border-green-100 p-12 lg:p-16 shadow-xl shadow-green-100 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <HugeiconsIcon
                      icon={CheckmarkCircle02Icon}
                      size={48}
                      className="text-green-500 fill-green-100"
                    />
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4 tracking-tight">
                    Payment Successful!
                  </h2>
                  <p className="text-gray-500 font-medium text-lg mb-10 max-w-md mx-auto">
                    Thank you for your purchase. We've sent the receipt and
                    download links to your email.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      asChild
                      className="h-14 px-8 rounded-full text-base font-bold bg-gray-900 hover:bg-gray-800 text-white shadow-xl shadow-gray-200"
                    >
                      <Link
                        href={`/download/${orderId}`}
                        className="flex items-center gap-2"
                      >
                        <HugeiconsIcon icon={Download01Icon} size={20} />
                        Download Files
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-14 px-8 rounded-full text-base font-bold border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <Link href="/templates">Return to Store</Link>
                    </Button>
                  </div>
                </div>
              )}

              {step === "failed" && (
                <div className="bg-white rounded-[2.5rem] border border-red-100 p-12 lg:p-16 shadow-xl shadow-red-50 text-center animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <HugeiconsIcon
                      icon={AlertCircleIcon}
                      size={48}
                      className="text-red-500"
                    />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">
                    Payment Failed
                  </h2>
                  <p className="text-gray-500 font-medium text-lg mb-10 max-w-md mx-auto">
                    {error ||
                      "Something went wrong with your payment. Please try again."}
                  </p>
                  <div className="flex justify-center">
                    <Button
                      onClick={() => setStep("details")}
                      className="h-14 px-10 rounded-full text-base font-bold bg-gray-900 hover:bg-gray-800 text-white shadow-xl shadow-gray-200"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            {step === "details" && items.length > 0 && (
              <div className="lg:col-span-12 xl:col-span-5 order-1 lg:order-2">
                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-lg shadow-gray-100 sticky top-32">
                  <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
                    <HugeiconsIcon icon={ShoppingBag02Icon} size={24} />
                    Order Summary
                  </h2>

                  <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100"
                      >
                        <div className="w-16 h-16 bg-white rounded-xl shrink-0 flex items-center justify-center border border-gray-100 overflow-hidden">
                          {item.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <HugeiconsIcon
                              icon={ShoppingBag02Icon}
                              size={20}
                              className="text-gray-300"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate text-sm mb-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500 font-medium">
                              Qty: {item.quantity}
                            </p>
                            <p className="text-sm font-black text-gray-900">
                              KES{" "}
                              {(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <HugeiconsIcon icon={Delete02Icon} size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-dashed border-gray-200 pt-6 space-y-4">
                    <div className="flex justify-between text-gray-500 font-medium">
                      <span>Subtotal</span>
                      <span>KES {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-black text-gray-900">
                      <span>Total</span>
                      <span>KES {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-8 bg-blue-50/50 rounded-xl p-4 flex gap-3 text-blue-700 text-xs font-bold leading-relaxed border border-blue-100">
                    <HugeiconsIcon
                      icon={SecurityCheckIcon}
                      size={18}
                      className="shrink-0 mt-0.5"
                    />
                    <p>
                      Your purchase is protected by our 30-day money-back
                      guarantee. If you're not satisfied, we'll refund you.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
