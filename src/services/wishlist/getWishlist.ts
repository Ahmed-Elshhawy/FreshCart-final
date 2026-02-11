// // "use server";
// // import { getAccessToken } from "@/schema/access-token";

// // export async function getWishlist() {
// //   const token = await getAccessToken();
// //   if (!token) {
// //     throw new Error("unauthorized........");
// //   }
// //   const response = await fetch(`${process.env.NEXT_PUBLIC_API}wishlist`, {
// //     cache: "no-store",
// //     method: "GET",
// //     headers: {
// //       token: token,
// //       "Content-type": "application/json",
// //     },
// //   });
// //   const payload = await response.json();
// //   console.log(payload);
// //   return payload;
// // }
// // .............
// "use server";
// import { getAccessToken } from "@/schema/access-token";

// export async function getWishlist() {
//   const token = await getAccessToken();

//   if (!token) {
//     console.warn("No token, user not logged in");
//     return null;
//   }

//   const response = await fetch(`${process.env.NEXT_PUBLIC_API}wishlist`, {
//     cache: "no-store",
//     method: "GET",
//     headers: {
//       token,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     console.error("Wishlist fetch failed:", response.status);
//     return null;
//   }

//   const payload = await response.json();
//   console.log("Wishlist Payload:", payload);
//   return payload;
// }
// ...............
"use server";
import { getAccessToken } from "@/schema/access-token";

export interface WishlistItem {
  _id: string;
  title: string;
}

export interface WishlistResponse {
  products: WishlistItem[];
}

export async function getWishlist(): Promise<WishlistResponse> {
  const token = await getAccessToken();

  if (!token) {
    console.warn("No token, user not logged in");
    return { products: [] };
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}wishlist`, {
    cache: "no-store",
    method: "GET",
    headers: {
      token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Wishlist fetch failed:", response.status);
    return { products: [] };
  }

  const payload = await response.json();

  return { products: payload.products || [] };
}
