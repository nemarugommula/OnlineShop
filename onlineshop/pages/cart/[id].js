import React from "react";
import Navbar from "../../components/Navbar";
import Cartitem from "../../components/Cartitem";

function Cart() {
  return (
    <div className="bg-slate-50">
      <Navbar />
      <main className="flex max-w-screen-xl mx-auto mt-4">
        <div className="bg-white flex-1  mx-2">
          <div className="shadow-sm items-center justify-between p-4 flex">
            <h1 className="text-2xl font-semibold">My cart(2)</h1>
            <div className="flex items-center justify-center gap-2">
              Deliver to
              <select className="p-2 outline-none shadow-sm max-w-[200px]">
                <option>Warangal, Hanamakonda</option>
                <option>two</option>
              </select>
            </div>
          </div>
          <Cartitem />
          <Cartitem />
          <Cartitem />
          <Cartitem />
          <Cartitem />
          <Cartitem />
          <Cartitem />
          <Cartitem />
        </div>
        <div className="">
          <div className="bg-white p-4 shadow-md sticky top-[70px]">
            <h1 className="border-b-2 border-grey-800 py-2">PRICE DETAILS</h1>
            <div className=" py-2 flex items-center justify-between ">
              <p>Price</p> <p>2000</p>
            </div>
            <div className="py-2 flex items-center justify-between ">
              <p>Discount</p> <p>2000</p>
            </div>{" "}
            <div className="py-2 border-b-2  flex items-center justify-between ">
              <p>Delivery chargers</p> <p>2000</p>
            </div>
            <div className="py-2 flex items-center justify-between ">
              <p>Total Amount</p> <p>2000</p>
            </div>
            <h1>YOU will save 2039 on this order</h1>
            <h1 className="p-2 text-sm text-green-600">
              {" "}
              Safe and Secure Payments.Easy returns.100% Authentic products.
            </h1>
            <div className="w-[80%] mx-auto">
              <button className="bg-orange-500 p-2 mx-auto w-full">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
      <div></div>
    </div>
  );
}

export default Cart;
