import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../styles/App.css";
import Home from "./Home";
import NoMatch from "./NoMatch";
import Root from "./Root";
import Shop from "./Shop";
import ShoppingBagSidebar from "./ShoppingBagSidebar";

type ProductData = {
    id: string;
    title: string;
    price: string | number;
    description: string;
    images: string[];
};

type ItemInCheckout = {
    id: string;
    title: string;
    quantity: number;
    price: number;
};

function App() {
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [bagContents, setBagContents] = useState<ItemInCheckout[]>([]);
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
                              id: product.id + nanoid(),
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

    const handleAddToBag = (id: string) => {
        const itemForCheckout: ProductData = productData.find(
            (product) => id === product.id
        ) as ProductData;

        const indexOfItemToUpdate = bagContents.findIndex(
            (content) => id === content.id
        );
        if (indexOfItemToUpdate !== -1) {
            setBagContents((prevBagContents) => {
                return prevBagContents.map((content, i) => {
                    if (indexOfItemToUpdate === i) {
                        return { ...content, quantity: content.quantity + 1 };
                    } else {
                        return content;
                    }
                });
            });
        } else {
            setBagContents((prevBagContents) =>
                prevBagContents.concat([
                    {
                        id: itemForCheckout.id,
                        title: itemForCheckout.title,
                        quantity: 1,
                        price: +itemForCheckout.price,
                    },
                ])
            );
        }
    };

    return (
        <Routes>
            <Route
                path='/'
                element={
                    <Root
                        sidebar={
                            <ShoppingBagSidebar
                                isBagOpen={isBagOpen}
                                bagContents={bagContents}
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
