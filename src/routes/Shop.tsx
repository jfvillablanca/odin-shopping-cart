import { nanoid } from "nanoid";
import SpinnerImg from "../assets/spinner.svg";

type ProductData = {
    id: string | number;
    title: string;
    price: string | number;
    description: string;
    images: string[];
}

function Shop() {
    const [productData, setProductData] = useState<ProductData[]>([]);


    const loadTheSpinners = () => {
        return Array.from({ length: 8 }).map(() => (
            <ProductCard key={nanoid()} />
        ));
    };

    const loadTheProductData = () => {
        return <></>;
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
    return (
        <div key={id}>
            <img src={imgsrc} alt={description} />
            <h2>{title}</h2>
            <h3>{price ? `$ ${price}` : " "}</h3>
        </div>
    );
}
