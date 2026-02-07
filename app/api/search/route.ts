import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/catalog";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get("q")?.trim().toLowerCase();

  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const products = getProducts({ status: "active" });
  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q),
  );

  return NextResponse.json(
    results.slice(0, 10).map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.categoryId,
      price: p.price,
      image: p.thumbnailUrl ?? p.images?.[0],
    })),
  );
}
