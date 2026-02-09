import Image from "next/image";
import { ProductItem } from "./types/productInterface";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./_component/ProductCard/ProductCard";

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
      <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {allProducts?.map((prod) => (
          <ProductCard key={prod._id} prod={prod} />
        ))}
      </div>
    </>
  );
}

// .....................
// "use client"; // مهم لو عايز تستخدم client-side features زي localStorage

// import Image from "next/image";
// import { ProductItem } from "./types/productInterface";
// import { ProductCard } from "./_component/ProductCard/ProductCard";
// // import AddToWishlistBtn from "@/components/ui/AddToWishlistBtn";
// import React, { useEffect, useState } from "react";

// export default function Home() {
//   const [allProducts, setAllProducts] = useState<ProductItem[] | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           "https://ecommerce.routemisr.com/api/v1/products",
//           {
//             method: "GET",
//             cache: "no-store",
//             next: { revalidate: 60 },
//           },
//         );

//         if (!response.ok) {
//           const text = await response.text(); // ممكن HTML لو فيه خطأ
//           console.error("Failed to fetch products:", text);
//           setError("Failed to load products from server.");
//           setLoading(false);
//           return;
//         }

//         const json = await response.json();
//         setAllProducts(json.data);
//       } catch (err: any) {
//         console.error(err);
//         setError("An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading products...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//   return (
//     <div className="grid md:grid-cols-3 mt-5 lg:grid-cols-4 xl:grid-cols-5 gap-5">
//       {allProducts?.map((prod) => (
//         <ProductCard key={prod._id} prod={prod} />
//       ))}
//     </div>
//   );
// }
