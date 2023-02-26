import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
import NoMatch from "./NoMatch";
import Root from "./Root";
import Shop from "./Shop";
import ShoppingBagSidebar from "./ShoppingBagSidebar";

type ProductData = {
    id: string | number;
    title: string;
    price: string | number;
    description: string;
    images: string[];
};

function App() {
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [productData, setProductData] = useState<ProductData[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const resp = await fetch(
                    "https://api.escuelajs.co/api/v1/products"
                );
                const data = await resp.json();

                setProductData((prevProductData) => {
                    const selectedProductFields: ProductData[] = Array.isArray(
                        data
                    )
                        ? data.map((product: ProductData) => ({
                              id: product.id,
                              title: product.title,
                              price: product.price,
                              description: product.description,
                              images: [...product.images],
                          }))
                        : [];

                    return prevProductData.concat(selectedProductFields);
                });
            } catch (error) {
                console.error(error);
            }
        };
        getProducts();
    }, []);

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
                <Route
                    path='shop'
                    element={<Shop productData={productData} />}
                />
                <Route path='*' element={<NoMatch />} />
            </Route>
        </Routes>
    );
}

export default App;
