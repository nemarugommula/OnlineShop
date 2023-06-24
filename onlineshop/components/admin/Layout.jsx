import React from "react";
import Sidebar from "./Sidebar";

function Layout(props) {
  return (
    <div className="h-screen w-screen flex bg-gray-50 ">
      <Sidebar active={props.active} />
      <div className="h-screen w-full overflow-x-scroll bg-white ">
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
