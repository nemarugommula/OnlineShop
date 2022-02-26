import React from "react";
import Form from "../../../components/admin/Form";

const imageGallery = {
  table_name: "users",
  title: "User",
};

function User() {
  return <Form endPoint="users" showImageGallery={imageGallery} />;
}

export default User;
