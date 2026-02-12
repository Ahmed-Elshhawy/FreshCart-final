// "use server";
// import { getAccessToken } from "@/schema/access-token";
// import { decode } from "next-auth/jwt";
// import { cookies } from "next/headers";

// export async function removeFromWishlist(productId: string) {
//   const token = await getAccessToken();
//   if (!token) {
//     throw new Error("unauthorized........");
//   }
//   const response = await fetch(
//     `${process.env.NEXT_PUBLIC_API}wishlist/${productId}`,
//     {
//       method: "DELETE",
//       headers: {
//         token: token,
//         "Content-type": "application/json",
//       },
//     },
//   );
//   const payload = await response.json();
//   console.log(payload);
//   return payload;
// }
// //server action (post ,put ,delete)
// // ..............ظ
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function removeFromWishlist(productId: string) {
  const session = await getServerSession(authOptions);
  const token = session?.token;

  if (!token) {
    throw new Error("Unauthorized: User not logged in");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const err = await response.json().catch(() => null);
    throw new Error(err?.message || "Failed to remove from wishlist");
  }

  const payload = await response.json();
  console.log(payload);
  return payload;
}
