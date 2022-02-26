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
      "http://localhost:5000/api/" + endPoint + encodeQuery(queryObj);
    fetch(enqQueryURL, request)
      .then((res) => res.json())
      .then((response) => {
        setValue(response);
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
