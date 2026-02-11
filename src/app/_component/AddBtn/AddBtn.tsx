"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/cart/add-prod-cart";
import { addToWishlist } from "@/services/wishlist/addToWishlist";
import { removeFromWishlist } from "@/services/wishlist/removeFromWishlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import React from "react";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

interface WishlistResponse {
  data: Product[];
}

export default function AddBtn({ productId }: { productId: string }) {
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // Fetch wishlist
  const { data: wishlistData } = useQuery<WishlistResponse>({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      const res = await fetch("/api/wishlist");
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      return res.json();
    },
    enabled: !!session,
  });

  const isInWishlist = wishlistData?.data.some((p) => p._id === productId);

  // Add to Cart
  const addCartMutation = useMutation({
    mutationFn: (id: string) => addToCart(id),
    onSuccess: (data: any) => {
      toast.success(data?.message || "Added to cart");
      queryClient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.error("Login first");
    },
  });

  // Add to Wishlist
  const addMutation = useMutation({
    mutationFn: () => addToWishlist(productId),
    onSuccess: async () => {
      toast.success("Added to wishlist");
      await queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
    },
    onError: () => toast.error("Login first"),
  });

  // Remove from Wishlist
  const removeMutation = useMutation({
    mutationFn: () => removeFromWishlist(productId),
    onSuccess: async () => {
      toast.success("Removed from wishlist");
      await queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
    },
    onError: () => toast.error("Login first"),
  });

  // Toggle wishlist
  const handleToggleWishlist = () => {
    if (!session) {
      toast.error("Login first");
      return;
    }

    if (isInWishlist) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

  const handleAddToCart = () => {
    if (!session) {
      toast.error("Login first");
      return;
    }
    addCartMutation.mutate(productId);
  };

  return (
    <div className="flex justify-around gap-2">
      <Button className="cursor-pointer" onClick={handleAddToCart}>
        Add to Cart
      </Button>

      <Button
        onClick={handleToggleWishlist}
        className="bg-white cursor-pointer hover:bg-white focus:bg-white active:bg-white border-black p-3 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isInWishlist ? "red" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="black"
          className="w-16 h-16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </Button>
    </div>
  );
}

// ............
// "use client";

// import { Button } from "@/components/ui/button";
// import { addToCart } from "@/services/cart/add-prod-cart";
// import { addToWishlist } from "@/services/wishlist/addToWishlist";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React from "react";
// import toast from "react-hot-toast";

// interface Product {
//   _id: string;
//   title: string;
//   imageCover: string;
//   price: number;
// }

// interface WishlistResponse {
//   data: Product[];
// }

// export default function AddBtn({ productId }: { productId: string }) {
//   const queryClient = useQueryClient();

//   // Fetch wishlist from real API
//   const { data: wishlistData } = useQuery<WishlistResponse>({
//     queryKey: ["get-wishlist"],
//     queryFn: async () => {
//       const res = await fetch("/api/wishlist"); // خليها endpoint بتاعك
//       if (!res.ok) throw new Error("Failed to fetch wishlist");
//       return res.json();
//     },
//   });

//   // Check if product is already in wishlist
//   const isInWishlist = wishlistData?.data.some((p) => p._id === productId);

//   // Add to Cart
//   const addCartMutation = useMutation({
//     mutationFn: (id: string) => addToCart(id),
//     onSuccess: (data: any) => {
//       toast.success(data?.message || "Added to cart");
//       queryClient.invalidateQueries({ queryKey: ["get-cart"] });
//     },
//     onError: () => {
//       toast.error("Login first");
//     },
//   });

//   // Add to Wishlist
//   const addWishlistMutation = useMutation({
//     mutationFn: (id: string) => addToWishlist(id),
//     onSuccess: async (data: any) => {
//       toast.success(data?.message || "Added to wishlist");
//       await queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
//     },
//     onError: () => {
//       toast.error("Login first");
//     },
//   });

//   return (
//     <div className="flex justify-around gap-2">
//       <Button onClick={() => addCartMutation.mutate(productId)}>
//         Add to Cart
//       </Button>

//       <Button
//         onClick={() => addWishlistMutation.mutate(productId)}
//         className="bg-white hover:bg-white  focus:bg-white active:bg-white border-black p-2 rounded-full"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill={isInWishlist ? "red" : "none"} // أسود قبل الضغط، أحمر بعد الإضافة
//           viewBox="0 0 24 24"
//           strokeWidth={2}
//           stroke="black"
//           className="w-12 h-12"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//           />
//         </svg>
//       </Button>
//     </div>
//   );
// }

// "use client";
// import { Button } from "@/components/ui/button";
// import { addToCart } from "@/services/cart/add-prod-cart";
// import { addToWishlist } from "@/services/wishlist/addToWishlist";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import React from "react";
// import toast from "react-hot-toast";

// interface Product {
//   _id: string;
//   title: string;
//   imageCover: string;
//   price: number;
// }

// interface WishlistResponse {
//   data: Product[];
// }

// export default function AddBtn({ productId }: { productId: string }) {
//   const queryClient = useQueryClient();

//   // Fetch wishlist products
//   const { data: wishlistData } = useQuery<WishlistResponse>({
//     queryKey: ["get-wishlist"],
//     queryFn: async () => {
//       const res = await fetch("/products");
//       return res.json();
//     },
//   });

//   // Add to Cart
//   const addCartMutation = useMutation({
//     mutationFn: (id: string) => addToCart(id),
//     onSuccess: (data: any) => {
//       toast.success(data?.message || "Added to cart");
//       queryClient.invalidateQueries({ queryKey: ["get-cart"] });
//     },
//     onError: () => {
//       toast.error("Login first");
//     },
//   });

//   // Add to Wishlist
//   const addWishlistMutation = useMutation({
//     mutationFn: (id: string) => addToWishlist(id),
//     onSuccess: async (data: any) => {
//       toast.success(data?.message || "Added to wishlist");

//       await queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
//     },
//     onError: () => {
//       toast.error("Login first");
//     },
//   });

//   return (
//     <div className="flex justify-around">
//       <Button onClick={() => addCartMutation.mutate(productId)}>
//         Add to Cart
//       </Button>

//       <Button onClick={() => addWishlistMutation.mutate(productId)}>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6 bg-transparent"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//           />
//         </svg>
//       </Button>
//     </div>
//   );
// }
// // ............
// // "use client";

// // import { Button } from "@/components/ui/button";
// // import { addToCart } from "@/services/cart/add-prod-cart";
// // import { addToWishlist } from "@/services/wishlist/addToWishlist";
// // import { useMutation, useQueryClient } from "@tanstack/react-query";
// // import React from "react";
// // import toast from "react-hot-toast";

// // interface AddBtnProps {
// //   productId: string;
// // }

// // export default function AddBtn({ productId }: AddBtnProps) {
// //   const queryClient = useQueryClient();

// //   // Add to Cart
// //   const addCartMutation = useMutation({
// //     mutationFn: (id: string) => addToCart(id),
// //     onSuccess: (data: any) => {
// //       toast.success(data?.message || "Added to cart");
// //       queryClient.invalidateQueries({ queryKey: ["get-cart"] });
// //     },
// //     onError: () => {
// //       toast.error("Login first");
// //     },
// //   });

// //   // Add to Wishlist
// //   const addWishlistMutation = useMutation({
// //     mutationFn: (id: string) => addToWishlist(id),
// //     onSuccess: (data: any) => {
// //       toast.success(data?.message || "Added to wishlist");
// //       queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
// //     },
// //     onError: () => {
// //       toast.error("Login first");
// //     },
// //   });

// //   return (
// //     <div className="flex justify-around gap-2">
// //       <Button onClick={() => addCartMutation.mutate(productId)}>
// //         Add to Cart
// //       </Button>

// //       <Button onClick={() => addWishlistMutation.mutate(productId)}>
// //         <svg
// //           xmlns="http://www.w3.org/2000/svg"
// //           fill="none"
// //           viewBox="0 0 24 24"
// //           strokeWidth={1.5}
// //           stroke="currentColor"
// //           className="w-6 h-6"
// //         >
// //           <path
// //             strokeLinecap="round"
// //             strokeLinejoin="round"
// //             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
// //           />
// //         </svg>
// //       </Button>
// //     </div>
// //   );
// // }
