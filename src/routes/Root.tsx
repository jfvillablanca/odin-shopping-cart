import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Root({
    sidebar,
    handleBagIconClick,
}: {
    sidebar: ReactNode;
    handleBagIconClick: () => void;
}) {
    return (
        <div className='h-screen w-screen'>
            <Nav handleClick={handleBagIconClick} />
            <main className='relative'>
                <Outlet />
                {sidebar}
            </main>
        </div>
    );
}

export default Root;
