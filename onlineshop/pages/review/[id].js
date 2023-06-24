import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../../hooks/useFetch";
import Back from "../../components/utils/Back";
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
      "https://shopfortyfive.herokuapp.com/api/product_review?product_id=" +
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
    <div className="bg-white">
      <Navbar />
      <div className="mt-2 shadow-sm bg-white  text-black max-w-screen-xl mx-auto">
        <Back border="border-b" padding="py-2" />
        {reviews ? (
          reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="my-2 flex items-center justify-center shadow-sm bg-white "
              >
                <div className="p-3 border-r">
                  <img
                    src={review.user.picture}
                    className=" block w-10  aspect-square object-cover"
                  />
                  <h3>{review.user.username}</h3>
                </div>
                <div className=" font-light gap-2 flex-1 px-2">
                  <p>{review.review}</p>
                  <p>
                    Rating :{" "}
                    <span
                      className={`px-1 rounded-sm ${
                        review.rating >= 3 && "bg-green-400"
                      } ${
                        review.rating < 3 &&
                        review.rating > 1 &&
                        "bg-yellow-400"
                      } 
                      ${review.rating <= 1 && "bg-red-500 text-white"}
                      `}
                    >
                      {review.rating}
                    </span>{" "}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col py-5 w-full  items-center justify-center">
              <div className="aspect-video">
                <img src="/noreview.svg " />
              </div>
              <h1 className="text-center text-2xl ml-5 font-light mt-4">
                No Reviews yet!!
              </h1>
            </div>
          )
        ) : (
          "Loading.."
        )}
      </div>
    </div>
  );
}

export default Review;
