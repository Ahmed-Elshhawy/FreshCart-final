import { ProductItem } from "../types/productInterface";
import { ProductCard } from "../_component/ProductCard/ProductCard";

export const revalidate = 60;

export default async function Product() {
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
      return <p className="text-center mt-10"> their is no product now</p>;
    }

    return (
      <div className="grid md:grid-cols-3 lg:grid-cols-4 mt-5 gap-5">
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
