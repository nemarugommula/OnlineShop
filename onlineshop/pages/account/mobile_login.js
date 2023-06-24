import React from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";

function Mobile() {
  return (
    <div className="flex items-center  justify-center w-screen h-screen bg-stone-200">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className=" bg-primary rounded-lg  shadow-xl shadow-primary p-5 pt-2"
      >
        <Link href="/account/login" passHref>
          <a className="flex  mb-2 text-slate-300 items-center justify-start">
            <ChevronLeftIcon className="h-10 w-10" />
            <button className="inline-block tracking-widest font-xl">
              BACK
            </button>
          </a>
        </Link>
        <div className="px-5 ">
          <label className="block text-grey-800 mb-2  font-light tracking-widest text-xl">
            Enter Mobile No.
          </label>
          <div className=" flex gap-3">
            <div className="flex justiy-center items-center shadow-lg">
              <span className="px-3 py-1 text-xl leading-10 rounded-l-md tracking-widest bg-white">
                +91
              </span>
              <input
                placeholder="912345678"
                type="number"
                className=" outline-none px-3 py-1 text-xl leading-10 rounded-r-md tracking-widest"
              />
            </div>
            <button className="shadow-lg  hover:bg-orange-600 active:bg-orange-700 bg-orange-500 tracking-widest rounded-md outline-none px-3 ">
              SEND OTP
            </button>
          </div>
        </div>
        <div className=" flex items-center justify-center py-5">
          <img alt="" className="w-96 block" src="/mobile.svg" />
        </div>
      </motion.div>
    </div>
  );
}

export default Mobile;
