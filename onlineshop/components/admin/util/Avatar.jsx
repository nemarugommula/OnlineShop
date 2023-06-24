import React from "react";

function Avatar({ picture }) {
  if (!picture) picture = "/profile.svg";
  return (
    <div className="w-10 h-10">
      <img
        className="w-full shadow-sm shadow-gray-800  h-full object-cover rounded-full"
        src={picture}
      />
    </div>
  );
}

export default Avatar;
