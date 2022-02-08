import React from "react";
import { Image } from "next/image";
import { DeviceMobileIcon } from "@heroicons/react/outline";
import Toast from "../../components/utils/Toast";

function Login() {
  return (
    <div className="flex  relative items-center justify-center w-screen h-screen bg-stone-200">
      <div className="h-2/4 bg-primary rounded-lg aspect-square shadow-xl px-2 py-3 ">
        <img
          className="block pt-2 w-24 mt-2 h-24 object-fit ring-offset-1 ring-1 ring-slate-50 rounded-full mx-auto"
          src="/secure_login.svg"
        />
        <div className="p-5 mx-auto w-[80%] flex flex-col gap-3">
          <input
            placeHolder="Username"
            className=" block outline-none px-3 py-1 rounded-sm shadow-sm bg-slate-50"
          />
          <input
            placeHolder="Password"
            type="password"
            className="focus:bg-white  block outline-none px-3 py-1 rounded-sm shadow-sm bg-slate-50"
          />
          <button className="bg-orange-500 p-2 ">Login</button>
        </div>
        <div className="p-2 flex items-center justify-center gap-2 mt-3">
          <button className="shadow-sm bg-slate-50 p-2 flex gap-1 rounded-md outline-none text-grey-50 ">
            <p>SignIn with Mobile</p>{" "}
            <button className="">
              <DeviceMobileIcon className="w-5 h-5 text-primary" />
            </button>
          </button>
          <button className="shadow-sm flex items-center bg-slate-50 p-2 gap-1 rounded-md outline-none text-grey-50 ">
            <p>SignIn with Google</p>{" "}
            <img src="/google.png" className="block w-4 h-4" />
          </button>
        </div>
        <div className="text-center text-teal-400">or</div>
        <div className="text-center flex justify-center ">
          <button className="rounded-md bg-teal-500 p-2 w-1/2">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
