import List from "../../../components/admin/List";
import Layout from "../../../components/admin/Layout";





function Categories() {
  return (
    <Layout active="Categories">
      <List endPoint="categories" title="Categories" />
    </Layout>
  );
}

export default Categories;
