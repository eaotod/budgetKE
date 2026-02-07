import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs, BreadcrumbJsonLd } from "@/components/ui/breadcrumbs";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon, PackageIcon } from "@hugeicons/core-free-icons";
import { BundleInfo } from "@/components/product/bundle-info";
import { getBundleBySlug, getBundleWithProducts } from "@/lib/catalog";

interface BundlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { getBundles } = await import("@/lib/catalog");
  const bundles = getBundles({ status: "active" });
  return bundles.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: BundlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const bundle = getBundleBySlug(resolvedParams.slug);

  if (!bundle) {
    return {
      title: "Bundle Not Found | BudgetKE",
    };
  }

  return {
    title: bundle.metaTitle || `${bundle.name} | BudgetKE`,
    description: bundle.metaDescription || bundle.shortDescription,
    openGraph: {
      title: bundle.name,
      description: bundle.shortDescription ?? bundle.description,
      images: bundle.thumbnailUrl ? [bundle.thumbnailUrl] : [],
    },
  };
}

export default async function BundlePage({ params }: BundlePageProps) {
  const resolvedParams = await params;
  const bundle = getBundleWithProducts(resolvedParams.slug);

  if (!bundle) {
    notFound();
  }

  const includedProducts = bundle.products ?? [];

  const breadcrumbItems = [
    { label: "Bundles", href: "/bundles" },
    { label: bundle.name },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Navbar />

      <main className="pb-20 lg:pb-32">
        {/* Header Section */}
        <div className="bg-white border-b border-gray-100 pt-28 pb-8 lg:pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <Breadcrumbs items={breadcrumbItems} className="mb-12" />

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              {/* Image Gallery (Simplified for bundle) */}
              <div className="space-y-6">
                <div className="aspect-4/3 rounded-[2.5rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-sm relative group">
                  {bundle.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={bundle.images[0]}
                      alt={bundle.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <HugeiconsIcon icon={PackageIcon} size={64} />
                    </div>
                  )}
                </div>
                {/* Mini thumbnails if multiple images */}
                {bundle.images.length > 1 && (
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {bundle.images.map((img: string, i: number) => (
                      <div
                        key={i}
                        className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img}
                          alt={`View ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <BundleInfo bundle={bundle} />
            </div>
          </div>
        </div>

        {/* Included Products Section */}
        <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest mb-6">
              What&apos;s Inside
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-6">
              {includedProducts.length} Premium Templates Included
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Get instant access to this complete collection of tools designed
              to work together perfectly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {includedProducts.map((product) => (
              <div
                key={product.id}
                className="flex gap-6 p-6 rounded-3xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gray-50 shrink-0 overflow-hidden">
                  {product.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.thumbnailUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      📊
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <Link
                    href={`/templates/${product.slug}`}
                    className="hover:underline decoration-primary"
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                    <HugeiconsIcon icon={Tick01Icon} size={16} />
                    Included
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
