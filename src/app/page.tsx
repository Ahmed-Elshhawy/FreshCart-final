import { ProductItem } from "./types/productInterface";
import { ProductCard } from "./_component/ProductCard/ProductCard";

export const revalidate = 60;

export default async function Home() {
  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/products?limit=50",
      {
        method: "GET",
        next: { revalidate: 60 }, // ISR
      },
    );

    const { data: allProducts }: { data: ProductItem[] } =
      await response.json();

    if (!allProducts || allProducts.length === 0) {
      return (
        <p className="text-center mt-10 text-gray-500">
          their is no product now
        </p>
      );
    }

    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5 gap-5">
        {allProducts.map((prod) => (
          <ProductCard key={prod._id} prod={prod} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <p className="text-center mt-10 text-red-500">error in load products</p>
    );
  }
}

// import Image from "next/image";
// import { ProductItem } from "./types/productInterface";
// import { Button } from "@/components/ui/button";
// import { ProductCard } from "./_component/ProductCard/ProductCard";

// export default async function Home() {
//   let response = await fetch(
//     "https://ecommerce.routemisr.com/api/v1/products",
//     {
//       method: "GET",
//       cache: "no-store",
//       next: { revalidate: 60 },
//     },
//   );

//   let { data: allProducts }: { data: ProductItem[] } = await response.json();
//   // console.log(allProducts);
//   return (
//     <>
//       <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
//         {allProducts?.map((prod) => (
//           <ProductCard key={prod._id} prod={prod} />
//         ))}
//       </div>
//     </>
//   );
// }

// .....................
