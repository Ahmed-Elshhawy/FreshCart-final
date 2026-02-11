"use server";
import { getAccessToken } from "@/schema/access-token";

export async function deleteCartItem(productId: string) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized........");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "Content-type": "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete cart item");
  }

  const payload = await response.json();
  console.log(payload);
  return payload;
}
