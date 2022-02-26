import React from "react";
import Form from "../../../components/admin/Form";
import { encodeQuery } from "../../../hooks/useFetch";

const includeRelationQuery = {
  include: {

  },
};

function Product() {
  return (
    <Form
      endPoint="payments"
      includeRelationQuery={encodeQuery(includeRelationQuery)}
    />
  );
}

export default Product;
