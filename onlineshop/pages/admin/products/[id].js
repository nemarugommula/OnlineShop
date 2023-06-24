import React from "react";
import Form from "../../../components/admin/Form";

const choiceQuery = {
  inventory_id: {
    endPoint: "inventory",
    query: {
      product: { is: "null" },
    },
  },
  category_id: {
    endPoint: "categories",
    query: {},
  },
  discount_id: {
    endPoint: "discounts",
    query: {},
  },
};

const imageGallery = {
  table_name:"products",
  title:"Product"
}

function Product() {
  return <Form endPoint="products" choiceQuery={choiceQuery} showImageGallery={imageGallery} />;
}

export default Product;
