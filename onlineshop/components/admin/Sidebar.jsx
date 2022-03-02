import React from "react";
import Link from "next/link";
import { useUserData } from "../../data_utils/homePageFetch";
import Avatar from "../admin/util/Avatar";
import {
  ExternalLinkIcon,
  PhotographIcon,
  CreditCardIcon,
  UsersIcon,
  ArchiveIcon,
  ReceiptTaxIcon,
  TruckIcon,
  PresentationChartLineIcon,
  PencilIcon,
  DatabaseIcon,
  LogoutIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
function getObj(label, url, icon) {
  return {
    label,
    url,
    icon,
  };
}
function Sidebar({ active }) {
  const router = useRouter();
  console.log(" active : " + active);
  const [laoding, user] = useUserData();
  return (
    <div className="relative h-screen bg-primary  min-w-[200px] text-slate-50">
      <div className=" flex justify-center items-center p-10">
        <Link href="/">
          <a className=" flex gap-1 items-center justify-center">
            <h1 className="text-2xl text-slate-50 tracking-tight font-extrabold	">
              FORTY
            </h1>
            <div className="text-2xl px-1 text-orange-500 rounded-sm border-2 font-black border-orange-500 ">
              5
            </div>
          </a>
        </Link>
      </div>
      <ul className="text-xl font-light">
        {[
          getObj("Dashboard", "/admin/", "PresentationChartLineIcon"),
          getObj("Products", "/admin/products", "DatabaseIcon"),
          getObj("Categories", "/admin/categories", "PencilIcon"),
          getObj("Discounts", "/admin/discounts", "ReceiptTaxIcon"),
          getObj("Inventory", "/admin/inventory", "ArchiveIcon"),
          getObj("Payments", "/admin/payments", "CreditCardIcon"),
          getObj("Users", "/admin/users", "UsersIcon"),
          getObj("Orders", "/admin/orders", "TruckIcon"),
          getObj("Campaigns", "/admin/campaigns", "PhotographIcon"),
          getObj("Site", "/", "ExternalLinkIcon"),
        ].map((item, index) => {
          return (
            <Link key={index} href={`${item.url}`}>
              <li
                className={`hover:bg-blue-600 tracking-widest active:bg-blue-700 cursor-pointer text-center p-5 hover:shadow-sm  ${
                  active == item.label ? "text-orange-500 bg-blue-600" : ""
                }`}
              >
                <a className="flex items-center gap-3 ">
                  {getTailwindIcon(item.icon)}
                  <label className="flex-1 cursor-pointer text-left">
                    {" "}
                    {item.label}
                  </label>
                </a>
              </li>
            </Link>
          );
        })}
      </ul>
      <div className="group  absolute w-full flex py-3 bottom-0 items-center border-t-2 border-blue-600 justify-center gap-5  ">
        <Avatar picture={user && user.picture} />
        <div className="font-semibold items-end text-xl tracking-widest">
          <h1>{user && user.username}</h1>
          <button
            onClick={() => {
              localStorage.removeItem("authorization");
              localStorage.removeItem("userId");
              console.log(" logout ");
              router.reload(window.location.pathname);
            }}
            className="group-hover:block hover:bg-white active:bg-slate-100 w-full text-black hidden absolute top-0 right-0 bottom-0 left-0"
          >
            <div className="flex gap-2 items-center justify-center">
              <h3 className="tracking-wide">LOGOUT</h3>{" "}
              <LogoutIcon className="w-6 h-6 text-primary  " />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function getTailwindIcon(name) {
  if (name == "ExternalLinkIcon") {
    return <ExternalLinkIcon className="w-5 mr-2 h-5" />;
  } else if (name == "PhotographIcon") {
    return <PhotographIcon className="w-5 mr-2 h-5" />;
  } else if (name == "CreditCardIcon") {
    return <CreditCardIcon className="w-5 mr-2 h-5" />;
  } else if (name == "UsersIcon") {
    return <UsersIcon className="w-5 mr-2 h-5" />;
  } else if (name == "ArchiveIcon") {
    return <ArchiveIcon className="w-5 mr-2 h-5" />;
  } else if (name == "ReceiptTaxIcon") {
    return <ReceiptTaxIcon className="w-5 mr-2 h-5" />;
  } else if (name == "TruckIcon") {
    return <TruckIcon className="w-5 mr-2 h-5" />;
  } else if (name == "PresentationChartLineIcon") {
    return <PresentationChartLineIcon className="w-5 mr-2 h-5" />;
  } else if (name == "DatabaseIcon") {
    return <DatabaseIcon className="w-5 mr-2 h-5" />;
  } else if (name == "PencilIcon") {
    return <PencilIcon className="w-5 mr-2 h-5" />;
  }
}

export default Sidebar;
