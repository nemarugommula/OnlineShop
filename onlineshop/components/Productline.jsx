import React from "react";
import Card from "./Card";
import { useRef } from "react";
import {
  ArrowCircleRightIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Link from "next/link";

function Productline({ lineTag, products = [] }) {
  const reference = useRef();

  const handle = () => {
    reference.current.scrollLeft += 200;
  };

  return (
    <section className="bg-white my-2 ">
      <div className="flex items-center justify-between shadow-sm py-2 px-3">
        <h1 className="text-bold font-medium text-xl">{lineTag}</h1>
        <div className="hover:bg-blue-600 active:bg-blue-700 rounded-sm bg-primary text-slate-50 px-3 py-2 flex gap-2 items-center justify-center">
          <button>
            <Link href="/product">View All</Link>
          </button>
          <ArrowCircleRightIcon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div
        ref={reference}
        className="pl-2 group relative flex overflow-x-hidden scroll-smooth flex-nowrap  snap-x"
      >
        {products.length > 0 ? (
          products.map((product, index) => (
            <Card key={index} product={product} />
          ))
        ) : (
          <div className="flex py-5 w-full items-center justify-center">
            <div className="w-56 aspect-video">
              <img src="/nodata.svg " />
            </div>
            <h1 className="text-center text-2xl ml-5 font-light mt-4">
              No Products found in {lineTag}!!
            </h1>
          </div>
        )}
        <button
          onClick={handle}
          className="hover:bg-slate-100 sticky active:bg-slate-200 py-5 px-1 h-[50%] top-1/2 -translate-y-1/2 z-3 rounded-l-md shadow-xl bg-slate-50 text-primary  right-0 opacity-0  group-hover:opacity-100 "
        >
          <ChevronDoubleRightIcon className=" text-gray-800 h-9 w-9" />
        </button>
      </div>
    </section>
  );
}

export default Productline;
