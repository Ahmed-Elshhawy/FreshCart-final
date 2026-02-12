// "use server";
// import { getAccessToken } from "@/schema/access-token";

// export async function clearCart() {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error("unauthorized........");
//   }
//   const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
//     method: "DELETE",
//     headers: {
//       token: token,
//       "Content-type": "application/json",
//     },
//   });
//   const payload = await response.json();
//   console.log(payload);
//   return payload;
// }
// //server action (post ,put ,delete)
// ............
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function clearCart() {
  const session = await getServerSession(authOptions);

  const token = session?.token; // حسب ما انت مخزنه في session

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to clear cart");
  }

  return payload;
}
