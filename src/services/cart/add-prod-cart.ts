// "use server";
// import { getAccessToken } from "@/schema/access-token";
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function addToCart(productId: string) {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error("unauthorized........");
//   }
//   const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
//     cache: "no-store",
//     method: "POST",
//     headers: {
//       token: token,
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({
//       productId,
//     }),
//   });
//   const payload = await response.json();
//   console.log(payload);
//   return payload;
// }
//server action (post ,put ,delete)

"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function addToCart(productId: string) {
  const session = await getServerSession(authOptions);

  const token = session?.token;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    cache: "no-store",
    method: "POST",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const payload = await response.json();
  return payload;
}
