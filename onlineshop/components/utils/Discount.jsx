import React from "react";
import { TagIcon } from "@heroicons/react/solid";

function getCalculatedPrice(percent, price) {
  return price - price * (percent / 100);
}
function Discount({ percent = 0, price }) {
  console.log(" percent : " + percent);
  return (
    <div className="flex items-center bg-slate-50 p-2 rounded-md gap-2">
      <h1 className={`${percent > 0 && "line-through font-lg text-gray-500"}`}>
        {price}
      </h1>
      {percent > 0 && (
        <div className="flex items-center gap-1 ">
          <h1 className="font-xl text-gray-800 ">
            {getCalculatedPrice(percent, price)}
          </h1>
          <div className="flex items-center text-green-500  ml-2 gap-1">
            <p> {percent}%</p>
            <TagIcon className="h-5 w-5 " />
          </div>
        </div>
      )}
    </div>
  );
}

export default Discount;
