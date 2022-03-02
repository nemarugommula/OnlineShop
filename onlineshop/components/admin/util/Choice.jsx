import React, { useState, useEffect } from "react";
import useFetch, {
  encodeQuery,
  requestBuilder,
  getAuthHeaders,
} from "../../../hooks/useFetch";

function Choice({
  setReqBody,
  label,
  queryObj,
  endPoint,
  disabled = false,
  defValue,
}) {
  const [value, setValue] = useState([]);
  const [slectedChoice, setSlectedChoice] = useState(defValue);
  useEffect(() => {
    const request = requestBuilder(getAuthHeaders(), "GET", null, null);
    if (Object.keys(queryObj).length > 0) endPoint += "?";

    const enqQueryURL =
      "https://shopfortyfive.herokuapp.com/api/" +
      endPoint +
      encodeQuery(queryObj);
    fetch(enqQueryURL, request)
      .then((res) => res.json())
      .then((response) => {
        const found = response.reduce((status, item) => {
          if (status) return status;
          return item.id == defValue;
        }, false);
        if (defValue && !found) {
          const parentIdUrl =
            "https://shopfortyfive.herokuapp.com/api/" +
            endPoint +
            "id=" +
            defValue;
          fetch(parentIdUrl, request)
            .then((parRes) => parRes.json())
            .then((parent) => {
              console.log("parent : " + JSON.stringify(parent));
              console.log("response  : " + JSON.stringify(response));

              response = [...response, parent[0]];

              setValue(response);
            });
        } else {
          setValue(response);
        }
      })
      .catch((err) => {
        console.log("error " + err);
      });
    return () => {
      setValue([]);
    };
  }, []);
  return (
    <>
      <select
        value={slectedChoice}
        disabled={disabled}
        onChange={(e) => {
          setSlectedChoice(e.target.value);
          setReqBody((prevState) => {
            return {
              ...prevState,
              [label]: e.target.value,
            };
          });
        }}
        className="outline-none min-w-[200px] border-2 flex-1 shadow-md disabled:bg-blue-50 focus:border-primary  bg-white leading-4 rounded-md px-4 py-3 font-light text-lg  "
      >
        {slectedChoice ? (
          ""
        ) : (
          <option value="none" selected>
            Select an Option
          </option>
        )}

        {value.map((item, index) => (
          <option value={item.id} key={index}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
}

export default Choice;
