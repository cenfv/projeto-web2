import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { useState } from "react";
import { DataTable } from "../../components/DataTable";

export function Dashboard() {
  return (
    <div>
      <DashboardNavBar />
      <DataTable />
      <div className="mb-5 fixed left-0 bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
