import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ProductItem } from "../types/productInterface";
import { ProductCard } from "../_component/ProductCard/ProductCard";

export default async function Home() {
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products",
    {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 60 },
    },
  );

  let { data: allProducts }: { data: ProductItem[] } = await response.json();
  // console.log(allProducts);
  return (
    <>
      <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4  gap-5">
        {allProducts?.map((prod) => (
          <ProductCard key={prod._id} prod={prod} />
        ))}
      </div>
    </>
  );
}
