"use server";
import { getAccessToken } from "@/schema/access-token";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function addToCart(productId: string) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized........");
  }
  const response = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    cache: "no-store",
    method: "POST",
    headers: {
      token: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}
//server action (post ,put ,delete)

// ...........
// app/services/cart/add-prod-cart.ts
// "use server";

// import { cookies } from "next/headers";
// import { getAccessToken } from "@/schema/access-token";

// interface AddToCartResponse {
//   status: string;
//   message: string;
//   data?: any;
// }

// /**
//  * Server Action: Add product to cart
//  * @param productId string
//  * @returns AddToCartResponse
//  */
// export async function addToCart(productId: string): Promise<AddToCartResponse> {
//   try {
//     // جلب الـ token
//     const token = await getAccessToken();

//     if (!token) {
//       throw new Error("Unauthorized: Login first");
//     }

//     const response = await fetch(`${process.env.NEXT_PUBLIC_API}cart`, {
//       method: "POST",
//       cache: "no-store",
//       headers: {
//         "Content-Type": "application/json",
//         token: token,
//       },
//       body: JSON.stringify({ productId }),
//     });

//     if (!response.ok) {
//       const errData = await response.json();
//       throw new Error(errData?.message || "Failed to add product to cart");
//     }

//     const data = await response.json();
//     return {
//       status: "success",
//       message: data?.message || "Product added to cart",
//       data,
//     };
//   } catch (error: any) {
//     return {
//       status: "error",
//       message: error.message || "Something went wrong",
//     };
//   }
// }
