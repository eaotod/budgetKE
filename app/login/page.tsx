"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { GoogleIcon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error logging in:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50/50">
        <div className="w-full max-w-md p-6">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-6">
              <span className="text-3xl">🔐</span>
            </div>

            <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-gray-500 mb-8 font-medium">
              Sign in to access your downloads and order history.
            </p>

            <Button
              size="lg"
              className="w-full h-14 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-900 hover:text-gray-900 font-bold rounded-xl text-lg flex items-center justify-center gap-3 transition-all transform active:scale-[0.98]"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-spin w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full" />
              ) : (
                <>
                  <HugeiconsIcon icon={GoogleIcon} size={24} />
                  Continue with Google
                </>
              )}
            </Button>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <Link
                href="/"
                className="text-sm font-bold text-gray-400 hover:text-gray-900 flex items-center justify-center gap-2 transition-colors"
              >
                <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                Return to Store
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
