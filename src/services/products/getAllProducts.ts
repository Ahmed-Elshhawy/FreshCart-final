export async function getAllProducts() {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
