import React from "react";
import { useState, useEffect, useContext } from "react";
import Router from "next/router";
import useFetch, { requestBuilder, getAuthHeaders } from "../hooks/useFetch";
function makeRequest(reqeustobj, url) {
  return fetch(url, reqeustobj).then((url) => url.json());
}
import { XIcon, CollectionIcon, WifiIcon } from "@heroicons/react/solid";
import { useUserData, getUserid } from "../data_utils/homePageFetch";

function Wishlist({ wishlist_id = false, product_id, user_id = null }) {
  const [wishlistID, setWishlistID] = useState(wishlist_id);
  const [active, setActive] = useState(false);
  user_id = user_id || getUserid();
  console.log(" user _ id : " + user_id);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (wishlistID) {
      setActive(true);
      return;
    }
    if (!product_id || !user_id) return;
    const requestobj = requestBuilder(getAuthHeaders(), "GET", null, null);
    const url =
      "https://shopfortyfive.herokuapp.com/api/wishlist?user_id=" +
      user_id +
      "&product_id=" +
      product_id;
    makeRequest(requestobj, url).then((data) => {
      console.log(" wishlist data : " + JSON.stringify(data));
      if (data && data.length == 0) return;
      setWishlistID(data[0].id);
      setActive(true);
      setLoading(false);
    });
  }, [user_id]);
  function clickHandler() {
    if (!user_id) {
      setLoading(true);
      Router.push({
        pathname: "/account/login",
        query: {
          status: "reason",
          reason: "Please login to add product to watchlist",
        },
      });
    } else if (wishlistID) {
      //remove from watchlist and remove wishlistId
      const requestobj = requestBuilder(getAuthHeaders(), "DELETE", null, null);
      const url =
        "https://shopfortyfive.herokuapp.com/api/wishlist?id=" + wishlistID;
      makeRequest(requestobj, url)
        .then((data) => {
          setWishlistID(false);
          setActive(false);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      //create wishlist and update wishlistID
      const requestobj = requestBuilder(getAuthHeaders(), "POST", null, {
        product_id,
        user_id,
      });
      const url = "https://shopfortyfive.herokuapp.com/api/wishlist";

      makeRequest(requestobj, url)
        .then((data) => {
          setWishlistID(data.id);
          setLoading(false);
          setActive(true);
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className=" text-right">
      <div className="inline-block px-2 py-1 rounded-full bg-slate-200  my-2">
        {loading ? (
          <WifiIcon className="w-8 h-8" />
        ) : (
          <button onClick={clickHandler}>
            {active ? (
              <CollectionIcon className="w-8 text-yellow-400 h-8" />
            ) : (
              <CollectionIcon className="w-8 text-white h-8" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
