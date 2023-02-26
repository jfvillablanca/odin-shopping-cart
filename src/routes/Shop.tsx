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
    const cardRenderLimit = 16;

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
        return Array.from({ length: cardRenderLimit }).map(() => (
            <ProductCard key={nanoid()} />
        ));
    };

    const loadTheProductData = () => {
        return productData.slice(0, cardRenderLimit).map((product) => (
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
        <div className='h-full py-4 px-20'>
            <h2 className='mb-6 uppercase'>Browse our catalog</h2>
            <div className='flex flex-wrap gap-9 pr-32'>
                {productData.length === 0
                    ? loadTheSpinners()
                    : loadTheProductData()}
            </div>
        </div>
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
            className='flex flex-col w-40 h-52 p-2 bg-blue-400'
        >
            <img src={imgsrc} alt={description} />
            <h2>{title}</h2>
            <h3>{price ? `$ ${price}` : " "}</h3>
        </div>
    );
}
