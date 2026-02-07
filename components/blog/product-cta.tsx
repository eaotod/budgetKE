import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Rocket01Icon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";

interface ProductCtaProps {
  productId: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export function ProductCta({
  productId,
  title,
  description,
  image,
  price,
}: ProductCtaProps) {
  return (
    <div className="my-12 p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 relative overflow-hidden group hover:bg-white hover:shadow-xl hover:shadow-primary/5 hover:border-primary/10 transition-all duration-300">
      {/* Background Decor */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="w-full md:w-48 aspect-square relative rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm shrink-0">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-black uppercase tracking-widest text-xs">
            <HugeiconsIcon icon={Rocket01Icon} size={14} />
            Recommended Tool
          </div>

          <h3 className="text-2xl font-black text-gray-900">{title}</h3>

          <p className="text-gray-500 font-medium leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Button
              asChild
              className="rounded-full h-12 px-8 font-bold bg-gray-900 hover:bg-gray-800 text-white shadow-xl shadow-gray-200"
            >
              <Link href={`/templates/${productId}`}>
                Get it for KES {price}
              </Link>
            </Button>
            <Link
              href={`/templates/${productId}`}
              className="text-sm font-bold text-gray-500 hover:text-primary transition-colors flex items-center gap-1"
            >
              Learn more <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
