import React from "react";

function Register() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-stone-200">
      <div  className="h-2/4  bg-primary rounded-lg aspect-square shadow-xl px-2 py-3 flex justify-center items-center">
        <div style={{backgroundImage:"url('/register.svg')"}} className="bg-no-repeat bg-bottom bg-contain bg- p-5 mx-auto w-[80%] flex flex-col gap-3">
       
        <input
            placeHolder="First Name"
            className=" outline-none px-4 py-1 text-xl leading-10 rounded-md tracking-widest"
          />
                  <input
            placeHolder="Last Name"
            className=" outline-none px-4 py-1 text-xl leading-10 rounded-md tracking-widest"
          />
                  <input
            placeHolder="Username"
            className=" outline-none px-4 py-1 text-xl leading-10 rounded-md tracking-widest"
          />
                  <input
            placeHolder="Password"
            className=" outline-none px-4 py-1 text-xl leading-10 rounded-md tracking-widest"
          />
                  <input
            placeHolder="Email"
            className=" outline-none px-4 py-1 text-xl leading-10 rounded-md tracking-widest"
          />
        
        <div className="p-2 flex items-center justify-center gap-2 mt-3">
          <button className="rounded-md bg-orange-500 p-2 flex-1">Register</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
