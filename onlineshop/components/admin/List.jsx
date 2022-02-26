import React, { useEffect, useState } from "react";
import useFetch, { requestBuilder, getAuthHeaders } from "../../hooks/useFetch";
import Row from "./Row";
import Columns from "./Columns";
import Model from "./Model";
import Loading from "../utils/Loading";
import Nodata from "../../components/utils/Nodata";
import { motion, AnimatePresence } from "framer-motion";

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
    let url = "http://localhost:5000/api/" + endPoint;
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

    fetch("http://localhost:5000/api/site?table=" + endPoint, request)
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
      <div className="bg-white  shadow-md  flex items-center  justify-between py-3">
        <h1 className="font-semibold text-lg tracking-widest uppercase pl-2">
          {title}
        </h1>
        <div className="flex gap-2 mx-2">
          <button
            onClick={activateModel}
            className="px-4 py-1 shadow-sm shadow-orange-500 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 "
          >
            <p className="tracking-widest">CREATE</p>
          </button>
        </div>
      </div>
      <div className="relative">
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
      </div>
    </>
  );
}

export default List;
