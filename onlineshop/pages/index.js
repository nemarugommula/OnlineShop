/* eslint-disable @next/next/no-img-element */
import Meta from "../components/Meta";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Productline from "../components/Productline";
import Footer from "../components/Footer";
import categories from "../data_utils/categoryDataFiller";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/solid";
import Navlinksdata from "../data_utils/navLinkDataFiller";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import useHomepageData from "../data_utils/homePageFetch";
import CategoryHeaderList from "../components/CategoryHeaderList";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import SpinnerParallex from "../components/utils/SpinnerParallex";

import "react-loading-skeleton/dist/skeleton.css";
export default function Home() {
  const [loading, data] = useHomepageData();
  data && data.products && console.log(data.products[0]);
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    console.log(" home page data : " + JSON.stringify(data));
    if (userdata) {
      setUserdata(userdata);
    }
  }, [loading]);
  return (
    <div className="bg-slate-50">
      <Meta />
      <Navbar user={data.user} />
      {/* {data && data.categories && data.categories.length > 0 ? (
        <CategoryHeaderList categories={data.categories} />
      ) : (
        ""
      )} */}

      <main className="">
        <Carousel
          showThumbs={false}
          showArrows={true}
          showIndicators={false}
          autoFocus={true}
          autoPlay={true}
          infiniteLoop={true}
          showStatus={false}
          stopOnHover={true}
          data={data.campaigns}
          className="hover:cursor-pointer"
          apply={{ height: "70vh", objectFit: "cover" }}
        />
        <div>
          {data && data.products ? (
            <div className="mx-auto bg-white ">
              <div className="bg-gradient-to-r from-cyan-500 to-primary">
                <h1 className="tracking-widest p-5 uppercase text-center text-2xl font-bold">
                  Products
                </h1>
              </div>
              {data.products.map((prod, index) => (
                <div
                  key={index}
                  className="flex  max-w-screen-xl mx-auto justify-between bg-white my-5 shadow-sm"
                >
                  <div className="w-1/3 h-96">
                    <img
                      className="w-full h-full object-fit"
                      src={prod.picture}
                    />
                  </div>
                  <div className=" p-5 flex-1">
                    <h1 className="racking-wides  uppercase  text-xl font-semibold">
                      {prod.name}
                    </h1>
                    <div>
                      <h1>Benfits : - </h1>
                      {prod.benfits}
                    </div>

                    <div className="flex gap-2 p-2">
                      <button className="px-3 py-2 bg-orange-500 tracking-widest  rounded-md">
                        Know more
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <SkeletonTheme baseColor="#E8E7E8" highlightColor="#FFFFFF">
              <Skeleton className="h-40" count={1} />
              <Skeleton className="h-96" count={1} />

              <div>
                <Skeleton className="h-48" count={1} />
              </div>
              <div>
                <Skeleton className="h-48" count={1} />
              </div>
              <div>
                <Skeleton className="h-48" count={1} />
              </div>
            </SkeletonTheme>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
