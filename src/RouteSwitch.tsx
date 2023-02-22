import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import Shop from "./Shop";

function RouteSwitch() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch
