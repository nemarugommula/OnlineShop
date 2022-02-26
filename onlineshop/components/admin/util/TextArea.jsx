import React, { useState, useEffect } from "react";

function TextArea({ setReqBody, label, disabled = false, defValue }) {
  const [value, setValue] = useState(defValue);
  return (
    <textarea

      disabled={disabled}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        setReqBody((prevState) => {
          return {
            ...prevState,
            [label]: e.target.value,
          };
        });
      }}
      className="outline-none border-2 flex-1 shadow-md disabled:bg-blue-50 focus:border-primary  bg-white leading-4 rounded-md px-4 py-3 font-light text-lg  "
    />
  );
}

export default TextArea;
