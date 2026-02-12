// "use server";
// import { getAccessToken } from "@/schema/access-token";
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function updateCartItem({
//   productId,
//   count,
// }: {
//   productId: string;
//   count: number;
// }) {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error("unauthorized........");
//   }
//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
//     {
//       method: "PUT",
//       headers: {
//         token: token,
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify({
//         count: count,
//       }),
//     },
//   );
//   const payload = await response.json();
//   console.log(payload);
//   return payload;
// }
// //server action (post ,put ,delete)
// ...........
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function updateCartItem({
  productId,
  count,
}: {
  productId: string;
  count: number;
}) {
  const session = await getServerSession(authOptions);
  const token = session?.token; // حسب تخزينك في session

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
      cache: "no-store",
    },
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to update cart");
  }

  return payload;
}
