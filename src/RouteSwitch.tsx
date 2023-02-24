import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./routes/App";
import Home from "./routes/Home";
import Shop from "./routes/Shop";

function RouteSwitch() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/home' element={<Home />} />
                <Route path='/shop' element={<Shop />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RouteSwitch;
