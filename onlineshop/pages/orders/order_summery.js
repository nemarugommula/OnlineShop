import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { requestBuilder, getAuthHeaders } from "../../hooks/useFetch";

function Ordersummery() {
  const router = useRouter();
  const [order, setOrder] = useState();
  useEffect(() => {
    if (!router.query.id) return;
    const url =
      "https://shopfortyfive.herokuapp.com/api/orders?id=" + router.query.id;
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    fetch(url, request)
      .then((data) => data.json())
      .then((res) => {
        console.log(" response : " + JSON.stringify(res));
        setOrder(res[0]);
      });
  }, [router.query.id]);
  return (
    <div>
      <div className="p-5">
        <button className="" onClick={() => router.back()}>
          Back
        </button>
      </div>
      {order ? (
        <div>
          {order.order_item.map((item, index) => (
            <div key={index}>
              <img src={item.product.picture} />
              <h3> quantity : {item.quantity}</h3>
              <h3>total : {item.total}</h3>
              {item.saved ? <h3>saved : {item.saved}</h3> : ""}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
      <div>
        <h1>Shipping Address</h1>
        <p>
          {item.address.address_line1} <br />
          {item.address.address_line2} <br />
          {item.address.city} <br />
          {item.address.country} <br />
          {item.address.postal_code} <br />
        </p>
      </div>
      <div>Total :</div>
    </div>
  );
}

export default Ordersummery;
