import { Footer } from "../../../components/Footer";
import { Navbar } from "../../../components/Navbar";

export function Home() {
    return (
        <div className="min-h-screen">
            <Navbar />
            <Footer className="absolute bottom-0" />
        </div>

    )
}