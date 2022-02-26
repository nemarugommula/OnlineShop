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
      {data ? <CategoryHeaderList categories={data.categories} /> : ""}

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
            <p>loading</p>
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
