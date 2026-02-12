// "use server";
// import { getAccessToken } from "@/schema/access-token";

// export async function deleteCartItem(productId: string) {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error("unauthorized........");
//   }

//   const response = await fetch(
//     `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
//     {
//       method: "DELETE",
//       headers: {
//         token: token,
//         "Content-type": "application/json",
//       },
//     },
//   );

//   if (!response.ok) {
//     throw new Error("Failed to delete cart item");
//   }

//   const payload = await response.json();
//   console.log(payload);
//   return payload;
// }
// ...........
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function deleteCartItem(productId: string) {
  const session = await getServerSession(authOptions);
  const token = session?.token; // حسب تخزينك في session

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to delete cart item");
  }

  return payload;
}
