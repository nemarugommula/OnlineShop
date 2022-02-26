import React from "react";
import List from "../../../components/admin/List";
import Layout from "../../../components/admin/Layout";
function Campaigns() {
  return (
    <div>
      <Layout>
        <List endPoint="campaigns" title="Campaigns" />
      </Layout>
    </div>
  );
}

export default Campaigns;
