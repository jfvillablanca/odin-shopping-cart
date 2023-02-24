import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
import NoMatch from "./NoMatch";
import Root from "./Root";
import Shop from "./Shop";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Root />}>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='*' element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

export default App;
