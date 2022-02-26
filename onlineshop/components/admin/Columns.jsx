import React from "react";
import formatLabel from "../admin/util/formatter";

const excludeMappings = {
  category: true,
  discount: true,
  inventory: true,
};

function Columns({ data = [] }) {
  return (
    <ul className=" bg-white border-t font-semibold text-gray-700 border-b-2  text-sm  tracking-widest flex py-1 justify-center items-center">
      {data
        .filter((item) => !excludeMappings[item])
        .map((item, index) => {
          return (
            <li
              key={index}
              className="mx-2 overflow-hidden text-center px-2 py-2 w-[10%]"
            >
              {formatLabel(item)}
            </li>
          );
        })}
    </ul>
  );
}

export default Columns;
