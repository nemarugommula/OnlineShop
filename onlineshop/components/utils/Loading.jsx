import React from "react";

function Loading() {
  return (
    <div className="m-10 flex justify-center  items-center">
      <svg className="animate-spin h-12 w-12 bg-primary block" viewBox="0 0 24 24"></svg> <h2 className="mx-10">Loading....</h2>
    </div>
  );
}

export default Loading;
