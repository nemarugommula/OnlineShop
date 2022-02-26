import List from "../../../components/admin/List";
import Layout from "../../../components/admin/Layout";

function Users() {
  return (
    <Layout>
      <List endPoint="users" title="Users" />
    </Layout>
  );
}

export default Users;
