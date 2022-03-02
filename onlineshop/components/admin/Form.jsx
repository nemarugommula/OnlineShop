import React, { useEffect, useState, useRef } from "react";
import Layout from "./Layout";
import { useRouter } from "next/router";
import Router from "next/router";
import useFetch, {
  requestBuilder,
  getAuthHeaders,
  encodeQuery,
  decodeQuery,
} from "../../hooks/useFetch";
import Back from "../utils/Back";
import {
  TrashIcon,
  SaveAsIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";

import Loading from "../utils/Loading";
import Page from "../admin/Page";
import ImageSlideShow from "../admin/ImageSlideShow";

function Form({ endPoint, choiceQuery, showImageGallery }) {
  const [loading, setLoading] = useState(true);
  const [newData, setNewData] = useState();
  const [operating, setOperation] = useState(false);
  const router = useRouter();
  const [fieldsObj, setFieldObj] = useState({});
  const upload = useRef();

  function onUpdateHandler() {
    setOperation(true);
    const request = requestBuilder(getAuthHeaders(), "PUT", null, newData);
    fetch(
      "https://shopfortyfive.herokuapp.com/api/" +
        endPoint +
        "?id=" +
        router.query.id,
      request
    )
      .then((res) => res.json())
      .then((response) => {
        setNewData(response);
        setOperation(false);
      })
      .catch((err) => {
        console.log("error " + err);
        setOperation(false);
      });
  }
  function onDeleteHandler() {
    setOperation(true);

    const request = requestBuilder(getAuthHeaders(), "DELETE", null, null);
    fetch(
      "https://shopfortyfive.herokuapp.com/api/" +
        endPoint +
        "?id=" +
        router.query.id,
      request
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(" response >>>> >>>>> " + JSON.stringify(response));
        setOperation(false);
        router.back();
      })
      .catch((err) => {
        console.log("error " + JSON.stringify(err));
        setOperation(false);
      });
  }

  useEffect(() => {
    if (operating) return;
    setLoading(true);
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    const id = router.query.id;
    let url =
      "https://shopfortyfive.herokuapp.com/api/" + endPoint + "?id=" + id;
    console.log(" form url : " + url);
    fetch(url, request)
      .then((res) => res.json())
      .then((response) => {
        setNewData(response[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error " + err);
      });

    fetch(
      "https://shopfortyfive.herokuapp.com/api/site?table=" + endPoint,
      request
    )
      .then((res) => res.json())
      .then((response) => {
        let fb = {};
        response.forEach((ite) => {
          const lb = ite.field;
          fb[lb] = ite;
        });
        setFieldObj(fb);
      })
      .catch((err) => {
        console.log("error " + err);
      });
    return () => {
      setNewData({});
      setFieldObj([]);
    };
  }, [router.query.id, operating]);
  return (
    <Layout>
      <Back border="border-b" padding="py-2" />
      <div className="flex items-center text-slate-50 shadow-sm mb-4 justify-between  p-2 bg-white">
        <div className="text-gray-600 flex items-center justify-center gap-2 capitalize font-semibold text-xl">
          <InformationCircleIcon className="w-5 h-5" />
          <h1>{endPoint} details</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onUpdateHandler}
            className="p-2  flex items-center justify-center gap-1 bg-green-500  hover:bg-green-600  active:bg-green-700 rounded-sm "
          >
            <SaveAsIcon className="w-5 h-5" />
            {operating ? "Processing " : "Save"}
          </button>
          <button
            onClick={onDeleteHandler}
            className=" p-2 gap-1 bg-red-600  flex  items-center justify-center hover:bg-red-700 active:bg-red-800 rounded-sm "
          >
            <TrashIcon className="w-5 h-5" />
            {operating ? "Processing " : "Remove"}
          </button>
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Page
          setNewData={setNewData}
          newData={newData}
          fieldsObj={fieldsObj}
          choiceQuery={choiceQuery}
        />
      )}

      {showImageGallery ? (
        <ImageSlideShow
          table_name={endPoint}
          showImageGallery={showImageGallery}
          record_id={router.query.id}
          default_picture={newData ? newData["picture"] : ""}
        />
      ) : (
        ""
      )}
    </Layout>
  );
}
export default Form;
