export const getBrands = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}brands`);
  if (!res.ok) throw new Error("Failed to fetch brands");
  return res.json();
};
