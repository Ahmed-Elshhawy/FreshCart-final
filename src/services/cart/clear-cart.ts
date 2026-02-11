"use server";
import { getAccessToken } from "@/schema/access-token";

export async function clearCart() {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized........");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "DELETE",
    headers: {
      token: token,
      "Content-type": "application/json",
    },
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}
//server action (post ,put ,delete)
