import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Carousel from "../../components/Carousel";
import caroseldata from "../../data_utils/campaignDataFiller";
import useUserData from "../../data_utils/homePageFetch";
import ProductLine from "../../components/Productline";
import { useRouter } from "next/router";
import Link from "next/link";
import Card from "../../components/Card";
import Back from "../../components/utils/Back";
import useFetch, {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../../hooks/useFetch";
function Category() {
  const router = useRouter();
  const [category, setCategory] = useState();

  useEffect(() => {
    if (!router.query.id) return;
    const inclueProductQuery = {
      include: {
        product: "true",
      },
    };
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);

    let url =
      "https://shopfortyfive.herokuapp.com/api/categories?id=" +
      router.query.id +
      "&" +
      encodeQuery(inclueProductQuery);
    fetch(url, request)
      .then((res) => res.json())
      .then((response) => {
        console.log(" response : " + JSON.stringify(response));
        setCategory(response[0]);
      })
      .catch((err) => {
        console.log("error " + err);
      });
  }, [router.query.id]);

  return (
    <div className="bg-slate-50 flex h-screen w-screen flex-col">
      <Navbar />
      <main className="mt-2 flex-1 w-full shadow-sm   bg-white max-w-screen-2xl mx-auto">
        <Back padding="py-2" border="border-b" />
        <div className="flex-1">
          {category ? (
            <div className="flex border-b ">
              <img
                src={category.picture}
                className="w-56 aspect-square object-cover"
              />
              <div className="p-5">
                <h1 className="text-2xl font-bold ">{category.name}</h1>
                <p>Detials of the category or the description </p>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="">
            {category ? (
              <div clasName="w-full ">
                {category["product"].length > 0 ? (
                  <div className="flex">
                    {category["product"].map((product) => (
                      <Card key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <div className="w-[60%] aspect-video">
                      <img src="/empty.svg " />
                    </div>
                    <h1 className="text-center text-2xl font-light mt-4">
                      No Products found in this category!!
                    </h1>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-black font-light  text-2xl ">Loading..</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Category;