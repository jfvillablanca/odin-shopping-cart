import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Root() {
    return (
        <div className='h-screen w-screen'>
            <Nav />
            <Outlet />
        </div>
    );
}

export default Root;
