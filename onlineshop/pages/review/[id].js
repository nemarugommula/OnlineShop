import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../../hooks/useFetch";
import Router, { useRouter } from "next/router";
import { route } from "next/dist/server/router";
function Review() {
  const [reviews, setReviews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log(" product_id : " + router.query.id);
    if (!router.query.id) return;
    const includeUserQuery = {
      include: {
        user: "true",
        product: "true",
      },
    };
    const id = router.query.id;
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    fetch(
      "http://localhost:5000/api/product_review?product_id=" +
        id +
        "&" +
        encodeQuery(includeUserQuery),
      request
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(" res-----> :" + JSON.stringify(res));

        setReviews(res);
        console.log(" reviews set");
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="bg-slate-50">
      <Navbar />
      <div className="mt-2 shadow-sm bg-white  text-black max-w-screen-xl mx-auto">
        <div className="border-b flex items-center justify-between p-4">
          <button onClick={() => router.back()}>Back</button>
          <div className="">rating</div>
        </div>
        {reviews && reviews.length > 0
          ? reviews.map((review) => (
              <div
                key={review.id}
                className="my-2 flex items-center justify-center shadow-sm bg-slate-50 shadow-black"
              >
                <div className="w-10 h-10">
                  <img
                    src={review.user.picture}
                    className="w-full block h-full"
                  />
                </div>
                <div className="flex flex-col gap-2 items-center justify-center flex-1 p-4">
                  <h3>{review.user.username}</h3>
                  <p>{review.review}</p>
                </div>
              </div>
            ))
          : "Loading.."}
      </div>
    </div>
  );
}

export default Review;
