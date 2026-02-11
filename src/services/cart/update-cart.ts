"use server";
import { getAccessToken } from "@/schema/access-token";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function updateCartItem({
  productId,
  count,
}: {
  productId: string;
  count: number;
}) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized........");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token: token,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        count: count,
      }),
    },
  );
  const payload = await response.json();
  console.log(payload);
  return payload;
}
//server action (post ,put ,delete)
