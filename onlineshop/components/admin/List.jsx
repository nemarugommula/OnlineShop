import React, { useEffect, useState } from "react";
import useFetch, { requestBuilder, getAuthHeaders } from "../../hooks/useFetch";
import Row from "./Row";
import Columns from "./Columns";
import Model from "./Model";
import Loading from "../utils/Loading";
import Nodata from "../../components/utils/Nodata";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircleIcon } from "@heroicons/react/solid";
function List({
  endPoint,
  title,
  choiceQuery = {},
  includeRelationQuery = "",
}) {
  const request = requestBuilder(getAuthHeaders(), "GET", null, null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [showModel, setShowModel] = useState();
  const [modelData, setModelData] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    let url = "https://shopfortyfive.herokuapp.com/api/" + endPoint;
    console.log(" url : " + url);
    if (includeRelationQuery) url += "?" + includeRelationQuery;
    console.log("url : " + url);
    fetch(url, request)
      .then((res) => res.json())
      .then((response) => {
        console.log(" response : " + JSON.stringify(response));
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error " + err);
        setLoading(false);
      });

    fetch(
      "https://shopfortyfive.herokuapp.com/api/site?table=" + endPoint,
      request
    )
      .then((res) => res.json())
      .then((response) => {
        setModelData(response);
      })
      .catch((err) => {
        console.log("error " + err);
      });
  }, [reload]);

  function activateModel() {
    setShowModel(true);
  }

  return (
    <>
      <div className="bg-white  shadow-md  flex items-center  justify-between py-2">
        <h1 className="font-semibold text-lg tracking-widest uppercase pl-2">
          {title}
        </h1>
        <div className="flex gap-2 mx-2">
          <button
            onClick={activateModel}
            className="px-4 py-2 tracking-widest shadow-sm flex  items-center gap-2 justify-center rounded-sm text-slate-50 bg-primary hover:bg-blue-500 active:bg-blue-600 "
          >
            <PlusCircleIcon className="w-5 h-5" />
            <p className="">Add new item</p>
          </button>
        </div>
      </div>
      <div className={`relative ${showModel && "blur-sm"}`}>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {data && data.length >= 1 ? (
              <>
                <Columns data={Object.keys(data[0])} />
                <Row data={data} endPoint={endPoint} />
              </>
            ) : (
              <Nodata />
            )}
          </div>
        )}
      </div>
      <AnimatePresence>
        {showModel ? (
          <Model
            setReload={setReload}
            setShowModel={setShowModel}
            data={modelData}
            endPoint={endPoint}
            choiceQuery={choiceQuery}
          />
        ) : (
          ""
        )}
      </AnimatePresence>
    </>
  );
}

export default List;
