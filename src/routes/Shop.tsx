import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import SpinnerImg from "../assets/spinner.svg";

type ProductData = {
    id: string | number;
    title: string;
    price: string | number;
    description: string;
    images: string[];
};

function Shop() {
    const [productData, setProductData] = useState<ProductData[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            const resp = await fetch(
                "https://api.escuelajs.co/api/v1/products"
            );
            const data = await resp.json();

            setProductData((prevProductData) => {
                const selectedProductFields: ProductData[] = Array.isArray(data)
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
        };
        getProducts();
    }, []);

    const loadTheSpinners = () => {
        return Array.from({ length: 8 }).map(() => (
            <ProductCard key={nanoid()} />
        ));
    };

    const loadTheProductData = () => {
        return productData.map((product) => (
            <ProductCard
                key={product.id + nanoid()}
                title={product.title}
                price={product.price}
                description={product.description}
                imgsrc={product.images[0]}
            />
        ));
    };

    return (
        <main>
            <h2>Browse our catalog</h2>
            <div>
                {productData.length === 0
                    ? loadTheSpinners()
                    : loadTheProductData()}
            </div>
        </main>
    );
}

export default Shop;

type ProductCardType = {
    id?: string;
    imgsrc?: string;
    title?: string;
    price?: string | number;
    description?: string;
};

function ProductCard({
    id = nanoid(),
    imgsrc = SpinnerImg,
    title = "Loading...",
    price = "",
    description = "Loading...",
}: ProductCardType) {
    const role = title !== "Loading..." ? "article" : "status";
    return (
        <div
            role={role}
            id={id}
        >
            <img src={imgsrc} alt={description} />
            <h2>{title}</h2>
            <h3>{price ? `$ ${price}` : " "}</h3>
        </div>
    );
}
