import List from "../../../components/admin/List";
import Layout from "../../../components/admin/Layout";

function Orders() {
  return (
    <Layout active="Orders">
      <List endPoint="orders" title="Orders" />
    </Layout>
  );
}

export default Orders;
