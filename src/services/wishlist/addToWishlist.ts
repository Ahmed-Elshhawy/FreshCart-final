"use server";

import { getAccessToken } from "@/schema/access-token";

export async function addToWishlist(productId: string) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("Unauthorized: User not logged in");
  }

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "POST",
      cache: "no-store",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
      }),
    },
  );

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || "Failed to add product to wishlist");
  }

  return response.json();
}
