import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";
import { useState } from "react";

export function Dashboard() {
  const [text, setText] = useState("");

  return (
    <div>
      <DashboardNavBar text={text} />

      <div className="mb-5 fixed left-0 bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
