import React, { useState, useEffect } from "react";

function Input({ setReqBody, label, disabled = false, defValue = false }) {
  const [value, setValue] = useState(defValue);
  return (
    <input
      type="checkbox"
      disabled={disabled}
      checked={value}
      onChange={(e) => {
        setValue(e.target.checked);
        setReqBody((prevState) => {
          return {
            ...prevState,
            [label]: e.target.checked ,
          };
        });
      }}
      className="outline-none border-2  shadow-md disabled:bg-blue-50 focus:border-primary  bg-white leading-4 rounded-md px-4 py-3 font-light text-lg  "
    />
  );
}

export default Input;
