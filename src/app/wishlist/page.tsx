"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Image from "next/image";
import cartImg from "../../assets/images/cart.png";
import { removeFromWishlist } from "@/services/wishlist/removeFromWishlist"; // <<==== server action

interface Product {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
}

interface WishlistAPIResponse {
  status: string;
  message: string;
  data: Product[];
}

export default function WishlistPage() {
  const { data: session } = useSession();
  const token = (session?.user as any)?.token;
  const queryClient = useQueryClient();

  // Fetch wishlist
  const { data, isLoading } = useQuery<WishlistAPIResponse>({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      if (!token) return { status: "unauthenticated", message: "", data: [] };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}wishlist`, {
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch wishlist");
      return res.json();
    },
    enabled: !!token,
  });

  // Remove from wishlist using server action
  const removeMutation = useMutation({
    mutationFn: async (productId: string) => {
      return await removeFromWishlist(productId);
    },
    onSuccess: (_data, productId) => {
      toast.success("Removed from wishlist");

      // Update table immediately without refetching
      queryClient.setQueryData<WishlistAPIResponse>(["get-wishlist"], (old) => {
        if (!old) return { status: "success", message: "", data: [] };
        return {
          ...old,
          data: old.data.filter((prod) => prod._id !== productId),
        };
      });
    },
    onError: (err: any) => {
      toast.error(err.message || "Error removing product");
    },
  });

  if (isLoading)
    return <p className="text-center mt-10">Loading wishlist...</p>;

  if (!data || !data.data || data.data.length === 0)
    return (
      <div className="flex justify-center mt-20">
        <Image src={cartImg} alt="wishlist empty" width={400} height={400} />
      </div>
    );

  return (
    <div className="p-4  ">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((prod) => (
            <tr key={prod._id}>
              <td className="p-2 border">
                <img src={prod.imageCover} className="w-16" />
              </td>
              <td className="p-2 border">{prod.title}</td>
              <td className="p-2 border">{prod.price} EGP</td>
              <td className="p-2 border">
                <Button
                  className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                  onClick={() => removeMutation.mutate(prod._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
