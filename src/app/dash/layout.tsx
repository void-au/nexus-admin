import { Footer } from "@/comps/Footer";
import { Header } from "@/comps/Header";
import { Sidepanel } from "@/comps/Sidepanel";
import { ReactNode } from "react";

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="dashboard-layout">
            <Sidepanel />
            <div className="content">
                <Header />

                <div className="dashboard-pages">
                    {children}
                </div>

                <Footer />
            </div>

        </div>
    )
}

export default DashboardLayout;