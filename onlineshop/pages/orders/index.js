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
import { OrderItem } from "../../components/utils/OrderItem";
import Back from "../../components/utils/Back";
import useFetch, {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../../hooks/useFetch";

function Orders() {
  const router = useRouter();
  const [orders, setorders] = useState();
  const [loading, user] = useUserData();

  useEffect(() => {
    if (!user) return;
    const includeOrderQuery = {
      include: {
        address: "true",
        payment: "true",
        order_items: "true",
      },
    };
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);

    let url =
      "https://shopfortyfive.herokuapp.com/api/orders?user_id=" +
      user.id +
      "&" +
      encodeQuery(includeOrderQuery);
    fetch(url, request)
      .then((res) => res.json())
      .then((response) => {
        console.log(" orders : " + JSON.stringify(response));
        setorders(response);
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
          {orders ? (
            <div className="flex  ">
              <div className="p-5">
                <h1 className="text-2xl font-semibold ">
                  Total orders ({orders.length})
                </h1>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="p-2">
            {orders ? (
              <div clasName="w-full relative">
                {orders.length > 0 ? (
                  orders.map((product) => (
                    <OrderItem key={product.id} product={product} />
                  ))
                ) : (
                  <div className="flex flex-col items-center  justify-center">
                    <div className="w-[50%] aspect-video">
                      <img
                        src="/noorders.svg "
                        className="w-full h-full block"
                      />
                    </div>
                    <h1 className="text-left  block text-2xl font-light mt-4">
                      No Orders Created Yet!!
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

export default Orders;
