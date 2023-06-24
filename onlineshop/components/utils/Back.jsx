import React from "react";
import Router, { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/solid";

function Back({ border, padding }) {
  const router = useRouter();
  return (
    <div className={`${border} ${padding}`}>
      <button
        onClick={() => router.back()}
        className="flex gap-1 py-1 rounded-sm  items-center justify-start"
      >
        <ChevronLeftIcon className="w-8 h-8" />
        <p className=" text-xl">Back</p>
      </button>
    </div>
  );
}

export default Back;
