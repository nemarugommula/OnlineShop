import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Carousel from "../../components/Carousel";
import caroseldata from "../../data_utils/campaignDataFiller";
import useUserData from "../../data_utils/homePageFetch";
import ProductLine from "../../components/Productline";
import { useRouter } from "next/router";
import Link from "next/link";
import Back from "../../components/utils/Back";
import { motion, AnimatePresence } from "framer-motion";
import { Rating } from "react-simple-star-rating";

import useFetch, {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../../hooks/useFetch";
import Wishlist from "../../components/Wishlist";
import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  XIcon,
} from "@heroicons/react/solid";

const StarRating = ({ setModalData }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating) ? "text-yellow-500" : "text-slate-50"
            }
            onClick={() => {
              setRating(index);
              setModalData((prev) => {
                return {
                  ...prev,
                  rating: index + "",
                };
              });
            }}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="text-2xl m-2">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

function Review({
  setModalData,
  submitModalHandler,
  setShowModal,
  user_id,
  modalData,
  product_id,
}) {
  const [rat, setRat] = useState(0);
  return (
    <motion.div
      initial={{ top: "-20px", opacity: 0 }}
      animate={{ top: "20px", opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute z-10 top-10 bg-white  shadow-sm shadow-primary p-4"
    >
      <div className="flex justify-between border-b py-4 items-center">
        <h1 className="text-xl font-light">How is the experiance ?</h1>
        <button onClick={() => setShowModal(false)}>
          <XIcon className="w-8 h-8" />
        </button>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 p-5">
          <label>Review : </label>
          <textarea
            onChange={(e) => {
              setModalData((prev) => {
                return {
                  ...prev,
                  review: e.target.value,
                };
              });
            }}
            className="bg-slate-50 p-5 "
          />
        </div>
        <div className="flex items-center justify-between p-5 ">
          <label>Rating : </label>
          <StarRating setModalData={setModalData} />
          <div></div>
        </div>
      </div>

      <div className="border-b flex justify-end  py-4">
        <button
          className="bg-primary px-3 py-3 rounded-sm hover:bg-blue-600 active:bg-blue-700 shadow-sm shadow-primary text-white tracking-widest"
          onClick={() => {
            submitModalHandler(user_id, product_id);
          }}
        >
          Submit Review
        </button>
      </div>
    </motion.div>
  );
}

function Product() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [images, setImages] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState();
  const [userLoading, user] = useUserData();
  const [relatedList, setRelatedList] = useState();

  function getRelatedProductsOfCategory(category_id) {
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    const categoryIncludeQuery = {
      include: {
        product: "true",
      },
    };
    fetch(
      "https://shopfortyfive.herokuapp.com/api/categories?id=" +
        category_id +
        "&" +
        encodeQuery(categoryIncludeQuery),
      request
    )
      .then((response) => response.json())
      .then((res) => {
        setRelatedList(res[0]["product"]);
        console.log("response : -----> " + JSON.stringify(res[0]["product"]));
      });
  }

  useEffect(() => {
    if (!router.query.id) return;
    const productIncludeQuery = {
      include: {
        review: "true",
      },
    };

    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    fetch(
      "https://shopfortyfive.herokuapp.com/api/products?id=" +
        router.query.id +
        "&" +
        encodeQuery(productIncludeQuery),
      request
    )
      .then((response) => response.json())
      .then((res) => {
        setLoading(false);
        setData(res[0]);
        getRelatedProductsOfCategory(res[0].category_id);
      });

    fetch(
      "https://shopfortyfive.herokuapp.com/api/image?table_name=products&record_id=" +
        router.query.id,
      request
    )
      .then((response) => response.json())
      .then((res) => {
        setImages(res);
      });
  }, [router, user]);

  function giveReviewHandler() {
    setShowModal(true);
  }

  function addToCart(reqBody, redirect) {
    const request = requestBuilder(getAuthHeaders(), "POST", null, reqBody);
    fetch("https://shopfortyfive.herokuapp.com/api/cart", request)
      .then((data) => data.json())
      .then((res) => {
        if (redirect) {
          router.push("/cart");
        }
      })
      .catch((err) => console.log(err));
  }

  function addToCartHandler() {
    if (!user) {
      Router.push({
        pathname: "/account/login",
        query: { status: "reason", reason: "please Login to add to cart" },
      });
    }
    console.log(" data .id ---->" + data.id);
    var reqBody = {
      product_id: data.id,
    };
    addToCart(reqBody, false);
  }

  function buyNowHandler() {
    if (!user) {
      Router.push({
        pathname: "/account/login",
        query: { status: "reason", reason: "please Login to Buy products" },
      });
    }
    var reqBody = {
      product_id: data.id,
    };
    addToCart(reqBody, true);
  }

  function submitModalHandler(user_id, product_id) {
    const userId = user_id || user.id;
    const productId = product_id || data.id;
    const reqBody = {
      ...modalData,
      product_id: productId,
      user_id: userId,
    };
    console.log(" req body : " + JSON.stringify(reqBody));
    const request = requestBuilder(getAuthHeaders(), "POST", null, reqBody);
    fetch("https://shopfortyfive.herokuapp.com/api/product_review", request)
      .then((response) => response.json())
      .then((res) => {
        setShowModal(false);
        alert("review succesfull");
      })
      .catch((err) => console.log(JSON.stringify(err)));
  }
  return (
    <div className="bg-slate-50">
      <Navbar />
      <div className="mx-auto max-w-screen-xl ">
        <Back padding="py-1" />
      </div>
      {!data ? (
        "Loading"
      ) : (
        <main
          className="flex gap-5 max-w-screen-xl  
        mx-auto p-5 shadow-md justify-center relative  items-start  bg-white "
        >
          {" "}
          {showModal ? (
            <Review
              submitModalHandler={submitModalHandler}
              setModalData={setModalData}
              setShowModal={setShowModal}
              user_id={user.id}
              modalData={modalData}
              product_id={data.id}
            />
          ) : (
            ""
          )}
          <div className="w-full  sticky top-16 ">
            {user ? <Wishlist user_id={user.id} product_id={data.id} /> : ""}
            <Carousel
              data={images}
              showThumbs={false}
              showArrows={false}
              showIndicators={true}
              autoFocus={true}
              autoPlay={true}
              infiniteLoop={true}
              stopOnHover={true}
              apply={{ height: "400px" }}
            />
            <div className="flex gap-2 items-center justify-center mt-5">
              <button
                onClick={buyNowHandler}
                className="bg-primary gap-2 flex items-center justify-center flex-1 rounded-sm shadow-sm hover:bg-blue-600 active:bg-blue-700 text-slate-50 px-4 py-3"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                <p>Buy now</p>
              </button>
              <button
                onClick={addToCartHandler}
                className="bg-orange-400 gap-2 flex items-center justify-center rounded-sm shadow-sm flex-1 hover:bg-orange-500 active:bg-orange-600 text-slate-50 px-4 py-3"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <p>Add to card</p>
              </button>
            </div>
          </div>
          <div className="shadow-sm px-2">
            <div>
              <h1 className="text-2xl font-semibold mb-2">{data.name}</h1>
              <p className="text-green-500 mb-1">
                4.31,351 Ratings & 125 Reviews
              </p>
              <p className="text-2xl font-bold px-2  text-gray-700">
                {data.price}{" "}
                <span className="text-lg text-gray-400">- 10% off</span>
              </p>
            </div>

            <div className="">
              <h1 className="text-xl font-semibold ">About Product</h1>
              <ul className="text-md font-light list-inside px-2">
                <li>detial 1 </li>
                <li>detial 1 </li>
                <li>detial 1 </li>
                <li>detial 1 </li>
              </ul>
            </div>

            <div className="">
              <h1 className="text-xl font-semibold ">Benfits</h1>
              <ul className="text-md font-light list-inside px-2">
                <li>benfit 1 </li>
                <li>benfit 1 </li>
                <li>benfit 1 </li>
                <li>benfit 1 </li>
              </ul>
            </div>
            <p className="">
              <ul className="flex flex-col gap-3 my-2">
                <li>
                  Available offers Combo OfferBuy 2-3 items save Buy 4 or more
                  save 10%See all productsT&C Bank OfferFlat ₹50 Instant
                  Cashback on Paytm Wallet. Min Order Value ₹500. Valid once per
                  Paytm accountT&C Bank Offer5% Unlimited Cashback on Flipkart
                  Axis Bank Credit CardT&C Partner OfferSign up for Flipkart Pay
                  Later and get Flipkart Gift Card worth ₹100*Know More
                </li>
                <li>
                  Available offers Combo OfferBuy 2-3 items save 5%; Buy 4 or
                  more save 10%See all productsT&C Bank OfferFlat ₹50 Instant
                  Cashback on Paytm Wallet. Min Order Value ₹500. Valid once per
                  Paytm accountT&C Bank Offer5% Unlimited Cashback on Flipkart
                  Axis Bank Credit CardT&C Partner OfferSign up for Flipkart Pay
                  Later and get Flipkart Gift Card worth ₹100*Know More
                </li>
                <li>
                  Available offers Combo OfferBuy 2-3 items save 5%; Buy 4 or
                  more save 10%See all productsT&C Bank OfferFlat ₹50 Instant
                  Cashback on Paytm Wallet. Min Order Value ₹500. Valid once per
                  Paytm accountT&C Bank Offer5% Unlimited Cashback on Flipkart
                  Axis Bank Credit CardT&C Partner OfferSign up for Flipkart Pay
                  Later and get Flipkart Gift Card worth ₹100*Know More
                </li>
                <li>
                  Available offers Combo OfferBuy 2-3 items save 5%; Buy 4 or
                  more save 10%See all productsT&C Bank OfferFlat ₹50 Instant
                  Cashback on Paytm Wallet. Min Order Value ₹500. Valid once per
                  Paytm accountT&C Bank Offer5% Unlimited Cashback on Flipkart
                  Axis Bank Credit CardT&C Partner OfferSign up for Flipkart Pay
                  Later and get Flipkart Gift Card worth ₹100*Know More
                </li>
                <li>
                  Available offers Combo OfferBuy 2-3 items save 5%; Buy 4 or
                  more save 10%See all productsT&C Bank OfferFlat ₹50 Instant
                  Cashback on Paytm Wallet. Min Order Value ₹500. Valid once per
                  Paytm accountT&C Bank Offer5% Unlimited Cashback on Flipkart
                  Axis Bank Credit CardT&C Partner OfferSign up for Flipkart Pay
                  Later and get Flipkart Gift Card worth ₹100*Know More
                </li>
              </ul>
            </p>

            <div className="mt-2 shadow-sm bg-slate-50">
              <div className="flex items-center justify-between px-2 py-3 ">
                <h1 className="text-2xl font-bold text-gray-60">
                  Rating & Review
                </h1>
                <h1 className="p-2 ">
                  <span className="bg-green-600 px-2 py-1 rounded-full ">
                    4.3
                  </span>{" "}
                  Rating & 142 Reveiws{" "}
                </h1>

                <AnimatePresence>
                  <button
                    onClick={giveReviewHandler}
                    className="bg-primary shadow-sm rounded-full px-3 py-1 text-slate-50"
                  >
                    Give review
                  </button>
                </AnimatePresence>
              </div>
            </div>

            <div className="text-right px-1 py-2 text-primary">
              <Link href={`/review/${router.query.id}`}>
                <a>View reviews {">>>"}</a>
              </Link>
            </div>
          </div>
        </main>
      )}
      <div className="bg-stone-500 max-w-screen-xl mx-auto">
        <ProductLine lineTag="Related Products" products={relatedList} />
      </div>

      <Footer />
    </div>
  );
}

export default Product;
