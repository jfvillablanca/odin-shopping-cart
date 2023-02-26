import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Root() {
    const [isBagOpen, setIsBagOpen] = useState(false);

    const handleBagIconClick = () =>
        setIsBagOpen((prevIsBagOpen) => !prevIsBagOpen);

    return (
        <div className='h-screen w-screen'>
            <Nav handleClick={handleBagIconClick} />
            <main className='relative'>
                <Outlet />
            </main>
        </div>
    );
}

export default Root;
