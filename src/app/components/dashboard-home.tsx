import SideNav from "./side-nav";

export default async function DashboardHome() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="gap-1 items-center py-0 px-0 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-0 lg:px-0">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <SideNav />
                </div>
                <div className="grid grid-cols-2 gap-0 mt-0">
                    
                </div>
            </div>
        </section>
    );
}