import React from "react";
import Image from "next/image";
import Searchbar from "./Searchbar";
import { useState, useEffect, useContext } from "react";
import UserHomepageContext from "../context/globalContext";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import Avatar from "../components/admin/util/Avatar";
import { useUserData } from "../data_utils/homePageFetch";

function Navbar() {
  const [loading, user] = useUserData();
  const router = useRouter();
  const navObject = {};
  if (user) {
    navObject["username"] = user.username;
    navObject["profile_picture"] = user.picture;
    navObject["cart"] = user.cart;
    navObject["profile_url"] = user.picture;
    const linkData = [
      {
        label: "Wishlist",
        url: "/wishlist",
        count: user.wishlist,
      },
      {
        label: "Tickets",
        url: "/tickets",
        count: user.ticket,
      },
      {
        label: "Orders",
        url: "/orders",
        count: user.order,
      },
      {
        label: "Profile",
        url: "/profile/" + user.id,
        count: 0,
      },
      {
        label: "Logout",
        url: "",
        code: () => {
          localStorage.removeItem("authorization");
          localStorage.removeItem("userId");
          console.log(" logout ");
          router.reload(window.location.pathname);
        },
        count: 0,
      },
    ];

    navObject["dropdown"] = linkData;
    user.navObject = navObject;
  }

  function cartClickHandler() {
    if (!user) {
      router.push("/account/login");
    } else {
      router.push("/cart");
    }
  }

  return (
    <div className="sticky top-0 z-10 bg-primary">
      <div className="flex items-center justify-around  px-2  max-w-screen-xl gap-1 mx-auto py-2">
        <div className="text-slate-100 text-xl font-bold pb-1 ">
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
        <Searchbar user={user} />
        <div className="flex justify-center items-center gap-5 text-slate-50">
          {user ? (
            <button className="group relative">
              <div className="flex items-center justify-center ">
                <Avatar picture={navObject.profile_picture} />
                <h3 className="truncate pl-2 capitalize">
                  {navObject.username}
                </h3>
                <ChevronUpIcon className=" h-5 w-5 hidden group-focus:block text-white" />
                <ChevronDownIcon className=" h-5 w-5  group-focus:hidden text-white" />
              </div>
              <div className="mt-3 absolute -translate-x-1/2 left-1/2 rounded-md font-light  text-sm shadow-md  hidden  group-focus:block">
                <div className="bg-slate-50  text-gray-900">
                  {user.navObject.dropdown.map((item, index) =>
                    item.code ? (
                      <button
                        className="py-2 hover:bg-slate-200 w-full active:bg-slate-300"
                        onClick={() => item.code()}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link key={index} href={item.url}>
                        <div className="last-of-type:min-w-[10em] p-2 hover:bg-slate-200 active:bg-slate-400">
                          <a>
                            {item.label}
                            {item.count ? (
                              <span className="bg-slate-200 ml-2 px-1 rounded-full">
                                {item.count}
                              </span>
                            ) : (
                              ""
                            )}
                          </a>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </button>
          ) : (
            <button className="hover:bg-orange-600 active:bg-orange-700 py-2 bg-orange-500 px-5 rounded-sm">
              <Link href="/account/login">
                <a>Login</a>
              </Link>
            </button>
          )}

          <button className="group relative">
            <div className="flex items-center justify-center ">
              <h3 className="tracking-wide">More</h3>
              <ChevronUpIcon className=" h-5 w-5 hidden group-focus:block text-white" />
              <ChevronDownIcon className=" h-5 w-5  group-focus:hidden text-white" />
            </div>
            <div className="mt-3 absolute -translate-x-1/2 left-1/2 rounded-md font-light  text-sm shadow-md   hidden group-focus:block">
              <ul className="bg-slate-50 text-gray-900">
                <Link href="/customer">
                  <li className="hover:bg-slate-200 active:bg-slate-400 last-of-type:min-w-[10em] px-3 py-2">
                    24X7 Customer service
                  </li>
                </Link>
                <Link href="/downlaod">
                  <li className="hover:bg-slate-200 active:bg-slate-400 last-of-type:min-w-[10em] px-3 py-2">
                    Download App
                  </li>
                </Link>
              </ul>
            </div>
          </button>

          <button
            onClick={cartClickHandler}
            className="flex items-center relative justify-center"
          >
            <ShoppingCartIcon className="h-5 w-5   text-white mr-1" />
            {user && user.navObject.cart ? (
              <span className=" absolute  -top-2 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-orange-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400"></span>
              </span>
            ) : (
              ""
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
