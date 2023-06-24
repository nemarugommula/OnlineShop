import React from "react";

const selectedStyles = "absolute top-5 left-5 right-5 ";
const notselectedStyles = "";

function OrderItem({ order }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      className={` ${selected && selectedStyles} ${
        !selected && notselectedStyles
      } `}
    >
      {selected ? (
        <div className="flex justify-end border-b border-primary p-5 w-full">
          <button onClick={() => setSelected(false)}>X</button>
        </div>
      ) : (
        ""
      )}
      <div className="flex justify-between items-center mx-2 p-3 ">
        <div className="flex gap-2">
          <div>
            <h3 className="text-md font-semibold">Order Placed</h3>
            <p className="text-lg font-light ">{order.created_at}</p>
          </div>
          <div>
            <h3 className="text-md font-semibold">Total</h3>
            <p className="text-lg font-light ">{order.total}</p>
          </div>
          <div>
            <h3 className="text-md font-semibold">Ship To</h3>
            <p className="text-lg font-light ">{order.address.address_line1}</p>
          </div>
        </div>
        <div>
          {!selected ? (
            <button onClick={() => setSelected(true)}>More</button>
          ) : (
            <button>Invoice</button>
          )}
        </div>
      </div>
      {selected ? (
        <div>
          {order.order_items.map((item, index) => (
            <div key={index} className="mt-3">
              <img src={item.product.picture} className="w-10 h-10" />
              <h3> quantity : {item.quantity}</h3>
              <h3>Price : {item.total} </h3>
              {item.saved ? <h3>saved {item.saved}</h3> : ""}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default OrderItem;
