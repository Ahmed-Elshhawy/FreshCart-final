export const getBrandById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}brands/${id}`);
  if (!res.ok) throw new Error("Failed to fetch brand");
  return res.json();
};
