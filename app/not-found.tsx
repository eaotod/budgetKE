import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Search01Icon,
  File01Icon,
} from "@hugeicons/core-free-icons";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 transition-all">
              <span className="text-4xl">📭</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
              Page not found
            </h1>

            <p className="text-lg text-gray-500 mb-10 font-medium leading-relaxed">
              We've searched everywhere but couldn't find what you're looking
              for. It might have been moved or deleted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20">
                  <HugeiconsIcon icon={Home01Icon} size={20} className="mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link href="/templates">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold border-2 border-gray-200 hover:bg-white hover:border-gray-300 text-gray-700"
                >
                  <HugeiconsIcon
                    icon={Search01Icon}
                    size={20}
                    className="mr-2"
                  />
                  Browse Templates
                </Button>
              </Link>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-200/50">
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
                Popular Pages
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/templates"
                  className="px-4 py-2 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all text-sm font-bold text-gray-600 hover:text-primary flex items-center gap-2"
                >
                  <HugeiconsIcon icon={File01Icon} size={16} />
                  Templates
                </Link>
                <Link
                  href="/bundles"
                  className="px-4 py-2 rounded-xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all text-sm font-bold text-gray-600 hover:text-primary flex items-center gap-2"
                >
                  <span className="text-lg">📦</span>
                  Bundles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
