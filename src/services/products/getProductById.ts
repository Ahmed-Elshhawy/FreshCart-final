export async function getProductById(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
  );

  if (!res.ok) throw new Error("Failed to fetch product");

  return res.json();
}
