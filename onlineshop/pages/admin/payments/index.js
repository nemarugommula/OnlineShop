import List from "../../../components/admin/List";
import Layout from "../../../components/admin/Layout";

function Payments() {
  return (
    <Layout>
      <List endPoint="payments" title="Payments" />
    </Layout>
  );
}

export default Payments;