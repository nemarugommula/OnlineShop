import React from "react";
import Form from "../../../components/admin/Form";

const imageGallery = {
  table_name: "categories",
  title: "category",
};

function Category() {
  return <Form endPoint="categories" showImageGallery={imageGallery} />;
}

export default Category;
