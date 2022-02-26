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
      "http://localhost:5000/api/" + endPoint + "?id=" + router.query.id,
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
      "http://localhost:5000/api/" + endPoint + "?id=" + router.query.id,
      request
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(" response >>>> >>>>> " + JSON.stringify(response));
        setOperation(false);
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
    let url = "http://localhost:5000/api/" + endPoint + "?id=" + id;
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

    fetch("http://localhost:5000/api/site?table=" + endPoint, request)
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
      <div className="flex items-center text-slate-50 shadow-sm mb-4 justify-end  gap-2 p-2 bg-white">
        <button
          onClick={onUpdateHandler}
          className="px-2 py-1  ring-2 ring-green-500 shadow-sm text-green-500 hover:bg-green-600 hover:text-slate-50 active:bg-green-700 rounded-sm  font-semibold"
        >
          {operating ? "Processing " : "UPDATE"}
        </button>
        <button
          onClick={onDeleteHandler}
          className=" px-2 py-1 bg-red-600  shadow-sm hover:bg-red-700 active:bg-red-800 rounded-sm  font-semibold"
        >
          {operating ? "Processing " : "DELETE"}
        </button>
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
