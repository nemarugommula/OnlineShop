import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Productline from "../components/Productline";
import Footer from "../components/Footer";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Navlinksdata from "../data_utils/navLinkDataFiller";
import { motion } from "framer-motion";
import useHomepageData from "../data_utils/homePageFetch";
import Link from "next/link";
import Card from "../components/Card";
import React, { useState, useEffect } from "react";
import { useUserData } from "../data_utils/homePageFetch";
import Back from "../components/utils/Back";
import useFetch, {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../hooks/useFetch";

import { useRouter } from "next/router";
function Wishlist() {
  const router = useRouter();
  const [wishlist, setwishlist] = useState();

  const [loading, user] = useUserData();
  useEffect(() => {
    if (!(user && user.id)) return;
    const inclueProductQuery = {
      include: {
        product: "true",
      },
    };
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    let url =
      "https://shopfortyfive.herokuapp.com/api/wishlist?user_id=" +
      user.id +
      "&" +
      encodeQuery(inclueProductQuery);
    fetch(url, request)
      .then((res) => res.json())
      .then((response) => {
        console.log(" response : " + JSON.stringify(response));
        setwishlist(response);
      })
      .catch((err) => {
        console.log("error " + err);
      });
  }, [user]);

  return (
    <div className="bg-slate-50 flex h-screen w-screen flex-col">
      <Navbar />
      <main className="mt-2 flex-1 w-full shadow-sm   bg-white max-w-screen-2xl mx-auto">
        <Back border="border-b" padding="p-2" />
        <div className="flex-1">
          <div className="flex  ">
            <div className="p-5 flex gap-2 font-semibold text-2xl">
              <p>Your wishlist </p>({wishlist && wishlist.length})
            </div>
          </div>
          <div className="p-2">
            {wishlist ? (
              <div clasName="w-full">
                {wishlist.length > 0 ? (
                  <div className="flex">
                    {wishlist.map((wish) => (
                      <Card key={wish.id} product={wish["product"]} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-[50%] aspect-video">
                      <img
                        src="/wishlist.svg "
                        className="w-full h-full block"
                      />
                    </div>
                    <h1 className="text-left  block text-2xl font-light mt-5">
                      No Wishlist items!!
                    </h1>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-black font-light  text-2xl ">Loading</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Wishlist;
