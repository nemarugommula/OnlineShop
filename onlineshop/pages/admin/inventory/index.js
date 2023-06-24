import List from "../../../components/admin/List";
import Layout from "../../../components/admin/Layout";

function Inventory() {
  return (
    <Layout active="Inventory">
      <List endPoint="inventory" title="Inventory" />
    </Layout>
  );
}

export default Inventory;
