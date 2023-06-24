import React from "react";

function Nodata() {
  return (
    <div className="aspect-video flex flex-col items-center mt-10  justify-start">
      <img src="/nodata.svg" className="w-96 block video-aspect" />
      <p className="text-2xl font-light mt-10">No Records Found!!</p>
    </div>
  );
}

export default Nodata;
