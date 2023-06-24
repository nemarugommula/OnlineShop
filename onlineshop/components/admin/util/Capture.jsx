import React from "react";
import queryString from "query-string";
import Input from "./Input";
import TextArea from "./TextArea";
import Choice from "./Choice";
import Checkbox from "./Checkbox";

function Capture({
  type,
  label,
  setReqBody,
  choiceQuery = {},
  value = "",
  disabled,
  parentId,
}) {
  if (type == "input") {
    return (
      <Input
        disabled={disabled}
        defValue={value}
        label={label}
        setReqBody={setReqBody}
      />
    );
  } else if (type == "textarea") {
    return (
      <TextArea
        disabled={disabled}
        defValue={value}
        label={label}
        setReqBody={setReqBody}
      />
    );
  } else if (type == "date") {
    return <input disabled={disabled} value={value} type="date" />;
  } else if (type == "choice") {
    console.log(" choice : " + value);
    return (
      <Choice
        disabled={disabled}
        defValue={value}
        label={label}
        setReqBody={setReqBody}
        endPoint={choiceQuery[label]["endPoint"]}
        queryObj={choiceQuery[label]["query"]}
      />
    );
  } else if (type == "checkbox") {
    return (
      <Checkbox
        disabled={disabled}
        defValue={value}
        label={label}
        setReqBody={setReqBody}
      />
    );
  }
  return <input type={type} disabled={disabled} value={value} />;
}

export default Capture;
