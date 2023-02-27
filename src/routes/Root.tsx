import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Root({
    sidebar,
    numOfItemsInBag,
    handleBagIconClick,
}: {
    sidebar: ReactNode;
    numOfItemsInBag: number;
    handleBagIconClick: () => void;
}) {
    return (
        <div className='h-screen w-screen'>
            <Nav handleClick={handleBagIconClick} numOfItemsInBag={numOfItemsInBag}/>
            <main className='relative'>
                <Outlet />
                {sidebar}
            </main>
        </div>
    );
}

export default Root;
