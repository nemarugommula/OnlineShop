import React, { useState } from "react";
import Avatar from "../admin/util/Avatar";

function Security({ user }) {
  const [newPassword, setNewPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [oldPassword, setOldPassword] = useState();

  return (
    <div className="p-2  h-full bg-fit bg-no-repeat bg-right-bottom mt-5">
      <div className="flex border-b-2 border-primary justify-start p-5">
        <button className=" px-3 py-2 hover:bg-blue-600 bg-primary active:bg-blue-700 rounded-md text-slate-50 ring-offset-1  ring-primary">
          Change password
        </button>
      </div>
      <div className="flex justify-center">
        <div className="py-5">
          <div className="p-2 flex items-center justify-center tracking-widest font-semibold ">
            <label className="w-56  block  ">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => {
                setOldPassword(e.target.value);
              }}
              className="p-3 border-b-2 border-primary bg-slate-50 text-gray-800 rounded-t-md  outline-none "
            />
          </div>

          <div className="p-2 flex items-center justify-center tracking-widest font-semibold ">
            <label className="w-56  block  ">New password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              className="p-3 border-b-2 border-primary bg-slate-50 text-gray-800 rounded-t-md  outline-none "
            />
          </div>

          <div className="p-2 flex items-center justify-center tracking-widest font-semibold ">
            <label className="w-56  block  ">Re enter new password</label>
            <input
              type="password"
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
              className="p-3 border-b-2 border-primary bg-slate-50 text-gray-800 rounded-t-md  outline-none "
            />
          </div>
        </div>
        <div className="w-56 flex ">
          <img src="/password.svg" className="w-full h-full block" />
        </div>
      </div>
    </div>
  );
}

export default Security;
