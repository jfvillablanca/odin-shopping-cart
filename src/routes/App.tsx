import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
import NoMatch from "./NoMatch";
import Root from "./Root";
import Shop from "./Shop";
import ShoppingBagSidebar from "./ShoppingBagSidebar";

function App() {
    const [isBagOpen, setIsBagOpen] = useState(false);

    const handleBagIconClick = () =>
        setIsBagOpen((prevIsBagOpen) => !prevIsBagOpen);

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Root
                        sidebar={
                            <ShoppingBagSidebar
                                isBagOpen={isBagOpen}
                                bagContents={[]}
                            />
                        }
                        handleBagIconClick={handleBagIconClick}
                    />
                }
            >
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='*' element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

export default App;
