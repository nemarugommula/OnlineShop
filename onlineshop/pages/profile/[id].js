import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Router, { useRouter } from "next/router";
import { useUserData } from "../../data_utils/homePageFetch";
import Avatar from "../../components/admin/util/Avatar";
import Address from "../../components/user/Address";
import Security from "../../components/user/Security";
import Basicdetails from "../../components/user/Basicdetails";
import Back from "../../components/utils/Back";
function getSelection(item, user) {
  if (item == "ACCOUNT") {
    return <Basicdetails user={user} />;
  } else if (item == "ADDRESS") {
    return <Address user={user} />;
  } else if (item == "SECURITY") {
    return <Security user={user} />;
  }
}
function Account() {
  const [loading, user] = useUserData();
  const [activeRight, setActiveRight] = useState("ACCOUNT");
  const router = useRouter();
  const navigation = [
    {
      label: "Account",
      code: () => setActiveRight("ACCOUNT"),
    },
    {
      label: "Address",
      code: () => setActiveRight("ADDRESS"),
    },
    {
      label: "Security",
      code: () => setActiveRight("SECURITY"),
    },
  ];
  return (
    <div className="bg-slate-50 h-screen flex flex-col  w-screen">
      <Navbar />
      {user ? (
        <main className="flex w-4/5 h-4/5 gap-5 max-w-screen-xl mx-auto mt-5">
          <div className=" bg-[url('/personal.svg')] bg-no-repeat bg-contain bg-bottom w-[25%] min-h-[40%] bg-white shadow-sm">
            <Back padding="p-2" />
            <div className=" flex items-center gap-2  p-3 mb-3 ">
              <Avatar picture={user.picture} />
              <div className="ml-2">
                <p className="font-semibold text-sm">Hello</p>
                <p className="mt-1 capitalize text-md">{user.username}</p>
              </div>
            </div>

            <div className="bg-white py-4 px-2 ">
              {navigation.map((item, index) => (
                <button
                  className={` ${
                    activeRight == item.label.toUpperCase() && "bg-slate-50"
                  } block w-full tracking-widest p-3 text-left hover:bg-slate-50`}
                  key={index}
                  onClick={() => item.code()}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 bg-white shadow-sm  ">
            {getSelection(activeRight, user)}
          </div>
        </main>
      ) : (
        ""
      )}
    </div>
  );
}

export default Account;
