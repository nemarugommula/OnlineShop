import Input from "./util/Input";
import Choice from "./util/Choice";
import React, { useState, useEffect } from "react";
import useFetch, { requestBuilder, getAuthHeaders } from "../../hooks/useFetch";
import { motion } from "framer-motion";
import Capture from "../admin/util/Capture";
import formatLabel from "../admin/util/formatter";

function Model({
  data = [],
  endPoint,
  setShowModel,
  choiceQuery = {},
  setReload,
}) {
  const [reqBody, setReqBody] = useState();

  function onSubmitHandler() {
    const request = requestBuilder(getAuthHeaders(), "POST", null, reqBody);
    fetch("http://localhost:5000/api/" + endPoint, request)
      .then((res) => res.json())
      .then((response) => {
        setShowModel(false);
        setReload((prev) => !prev);
      })
      .catch((err) => {
        console.log("error " + err);
        setShowModel(false);
        setReload((prev) => !prev);
      });
  }

  function onCloseHanlder() {
    setShowModel(false);
  }

  useEffect(() => {
    const params = {};
    data.forEach((d, i) => {
      params[d.field] = "";
    });
    setReqBody(params);
    return () => {
      setReqBody([]);
    };
  }, []);
  return (
    <motion.div
      initial={{ top: "-100px", opacity: 0 }}
      animate={{ top: "100px", opacity: 1 }}
      transition={{ type: "spring", stiffness: 100 }}
      exit={{ opacity: 0, top: "-100px" }}
      className="shadow-md rounded-md absolute  px-4 py-4 z-10 top-10 left-0 right-0 w-[50%] bg-white mx-auto shadow-primary
        "
    >
      <div className="flex justify-end">
        <button
          onClick={onCloseHanlder}
          className=" right-3 text-2xl text-primary tracking-widest"
        >
          X
        </button>
      </div>
      {data
        .filter((item) => item.create == "true")
        .map((item, index) => {
          return (
            <div key={index} className=" flex items-center py-3 px-2">
              <label className="font-semibold  block text-right pr-2 w-32">
                {formatLabel(item.field)}
              </label>
              <Capture
                type={item.type}
                setReqBody={setReqBody}
                label={item.field}
                choiceQuery={choiceQuery}
              />
            </div>
          );
        })}
      <div>
        <div className="flex justify-end border-t-2 py-2 mt-2">
          <button
            onClick={onSubmitHandler}
            className=" bg-primary text-slate-50  tracking-widest shadow-md rounded-md  hover:bg-blue-600 active:bg-blue-700 p-3 "
          >
            SUBMIT
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default Model;
