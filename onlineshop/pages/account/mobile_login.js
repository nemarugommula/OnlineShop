import React from "react";

function Mobile() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-stone-200">
      <div className="h-2/4 bg-primary rounded-lg aspect-square shadow-xl px-2 py-3 flex flex-col gap-5 justify-start items-center">
        <div className="block ">
          <div className="">
            <label className="block text-grey-500 my-2 ml-4 font-light text-lg">
              Enter Mobile No.
            </label>
            <div className=" flex gap-2 ml-4">
              <div className="flex justiy-center items-center shadow-lg">
                <span className="px-3 py-1 text-xl leading-10 rounded-l-md tracking-widest bg-white">
                  +91
                </span>
                <input
                  placeHolder="912345678"
                  type="number"
                  className=" outline-none px-3 py-1 text-xl leading-10 rounded-r-md tracking-widest"
                />
              </div>
              <button className="shadow-lg bg-orange-500 rounded-md outline-none px-3 ">
                Send OTP
              </button>
            </div>
          </div>
          <img className="w-full  h-full" src="/mobile.svg"/>
        </div>
      </div>
    </div>
  );
}

export default Mobile;
