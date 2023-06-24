import React, { useState } from "react";
import Avatar from "../admin/util/Avatar";

const fields = [
  {
    label: "username",
    readOnly: false,
    name: "username",
  },
  {
    label: "First Name",
    readOnly: false,
    name: "first_name",
  },
  {
    label: "Last Name",
    readOnly: false,
    name: "last_name",
  },
  {
    label: "Email",
    readOnly: false,
    name: "email",
  },
  {
    label: "Mobile",
    readOnly: false,
    name: "mobile",
  },
];
function Basicdetails({ user }) {
  console.log(" user : " + JSON.stringify(user));
  const { username, mobile, email, first_name, last_name } = user;
  const [updateObj, setUpdateObj] = useState({
    username,
    mobile,
    email,
    first_name,
    last_name,
  });
  return (
    <div className="p-2  mt-5">
      <div className="flex border-b-2 border-primary justify-start p-5">
        <button className=" px-3 py-2 hover:bg-blue-600 bg-primary active:bg-blue-700 rounded-md text-slate-50 ring-offset-1  ring-primary">
          Update profile
        </button>
      </div>
      <div className="flex py-4 justify-around ">
        <div className=" ">
          {fields.map((field, index) => (
            <div
              key={index}
              className="p-2 flex items-center justify-center tracking-widest font-semibold "
            >
              <label className="w-32  block truncate font-semibold font-lg capitalize ">
                {field.label}
              </label>
              <input
                value={updateObj[field.name]}
                disabled={field.readOnly}
                onChange={(e) => {
                  setUpdateObj((prev) => {
                    const newSet = { ...prev };
                    newSet[field.name] = e.target.value;
                    return newSet;
                  });
                }}
                className="p-3 border-b-2 border-primary bg-slate-50 text-gray-800 rounded-t-md  outline-none "
              />
            </div>
          ))}
        </div>
        <div className="text-center ">
          <img src={user.picture} className="w-56  object-contain rounded-full" />
          <button className="bg-slate-50 rounded-lg mt-2 p-1 text-sm">
            Uplaod
          </button>
        </div>
      </div>
    </div>
  );
}

export default Basicdetails;
