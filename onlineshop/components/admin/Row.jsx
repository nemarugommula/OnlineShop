import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const mappings = {
  "category_id": { mapTo: "category", field: "name" },
  "discount_id": { mapTo: "discount", field: "name" },
  "inventory_id": { mapTo: "inventory", field: "quantity" },
};

function Row({ data = [], endPoint }) {
  return (
    <div className="px-1 bg-slate-50">
      {data.map((item, index) => {
        return (
          <Link key={index} href={`/admin/${endPoint}/${item.id}`}>
            <a className="border-b hover:bg-slate-200 hover:shadow-lg h-16  active:bg-slate-300	font-light	 font-sm flex  justify-center items-center">
              {Object.keys(item)
                .filter((key) => typeof item[key] != "object")
                .map((key, i) => {
                  return (
                    <li
                      key={i}
                      className="mx-2 list-none	 text-center px-3 truncate py-2 w-[10%] "
                    >
                      <p className=" text-center">
                        {mappings[key] ? 
                              item[mappings[key].mapTo][mappings[key].field] : item[key] + ""}
                      </p>
                    </li>
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
