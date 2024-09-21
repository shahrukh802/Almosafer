"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Back = () => {
  const router = useRouter();
  return (
    <button
      className="bg-btn text-md text-[#e4f1f5] py-2 px-6 rounded-3xl hover:shadow-lg hover:text-white"
      onClick={() => router.back()}
    >
      {"<- Back"}
    </button>
  );
};

export default Back;
