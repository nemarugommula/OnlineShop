import React, { useEffect, useState } from "react";
import queryString from "qs";

export default function useFetch(requestOptions, url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    console.log("url : " + url);
    console.log(" requestOptions : " + requestOptions);
    fetch(url, requestOptions)
      .then((res) => console.log(" vishnu " + JSON.stringify(res)))
      .then((response) => {
        setData(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error " + err);
        setLoading(false);
        setError(true);
      });
  }, []);

  return [loading, data, error];
}

export function requestBuilder(additionalHeaders, type, query, data) {
  let builder = {};
  builder = {
    method: type,
    headers: { "Content-Type": "application/json", ...additionalHeaders },
  };
  if (data) {
    builder["body"] = JSON.stringify(encodeBooleans(data));
  }
  return builder;
}
const isEmpty = (obj) => Object.keys(obj).length === 0;

export function encodeBooleans(obj) {
  for (let key in obj) {
    if (typeof obj[key] == "boolean") {
      obj[key] = obj[key] + "";
    }
  }
  return obj;
}
export function encodeQuery(obj) {
  return queryString.stringify(obj);
}

export function decodeQuery(str) {
  return queryString.parse(str);
}

export function getAuthHeaders() {
  if (typeof window == "undefined") return {};
  return { authorization: localStorage.getItem("authorization") };
}
