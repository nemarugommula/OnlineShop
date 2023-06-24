import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const mappings = {
  category_id: { mapTo: "category", field: "name" },
  discount_id: { mapTo: "discount", field: "name" },
  inventory_id: { mapTo: "inventory", field: "quantity" },
};

function Row({ data = [], endPoint }) {
  console.log(" data : " + JSON.stringify(data));
  const getValue = (item, key) => {
    const res = "-";
    if (mappings[key]) {
      res = item[mappings[key].mapTo][mappings[key].field];
    } else {
      res = item[key] || res;
    }
    console.log(" key : " + key + " value " + res);
    if (item[key] === 0) res = "0";
    if (item[key] === false) res = "False";
    if (item[key] === true) res = "True";
    return res;
  };
  return (
    <div className="bg-slate-50">
      {data.map((item, index) => {
        return (
          <Link key={index} href={`/admin/${endPoint}/${item.id}`}>
            <a className=" border-b hover:bg-slate-200  hover:shadow-lg h-16  active:bg-slate-300	font-light	 font-sm flex  justify-center items-center">
              {Object.keys(item)
                .filter((key) => {
                  if (!item[key]) return true;
                  else return typeof item[key] != "object";
                })
                .map((key, i) => {
                  return (
                    <p
                      key={i}
                      className="text-center pst-none	truncate py-2 w-[10%] "
                    >
                      {/* {mappings[key]
                        ? item[mappings[key].mapTo][mappings[key].field]
                        : item[key] + ""} */}
                      {getValue(item, key)}
                    </p>
                  );
                })}
            </a>
          </Link>
        );
      })}
    </div>
  );
}

export default Row;
