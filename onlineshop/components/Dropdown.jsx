import React from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";

function Dropdown({
  label,
  dropdown = [],
  iconLeft = null,
  iconRight = null,
  type,
}) {
  return (
    <div className="p-2 text-slate-50 ">
      {type == "button" ? (
        <div className="flex items-center justify-center">
          {iconLeft ? (
            <ShoppingCartIcon className="h-5 w-5   text-white mr-1" />
          ) : (
            ""
          )}{" "}
          <p>{label}</p>
          {iconRight ? (
            <ShoppingCartIcon className="h-5 w-5  text-white ml-1" />
          ) : (
            ""
          )}
        </div>
      ) : (
        <button className="group  relative">
          <div className="flex items-center justify-center ">
            <h3>{label}</h3>
            <ChevronUpIcon className=" h-5 w-5 hidden group-focus:block text-white" />
            <ChevronDownIcon className=" h-5 w-5  group-focus:hidden text-white" />
          </div>
          <div className="absolute -translate-x-1/2 left-1/2 rounded-sm font-light text-sm text-md shadow-md mt-3  hidden group-focus:block">
            <ul className="bg-slate-50 py-2 text-gray-900 shadow-md">
              {dropdown.map((item, index) => (
                <li
                  className=" last-of-type:min-w-[10em] px-3 py-2"
                  key={index}
                >
                  {item.primaryLabel}
                  {item.count ? <span className="ml-1 bg-slate-200 rounded-full text-xs p-1 leading-3">{item.count}</span> : ""}
                </li>
              ))}
            </ul>
          </div>
        </button>
      )}
    </div>
  );
}

export default Dropdown;
