"use client";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/services/cart/add-prod-cart";
import { addToWishlist } from "@/services/wishlist/addToWishlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  // Fetch wishlist products
  const { data: wishlistData } = useQuery<WishlistResponse>({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/products",
      );
      return res.json();
    },
  });

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
  const addWishlistMutation = useMutation({
    mutationFn: (id: string) => addToWishlist(id),
    onSuccess: async (data: any) => {
      toast.success(data?.message || "Added to wishlist");

      await queryClient.invalidateQueries({ queryKey: ["get-wishlist"] });
    },
    onError: () => {
      toast.error("Login first");
    },
  });

  return (
    <div className="flex justify-around">
      <Button onClick={() => addCartMutation.mutate(productId)}>
        Add to Cart
      </Button>

      <Button onClick={() => addWishlistMutation.mutate(productId)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 bg-transparent"
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
