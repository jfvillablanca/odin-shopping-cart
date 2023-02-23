import { Outlet } from "react-router-dom";
import "../styles/App.css";
import Nav from "./Nav";

function App() {
    return (
        <div className='App h-screen w-screen'>
            <Nav />
            <Outlet />
        </div>
    );
}

export default App;
