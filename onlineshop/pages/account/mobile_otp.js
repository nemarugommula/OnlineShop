import React from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";

function Timer() {
  return <div className="my-2 text-center">Timer</div>;
}
function OTP() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-stone-200">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-primary rounded-lg shadow-primary shadow-xl "
      >
        <Link href="/account/mobile_login" passHref>
          <a className="flex mt-2 text-slate-300 items-center justify-start">
            <ChevronLeftIcon className="h-10 w-10" />
            <button className="inline-block tracking-widest font-xl">
              BACK
            </button>
          </a>
        </Link>
        <div className="pl-5">
          <div className="text-left">
            <label className="block text-grey-500 my-2 tracking-widest  text-lg">
              ENTER OTP
            </label>
            <div className=" flex gap-2 justify-start  ">
              <input
                placeholder="123456"
                type="number"
                className=" inline-block placeholder:text-center outline-none px-3 py-1 text-xl leading-10 rounded-md tracking-widest"
              />
              <button className="shadow-lg tracking-widest hover:bg-orange-600 active:bg-orange-700 bg-orange-500 rounded-md outline-none px-3 ">
                VERIFY
              </button>
            </div>
          </div>
          <Timer />
          <div className="w-96">
            <img className="block " src="/otp.svg" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default OTP;
