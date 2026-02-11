"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CartResponse } from "../types/cartResponse";
import { deleteCartItem } from "@/services/cart/delete-cart-item";
import toast from "react-hot-toast";
import { updateCartItem } from "@/services/cart/update-cart";
import { Button } from "@/components/ui/button";
import { clearCart } from "@/services/cart/clear-cart";
import cartImg from "../../assets/images/cart.png";
import Image from "next/image";

export default function Cart() {
  const queryClient = useQueryClient();

  const {
    data: CartData,
    isLoading,
    isError,
  } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const resp = await fetch("/api/cart");
      const payload = await resp.json();
      return payload;
    },
  });

  //delete cart
  const {
    mutate: delCartItem,
    isPending,
    isError: isCartError,
  } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.success("product deleted");
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
    onError: () => {
      toast.error("Error");
    },
  });
  //update updateCartItem
  const {
    mutate: updateCart,
    isPending: updateLoading,
    isError: isupdateError,
  } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      toast.success("product updated");
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
    onError: () => {
      toast.error("Error");
    },
  });

  //clear cart
  const { mutate: removeCart, data } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("cart deleted");
      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },
    onError: () => {
      toast.error("Error");
    },
  });

  function handleUpdate(productId: string, count: number) {
    updateCart({ productId, count });
  }

  if (isLoading) {
    return <h2>Loading....</h2>;
  }
  if (isError) {
    return <h2>Error....</h2>;
  }

  return (
    <>
      {CartData && CartData.numOfCartItems > 0 ? (
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-3/4">
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default my-10">
              <table className="w-1/2 sm:w-full text-sm text-left rtl:text-right text-body ">
                <thead className="text-sm text-body bg-gray-100 border-b border-default-medium">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CartData?.data.products.map((prod) => {
                    return (
                      <tr
                        key={prod._id}
                        className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
                      >
                        <td className="p-4">
                          <img
                            src={prod.product.imageCover}
                            className="w-16 md:w-24 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {prod.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <form className="max-w-xs mx-auto">
                            <label
                              htmlFor="counter-input-1"
                              className="sr-only"
                            >
                              Choose quantity:
                            </label>
                            <div className="relative flex items-center">
                              <button
                                onClick={() => {
                                  if (prod.count > 1) {
                                    handleUpdate(
                                      prod.product._id,
                                      prod.count - 1,
                                    );
                                  }
                                }}
                                type="button"
                                id="decrement-button-1"
                                data-input-counter-decrement="counter-input-1"
                                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                              >
                                <svg
                                  className="w-3 h-3 text-heading"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 12h14"
                                  />
                                </svg>
                              </button>
                              <span
                                id={`counter-input-${prod._id}`}
                                data-input-counter
                                className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 mx-3 max-w-10  text-center"
                              >
                                {/* max-w-[2.5rem] */}
                                {prod.count}
                              </span>
                              <button
                                onClick={() => {
                                  handleUpdate(
                                    prod.product._id,
                                    prod.count + 1,
                                  );
                                }}
                                type="button"
                                id="increment-button-1"
                                data-input-counter-increment="counter-input-1"
                                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                              >
                                <svg
                                  className="w-3 h-3 text-heading"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 12h14m-7 7V5"
                                  />
                                </svg>
                              </button>
                            </div>
                          </form>
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {prod.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => {
                              if (confirm("Are you sure?")) {
                                delCartItem(prod.product._id);
                              }
                            }}
                            className="font-medium text-fg-danger bg-gray-200 px-4 py-2 rounded-2xl  cursor-pointer"
                          >
                            Remove
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Button
                onClick={() => {
                  removeCart();
                }}
                className="my-4  w-full"
              >
                Clear Cart
              </Button>
            </div>
          </div>
          <div className=" w-full lg:w-1/4">
            <div className="border p-4 my-10">
              <h2 className="text-xl my-4">
                Number of cart items :
                <span className="text-xl ps-1 text-green-400">
                  {CartData?.numOfCartItems}
                </span>
              </h2>
              <h2 className="text-xl">
                Total Price :
                <span className="text-xl ps-1 text-green-400">
                  {CartData?.data.totalCartPrice} EGP
                </span>
              </h2>
              <Button className="my-4 ">Check Out</Button>
            </div>
          </div>
        </div>
      ) : (
        <Image
          src={cartImg}
          alt="cart"
          width={300}
          height={300}
          className="object-cover mt-10 mx-auto"
        />
      )}
    </>
  );
}
