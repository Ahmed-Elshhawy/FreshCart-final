"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getBrandById } from "@/services/brands/getBrandById";
import { useParams } from "next/navigation";

export default function BrandPage() {
  const params = useParams();
  let id = params?.id;

  if (Array.isArray(id)) id = id[0];

  const { data, isLoading, isError } = useQuery({
    queryKey: ["brand", id],
    queryFn: () => getBrandById(id!),
    enabled: !!id,
  });

  if (!id) return <p>No brand ID</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  const brand = data?.data;

  return (
    <>
      <div className=" flex justify-around items-center ">
        <div>
          <h1 className="text-3xl font-bold border-2 border-gray-950 px-5 py-3 mt-5">
            {brand?.name}
          </h1>
          <p className="mt-4 text-gray-800">Slug: {brand?.slug}</p>
          <p className="mt-4 text-gray-800 text-sm">
            Created: {brand?.createdAt?.slice(0, 10)}
          </p>
          <p className="mt-4 text-gray-800 text-sm">
            ID: {brand?._id?.slice(0, 8)}...
          </p>
        </div>
        <div>
          <img
            src={brand?.image}
            alt={brand?.name}
            className="w-120 h-120 object-contain mt-4 border-green-300  border-4"
          />
        </div>
      </div>
    </>
  );
}
