// ..............
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuBasic } from "../DropDown/DropDown";
import imgLogo from "../../../assets/images/imgLogo.svg";
import { CartResponse } from "@/app/types/cartResponse";
import { useQuery } from "@tanstack/react-query";
import { getWishlist } from "@/services/wishlist/getWishlist";
import toast from "react-hot-toast";

interface WishlistItem {
  _id: string;
  title: string;
}

export default function Navbar() {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const { data: CartData } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const resp = await fetch("/api/cart");
      if (!resp.ok) throw new Error("Failed to fetch cart");
      return resp.json();
    },
    enabled: status === "authenticated",
  });

  const { data: wishlistData } = useQuery<{ products: WishlistItem[] }>({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: status === "authenticated",
  });

  const wishlistIds = wishlistData?.products?.map((item) => item._id) || [];

  function toggleNav() {
    setIsOpen(!isOpen);
  }

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  const path = [
    { href: "/", content: "Home" },
    { href: "/products", content: "Products" },
    { href: "/brands", content: "Brands" },
  ];

  const authPath = [
    { href: "/login", content: "Login" },
    { href: "/register", content: "Register" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const getLinkClass = (href: string) =>
    `inline-flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
      isActive(href)
        ? "bg-emerald-500/90 text-white font-semibold"
        : "text-heading hover:bg-neutral-tertiary md:hover:bg-transparent"
    }`;

  const handleCartClick = (e: React.MouseEvent) => {
    if (status !== "authenticated") {
      e.preventDefault();
      toast.error("Login first");
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    if (status !== "authenticated") {
      e.preventDefault();
      toast.error("Login first");
    }
  };

  return (
    <nav className="bg-gray-200 py-2 sticky top-0 z-50">
      <div className="max-w-screen flex flex-wrap md:flex-nowrap md:gap-16 items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link
          href="/"
          className="self-center flex flex-col items-center text-xl text-heading font-semibold whitespace-nowrap"
        >
          <Image
            src={imgLogo}
            alt="logo"
            width={200}
            height={100}
            loading="eager"
            className="w-full h-auto"
          />
        </Link>

        {/* Mobile Button */}
        <button
          onClick={toggleNav}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth={2}
              d="M5 7h14M5 12h14M5 17h14"
            />
          </svg>
        </button>

        {/* Menu */}
        <div
          className={`${!isOpen && "hidden"} w-full md:flex justify-between`}
        >
          {/* Left Links */}
          <ul className="font-medium flex flex-col p-4 md:p-0 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-1 md:bg-transparent items-center">
            {path.map((elem) => (
              <li key={elem.content}>
                <Link href={elem.href} className={getLinkClass(elem.href)}>
                  {elem.content}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Links */}
          <ul className="font-medium flex flex-col p-4 md:p-0 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-1 md:bg-transparent gap-6 md:gap-8 items-center">
            {status === "authenticated" ? (
              <>
                <li>Hi, {session?.user?.name}</li>

                {/* Cart Icon */}
                <li className="relative">
                  {CartData?.numOfCartItems ? (
                    <Badge className="absolute start-3 -top-4 bg-green-400 text-white">
                      {CartData.numOfCartItems}
                    </Badge>
                  ) : null}

                  <Link href="/cart" onClick={handleCartClick}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </Link>
                </li>

                {/* Wishlist Icon */}
                <li className="relative">
                  <Link
                    href="/wishlist"
                    className="flex items-center relative "
                    onClick={handleWishlistClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={wishlistIds.length > 0 ? "none" : "red"}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                    {wishlistIds.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs">
                        {wishlistIds.length}
                      </Badge>
                    )}
                  </Link>
                </li>

                <DropdownMenuBasic logout={logout} />
              </>
            ) : (
              authPath.map((elem) => (
                <li key={elem.content}>
                  <Link href={elem.href} className={getLinkClass(elem.href)}>
                    {elem.content}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
