import React, { useEffect, useState } from "react";
import Capture from "../admin/util/Capture";
import formatLabel from "../admin/util/formatter";
const readOnly = ["created_at", "modified_at", "id", "picture"];

function Field({
  label,
  value,
  disabled,
  setNewData,
  fieldsObj,
  choiceQuery,
  parentId,
}) {
  const currField = fieldsObj[label];
  if (!currField) return <></>;
  return (
    <Capture
      type={currField["type"] ? currField["type"] : "input"}
      setReqBody={setNewData}
      choiceQuery={choiceQuery}
      value={value}
      disabled={disabled}
      label={label}
    />
  );
}

function Page({ newData = {}, setNewData, fieldsObj, choiceQuery }) {
  return (
    <div className=" flex justify-between mx-auto max-w-screen-xl p-5 gap-5 px-4">
      <div className="flex flex-col flex-1 gap-4">
        {Object.keys(newData)
          .filter((item) => readOnly.indexOf(item) == -1)
          .map((item, index) => {
            return (
              <div key={index} className="flex items-center  gap-2">
                <h1 className="font-semibold  w-32  text-right ">
                  {formatLabel(item)}
                </h1>
                <Field
                  key={index}
                  label={item}
                  value={newData[item]}
                  disabled={false}
                  setNewData={setNewData}
                  fieldsObj={fieldsObj}
                  choiceQuery={choiceQuery}
                />
              </div>
            );
          })}
      </div>
      <div className="flex flex-col flex-1 gap-4">
        {Object.keys(newData)
          .filter((item) => readOnly.indexOf(item) != -1)
          .map((item, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-2"
              >
                <h1 className="w-24  text-right font-semibold">
                  {formatLabel(item)}
                </h1>
                <Field
                  key={index}
                  label={item}
                  value={newData[item]}
                  disabled={true}
                  fieldsObj={fieldsObj}
                  parentId={newData["id"]}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Page;
