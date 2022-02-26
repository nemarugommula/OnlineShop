import React, { useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";
import Router, { useRouter } from "next/router";
function Searchbar({ searchHistory = null }) {
  const [searchKey, setSearchKey] = useState();
  return (
    <div className="[width:40%]">
      <div className="group flex outline-none  relative">
        <input
          className="peer bg-slate-50 flex-1 tracking-wide outline-none px-3 py-2"
          placeholder="Search.."
          type="text"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button
          onClick={() => {
            Router.push({
              pathname: "/filter",
              query: {
                searchTerm: searchKey,
              },
            });
          }}
          className="bg-slate-50 px-2 focus:outline-none"
        >
          <SearchIcon className="h-5 w-5 text-primary" />
        </button>
        {searchHistory ? (
          <div className="hidden peer-focus:block absolute shadow-md bg-slate-50 left-0 right-0   top-full">
            <ul className="px-2 py-1">
              {searchHistory.map((item, i) => (
                <li className="px-2 py-2" key={i}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Searchbar;
