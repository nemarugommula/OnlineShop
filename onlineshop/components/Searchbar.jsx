import React from "react";
import { SearchIcon } from "@heroicons/react/solid";

function Searchbar() {
 

  return (
    <div  className="[width:40%] shadow-xl z-10 rounded-md">
      <div  className="group flex outline-none  relative">
        <input
          className="peer bg-slate-50 flex-1 focus:outline-none px-3 py-2"
          placeholder="Search.."
          type="text"
        />
        <button className="bg-slate-50 px-2 focus:outline-none">
          <SearchIcon className="h-5 w-5 text-primary" />
        </button>
        <div className="hidden peer-focus:block absolute shadow-md bg-slate-50 left-0 right-0   top-full">
          <ul className="px-2 py-1">
            {["one", "one", "one"].map((item, i) => (
              <li className="px-2 py-2" key={i}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        </div>

 
    </div>
  );
}

export default Searchbar;
