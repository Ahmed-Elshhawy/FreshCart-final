"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBrands } from "@/services/brands/getBrands";
import Link from "next/link";
import { SpinnerCustom } from "./loading";

export default function BrandsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center font-bold p-5 h-screen">
        <SpinnerCustom />
        <span className="text-green-400">Proccessing Brands</span>
      </div>
    );

  if (isError) return <p>Error loading brands</p>;

  const brands = data?.data || [];

  return (
    <div className="p-4">
      <ul className="grid grid-cols-1 lg:grid-cols-4  md:grid-cols-2 gap-5">
        {brands.map((brand: any) => (
          <li key={brand._id} className="border p-2 rounded mt-4">
            <Link href={`/brands/${brand._id}`}>
              <h2 className="font-bold text-2xl text-center text-gray-600 border-b-4 pb-2">
                {brand.name}
              </h2>
              {brand.image && (
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-auto object-cover mt-2 rounded"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
