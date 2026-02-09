"use server";
import { getAccessToken } from "@/schema/access-token";

export async function getWishlist() {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized........");
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}wishlist`, {
    cache: "no-store",
    method: "GET",
    headers: {
      token: token,
      "Content-type": "application/json",
    },
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}
