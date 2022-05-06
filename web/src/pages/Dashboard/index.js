import { Footer } from "../../components/Footer";
import { DashboardNavBar } from "../../components/DashboardNavBar";


export function Dashboard() {
    return (
        <div>
            <DashboardNavBar />

            <div className="mb-5 fixed left-0 bottom-0 w-full">
                <Footer />
            </div>
        </div>
    );
}