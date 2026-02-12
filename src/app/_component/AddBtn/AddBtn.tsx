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

  // Fetch wishlist safely
  const { data: wishlistData } = useQuery<WishlistResponse>({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      if (!session) return { data: [] }; // مهم: يمنع crash لو مش مسجل دخول
      const res = await fetch("/api/wishlist");
      if (!res.ok) throw new Error("Failed to fetch wishlist");
      return res.json();
    },
    enabled: !!session,
  });

  const isInWishlist =
    wishlistData?.data?.some((p) => p._id === productId) ?? false;

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

  // Toggle wishlist safely
  const handleToggleWishlist = () => {
    if (!session) {
      toast.error("Login first");
      return;
    }
    if (isInWishlist) removeMutation.mutate();
    else addMutation.mutate();
  };

  const handleAddToCart = () => {
    if (!session) {
      toast.error("Login first");
      return;
    }
    addCartMutation.mutate(productId);
  };

  return (
    <div className="flex justify-around gap-2 items-center">
      <Button className="cursor-pointer px-4 py-2" onClick={handleAddToCart}>
        Add to Cart
      </Button>

      <Button
        onClick={handleToggleWishlist}
        className="bg-white cursor-pointer hover:bg-white focus:bg-white active:bg-white border-black p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isInWishlist ? "red" : "none"}
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="black"
          className="w-6 h-6"
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
