import List from "../../../components/admin/List";
import Layout from "../../../components/admin/Layout";

function Discounts() {
  return (
    <Layout active="Discounts">
      <List endPoint="discounts" title="Discounts" />
    </Layout>
  );
}

export default Discounts;
