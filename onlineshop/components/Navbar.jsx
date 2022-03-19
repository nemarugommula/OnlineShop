import React from "react";
import Image from "next/image";
import Searchbar from "./Searchbar";
import { useState, useEffect, useContext } from "react";
import UserHomepageContext from "../context/globalContext";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import { motion } from "framer-motion";
import Avatar from "../components/admin/util/Avatar";
import { useUserData } from "../data_utils/homePageFetch";

function Navbar() {
  const [loading, user] = useUserData();
  const router = useRouter();
  const navObject = {};
  const [userDropdown, setuserdropdown] = useState(false);
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
          router.reload("/");
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
    <div className="sticky top-0 z-10 bg-white">
      <div className="flex items-center justify-between  px-2  max-w-screen-xl gap-1 mx-auto ">
        <div className="text-slate-100 text-xl font-bold p-2 ">
          <Link href="/">
            <a className=" flex gap-1 items-center justify-center">
              <h1 className="text-2xl  text-primary tracking-tight font-extrabold	">
                FORTY
              </h1>
              <div className="text-2xl px-1 text-orange-500 rounded-sm border-2 font-black border-orange-500 ">
                5
              </div>
            </a>
          </Link>
        </div>

        <div className="flex justify-center items-center gap-5">
          {user ? (
            <button
              onClick={() => {
                setuserdropdown((prev) => !prev);
              }}
              className="group  p-2 relative"
            >
              <div className="flex items-center justify-center ">
                <Avatar picture={navObject.profile_picture} />
                <h3 className="truncate pl-2 capitalize">
                  {navObject.username}
                </h3>
                {userDropdown ? (
                  <ChevronUpIcon className=" h-5 w-5  text-primary" />
                ) : (
                  <ChevronDownIcon className=" h-5 w-5   text-primary" />
                )}
              </div>
              {userDropdown ? (
                <div className="mt-3 absolute -translate-x-1/2 left-1/2 rounded-md font-light  text-sm shadow-md ">
                  <div className="bg-slate-50  text-gray-900">
                    {user.navObject.dropdown.map((item, index) =>
                      item.code ? (
                        <button
                          key={index}
                          className="py-2 "
                          onClick={(e) => {
                            e.preventDefault();
                            item.code();
                          }}
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
              ) : (
                ""
              )}
            </button>
          ) : (
            <Link href="/account/login">
              <a className="hover:bg-orange-600 active:bg-orange-700 py-2 bg-orange-500 px-5 rounded-sm">
                Login
              </a>
            </Link>
          )}

          <button className="border-r-2 px-3">
            <Link href="/downlaod">
              <a className="block hover:text-primary ">About us</a>
            </Link>
          </button>
          <button className="">
            <Link href="/customer">
              <a className="block hover:text-primary">Our mission</a>
            </Link>
          </button>
          <button
            onClick={cartClickHandler}
            className="flex items-center relative justify-center"
          >
            <ShoppingCartIcon className="h-5 w-5  text-primary mr-1" />
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
