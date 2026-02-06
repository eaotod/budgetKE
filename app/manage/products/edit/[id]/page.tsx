import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/manage/product-form";

interface EditProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProductPage(props: EditProductPageProps) {
  const params = await props.params;
  const { id } = params;
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center gap-6">
        <Link
          href="/manage/products"
          className="p-4 bg-white hover:bg-gray-900 hover:text-white rounded-[1.5rem] border border-gray-100 transition-all text-gray-400 shadow-xl shadow-gray-200/50 group"
        >
          <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </Link>
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
            Edit Product
            <span className="text-[10px] font-black text-primary bg-primary/5 px-3 py-1 rounded-full uppercase tracking-widest translate-y-[-2px]">
              {product.id}
            </span>
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Update the template details for{" "}
            <span className="text-gray-900 font-bold">{product.name}</span>.
          </p>
        </div>
      </div>

      <ProductForm initialData={product} isEditing={true} />
    </div>
  );
}
