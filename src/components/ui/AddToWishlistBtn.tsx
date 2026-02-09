// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { useSession } from "next-auth/react";

// export default function AddToWishlistBtn({ productId }: { productId: string }) {
//   const queryClient = useQueryClient();
//   const { data: session } = useSession();

//   const token = session?.user?.token;

//   const addMutation = useMutation({
//     mutationFn: async () => {
//       if (!token) throw new Error("Please login first");
//       const resp = await fetch(
//         `${process.env.NEXT_PUBLIC_API}wishlist/${productId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );
//       if (!resp.ok) throw new Error("Failed to add to wishlist");
//       return resp.json();
//     },
//     onSuccess: () => {
//       toast.success("Added to wishlist");
//       queryClient.invalidateQueries(["wishlist"]);
//     },
//     onError: (err: any) => {
//       toast.error(err.message || "Error adding to wishlist");
//     },
//   });

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth={1.5}
//       stroke="currentColor"
//       className="w-6 h-6 cursor-pointer"
//       onClick={() => addMutation.mutate()}
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//       />
//     </svg>
//   );
// }
