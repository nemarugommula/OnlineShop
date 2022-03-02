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
import "react-loading-skeleton/dist/skeleton.css";
export default function Home() {
  const [loading, data] = useHomepageData();
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    console.log(" home page data : " + JSON.stringify(data));
    if (userdata) {
      setUserdata(userdata);
    }
  }, [loading]);
  return (
    <div className="bg-slate-100">
      <Meta />
      <Navbar user={data.user} />
      {data && data.categories && data.categories.length > 0 ? (
        <CategoryHeaderList categories={data.categories} />
      ) : (
        ""
      )}

      <main className="max-w-screen-2xl mx-auto my-1">
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
          apply={{ height: "350px", objectFit: "cover" }}
        />
        <div className="">
          {data && data.products ? (
            Object.keys(data.products).map((key, index) => (
              <Productline
                key={index}
                lineTag={key}
                products={data.products[key]}
              />
            ))
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
