import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Cartitem from "../../components/Cartitem";
import useFetch, {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../../hooks/useFetch";
import handleRazerpay from "../paymentpage";
import Router from "next/router";
function Cart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    fetch("http://localhost:5000/api/cart", request)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        console.log(" data  >>>>>>>>>>>>> : " + JSON.stringify(res));
      });
  }, []);

  function placeOrderHandler() {
    const reqObj = {
      amount: "100",
      currency: "INR",
      receipt: "1238888",
      notes: "test",
    };
    const request = requestBuilder(getAuthHeaders(), "POST", null, reqObj);
    fetch("http://localhost:5000/api/payment/create_order", request)
      .then((response) => response.json())
      .then((res) => {
        console.log(" data : " + JSON.stringify(res));
        Router.push({
          pathname: "/paymentpage",
          query: { id: res.id + "" },
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className="bg-slate-50">
      <Navbar />
      <main className="flex max-w-screen-xl mx-auto mt-4">
        <div className="bg-white flex-1  mx-2">
          <div className="shadow-sm items-center justify-between p-4 flex  mb-2">
            <h1 className="text-2xl font-semibold">My cart({data.length})</h1>
            <div className="flex items-center justify-center gap-2">
              <p className="font-semibold">DELIVER TO : </p>
              <select className="px-3 py-2 bg-slate-200 rounded-sm outline-none shadow-sm max-w-[200px]">
                <option>Warangal, Hanamakonda</option>
                <option>two</option>
              </select>
            </div>
          </div>
          {data.map((cartItem) => (
            <Cartitem
              key={cartItem.id}
              product={cartItem.product}
              cartitem={cartItem}
            />
          ))}
        </div>
        <div className="">
          <div className="bg-white p-4 shadow-md sticky top-[70px]">
            <h1 className="border-b-2 text-xl font-semibold border-grey-800 py-2">
              PRICE DETAILS
            </h1>
            <div className=" py-2 flex items-center justify-between ">
              <p>Price</p> <p className="font-light">+ 2000</p>
            </div>
            <div className="py-2 flex items-center justify-between ">
              <p>Discount</p> <p className="font-light">- 200</p>
            </div>{" "}
            <div className="py-2 border-b-2  flex items-center justify-between ">
              <p>Delivery chargers</p> <p className="font-light">+ 80</p>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <p>TOTAL AMOUNT</p>{" "}
              <p className="bg-slate-50 px-2 py-1 pb-1">1880</p>
            </div>
            <h1 className="text-gray-400">You will save 120 on this order</h1>
            <button
              onClick={placeOrderHandler}
              className="bg-orange-500 rounded-sm  shadow-sm hover:bg-orange-600 active:bg-orange-700 p-2  w-full"
            >
              Place Order
            </button>
            <h1 className="p-2 text-sm text-green-600">
              Safe and secure payments. Easy returns. 100% Authentic products.
            </h1>
          </div>
        </div>
      </main>
      <div></div>
    </div>
  );
}

export default Cart;
