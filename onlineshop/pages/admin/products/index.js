import List from "../../../components/admin/List";
import Layout from "../../../components/admin/Layout";
import { encodeQuery } from "../../../hooks/useFetch";

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

const includeRelationQuery = {
  include: {
    category: "true",
    inventory: "true",
    discount: "true",
  },
};

function Products() {
  return (
    <Layout active="Products">
      <List
        endPoint="products"
        title="Products"
        includeRelationQuery={encodeQuery(includeRelationQuery)}
        choiceQuery={choiceQuery}
      />
    </Layout>
  );
}

export default Products;
