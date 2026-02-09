"use server";
import { getAccessToken } from "@/schema/access-token";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function deleteCartItem(productId: string) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized........");
  }
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "Content-type": "application/json",
      },
    },
  );
  const payload = await response.json();
  console.log(payload);
  return payload;
}
//server action (post ,put ,delete)
