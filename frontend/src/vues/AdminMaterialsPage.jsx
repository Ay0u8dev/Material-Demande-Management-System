import React, { useEffect, useState } from "react";

import Dashboard from "@/components/admin_components/Dashboard";
import api from "@/utils/api";
import { DataTable } from "@/components/admin_components/data-table";
import { columns } from "@/components/admin_components/materialsColumns";

export default function AdminMaterialsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const materialsData = await api.get("/admin/get-materials");
      console.log("Materials Data:", materialsData.data);

      setData(materialsData.data);
    } catch (error) {
      console.error("Error fetching tickets data:", error);
    }
    setLoading(false);
  };

  if (loading) {
    return null;
  }

  return (
    <>
      <Dashboard title="Admin Dashboard">
        <h1 className="text-2xl font-semibold mb-4">Parametrage d'articles</h1>
        <div className="min-w-3xl mx-auto px-10">
          <DataTable columns={columns(getData)} data={data} />
        </div>
      </Dashboard>
    </>
  );
}
