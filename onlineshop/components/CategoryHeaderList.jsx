import React from "react";
import categories from "../data_utils/categoryDataFiller";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Navlinksdata from "../data_utils/navLinkDataFiller";
import { useState, useEffect } from "react";
import UserHomepageContext from "../context/globalContext";
import { motion } from "framer-motion";
import Link from "next/link";
function CategoryHeaderList({ categories = [] }) {
  return (
    <div className="bg-slate-50 px-3 py-2 shadow-sm">
      <div className=" flex gap-2 items-center justify-center  max-w-screen-xl mx-auto ">
        {categories.map((category, index) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="px-2 text-center"
            key={index}
          >
            <Link href={"/categories/" + category.id}>
              <a>
                <img
                  className="block w-24 h-24 object-cover rounded-md shadow-sm shadow-gray-400"
                  src={category.picture}
                />
                <h1 className="font-light text-sm">{category.name}</h1>
              </a>
            </Link>
          </motion.div>
        ))}
        {categories.length >= 5 ? (
          <button className="hover:bg-slate-100 active:bg-slate-200 ml-2 shadow-lg  p-4 rounded-full">
            <Link href="/categories">
              <a>
                <ArrowRightIcon className="h-7 w-7 text-primary" />
              </a>
            </Link>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CategoryHeaderList;
