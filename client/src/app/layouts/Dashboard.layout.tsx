import { Outlet } from "react-router-dom";

import { Header } from "@/shared/components/layout/header/Header";
import { Sidebar } from "@/shared/components/layout/sidebar/Sidebar";

export const DashboardLayout = () => {
    return (
        <div data-theme="dark" className="flex min-h-screen">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Header />

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}