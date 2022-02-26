import React from "react";
import Link from "next/link";

function getObj(label, url) {
  return {
    label,
    url,
  };
}
function Sidebar({ user, active }) {
  return (
    <div className="relative h-screen bg-primary  min-w-[200px] text-slate-50">
      <div className="border-b-2 border-blue-600  flex justify-center items-center">
        <div className="flex gap-1 py-2">
          <h1 className="text-2xl text-slate-50 tracking-widest font-semibold	">
            FORTY
          </h1>
          <div className="text-4xl text-orange-500 rotate-12 font-bold">5</div>
        </div>
      </div>
      <ul className="text-xl font-light">
        {[
          getObj("Dashboard", "/admin/"),
          getObj("Products", "/admin/products"),
          getObj("Categories", "/admin/categories"),
          getObj("Discounts", "/admin/discounts"),
          getObj("Inventory", "/admin/inventory"),
          getObj("Payments", "/admin/payments"),
          getObj("Users", "/admin/users"),
          getObj("Orders", "/admin/orders"),
          getObj("Campaigns", "/admin/campaigns"),
        ].map((item, index) => {
          return (
            <li
              className={`hover:bg-blue-600 tracking-widest active:bg-blue-700 text-center  hover:shadow-sm  ${
                active == item.label ? "shadow-sm" : ""
              }`}
              key={index}
            >
              <Link href={`${item.url}`}>
                <a className="py-4 block">{item.label}</a>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="absolute w-full flex py-3 bottom-0 items-center border-t-2 border-blue-600 justify-center gap-5  ">
        <img src="/profile.svg" className="w-10 block h-10" />
        <h1 className="font-semibold text-xl tracking-widest">Vishnu</h1>
      </div>
    </div>
  );
}

export default Sidebar;
