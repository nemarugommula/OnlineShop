import List from "../../../components/admin/List";
import Layout from "../../../components/admin/Layout";

function Payments() {
  return (
    <Layout active="Payments">
      <List endPoint="payments" title="Payments" />
    </Layout>
  );
}

export default Payments;
