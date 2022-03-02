import React, { useState, useEffect } from "react";
import { requestBuilder, getAuthHeaders } from "../../hooks/useFetch";
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "@heroicons/react/solid";
const modalFields = [
  {
    label: "H:No/Building or Apartment Name/Colony",
    name: "address_line1",
    value: "",
    type: "textarea",
    disabled: false,
  },
  {
    label: "Street/Locality",
    name: "address_line2",
    value: "",
    type: "textarea",
    disabled: false,
  },
  {
    label: "City",
    name: "city",
    value: "",
    type: "text",
    disabled: false,
  },
  {
    label: "Postal Code",
    name: "postal_code",
    value: "",
    type: "number",
    disabled: false,
  },
  {
    label: "Country",
    name: "country",
    value: "India",
    type: "text",
    disabled: true,
  },
  {
    label: "Mobile",
    name: "mobile",
    value: "",
    type: "number",
    disabled: false,
  },
];
function getObjectWithKeysAndValues(fields) {
  const obj = {};
  fields.forEach((item) => {
    obj[item["name"]] = item["value"];
  });
  return obj;
}

function Modal({ setModalRequestObj, setShowModal, modalRequestObj }) {
  return (
    <motion.div
      initial={{ top: "-20px", opacity: 0 }}
      animate={{ top: "20px", opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-3  blur-none  bg-white absolute left-0 right-0 top-10 "
    >
      <div className="border-b flex justify-between px-4 items-center border-primary p-3">
        <h1 className="text-xl font-semibold">Add Address</h1>
        <button onClick={() => setShowModal(false)}>
          <XIcon className="w-10 h-10 text-primary" />
        </button>
      </div>
      <div className="my-3 p-3">
        {modalFields.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center mt-4 gap-2 "
          >
            <label className="w-64">{item.label}</label>
            <input
              value={modalRequestObj[item["name"]]}
              disabled={item.disabled}
              className="bg-slate-50 flex-1 p-3 border-b border-primary"
              onChange={(e) => {
                setModalRequestObj((prev) => {
                  const newObj = {
                    ...prev,
                  };
                  newObj[item["name"]] = e.target.value;
                  return newObj;
                });
              }}
            />
          </div>
        ))}
      </div>
      <div className=" flex justify-end items-center px-4">
        <button
          onSubmit={() => submitModalHandler}
          className="bg-primary p-3 rounded-md text-slate-50 hover:bg-blue-600 active:bg-blue-700 "
        >
          Submit
        </button>
      </div>
    </motion.div>
  );
}

function Address({ user }) {
  const [address, setAddress] = useState();
  const [modalRequestObj, setModalRequestObj] = useState(
    getObjectWithKeysAndValues(modalFields)
  );
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    fetch(
      "https://shopfortyfive.herokuapp.com/api/address?user_id=" + user.id,
      request
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(" address : " + JSON.stringify(data));
        setAddress(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function submitModalHandler() {
    const requestObj = { ...modalObj, user_id: user.id };
    const url = "htts://localhost:5000/api/";
  }

  return (
    <div className="p-2 relative">
      <AnimatePresence>
        {showModal ? (
          <Modal
            setModalRequestObj={setModalRequestObj}
            modalRequestObj={modalRequestObj}
            setShowModal={setShowModal}
          />
        ) : (
          ""
        )}
      </AnimatePresence>
      <div>
        <div className="px-5 mt-5 border-b-2 border-primary py-5">
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary rounded-md text-slate-50 px-3 py-2 "
          >
            Create New Address
          </button>
        </div>

        {address ? (
          address.length > 0 ? (
            address.map((add, index) => <div key={index}></div>)
          ) : (
            <div className="flex py-5 w-full  items-center justify-center">
              <div className="w-64 aspect-video">
                <img src="/deliveryaddress.svg " />
              </div>
              <h1 className="text-center text-2xl ml-5 font-light mt-4">
                No Address
              </h1>
            </div>
          )
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
}

export default Address;
