"use client";

import { useParams } from "next/navigation";
import ProductList from "../../ProductList";

export default function StoreCategory() {
  const { slug } = useParams();
  return <ProductList categorySlug={slug} />;
}
