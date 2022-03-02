import React from "react";
import useFetch, {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
} from "../hooks/useFetch";
function getFinalPrice(price, discount) {
  return price * discount;
}

function Cartitem({ product, cartitem }) {
  function removeCartItemHandler() {
    const request = requestBuilder(getAuthHeaders(), "DELETE", null, null);
    fetch(
      "https://shopfortyfive.herokuapp.com/api/cart?id=" + cartitem.id,
      request
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(" deleted successfully");
      });
  }

  function addToCart(reqBody) {
    const request = requestBuilder(getAuthHeaders(), "PUT", null, reqBody);
    fetch(
      "https://shopfortyfive.herokuapp.com/api/cart?id=" + cartitem.id,
      request
    )
      .then((data) => data.json())
      .then((res) => {
        console.log(" updated cart");
      })
      .catch((err) => console.log(err));
  }

  function plusHandler() {
    var reqBody = {
      quantity: cartitem.quantity + 1,
    };
    addToCart(reqBody);
  }

  function minusHandler() {
    if (cartitem.quantity == 0) return;
    var reqBody = {
      quantity: cartitem.quantity - 1,
    };
    addToCart(reqBody);
  }

  return (
    <div className="bg-white shadow-sm mb-1 ">
      <div className="flex gap-2 ">
        <img
          className="w-1/4 aspect-square object-cover"
          src={product.picture}
        />
        <div className="py-2">
          <div>
            <h1 className="text-xl font-light ">{product.name}</h1>
            <div className="text-sm text-gray-600 py-2">
              <p className="mb-1"> Discount - {product.discount_percent}%</p>
              <p className="mb-1">
                {" "}
                Unit Price -{" "}
                {product.discount_percent ? (
                  <span className="line-through">{product.price}</span>
                ) : (
                  ""
                )}
                {product.discount_percent ? (
                  <span className="">
                    {getFinalPrice(product.price, product.discount_percent)}
                  </span>
                ) : (
                  ""
                )}
              </p>
              <p className="mb-1">
                Total Price -{" "}
                {getFinalPrice(
                  product.quantity * product.price,
                  product.discount_percent
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-start gap-2 mb-2">
            <p>Quantity : </p>
            <button
              onClick={minusHandler}
              className="px-2 rounded-full bg-slate-200"
            >
              {" "}
              -{" "}
            </button>
            <p className="border-2 px-1">{cartitem.quantity}</p>
            <button
              onClick={plusHandler}
              className="px-2 rounded-full bg-slate-200"
            >
              {" "}
              +{" "}
            </button>
          </div>
          <button
            onClick={removeCartItemHandler}
            className="outline-none p-2 shadow-sm font-light bg-slate-50 ml-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cartitem;
