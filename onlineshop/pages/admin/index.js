import React from "react";
import Layout from "../../components/admin/Layout";

function Admin() {
  return (
    <Layout active="Dashboard">
      <div className="flex justify-center items-center">
        <img className="block w-[60%] aspect-video" src="/dashboard.svg" />
      </div>
    </Layout>
  );
}

export default Admin;
