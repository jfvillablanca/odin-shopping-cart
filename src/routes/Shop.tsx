import { nanoid } from "nanoid";
import SpinnerImg from "../assets/spinner.svg";
import AddToBag from "../assets/AddToBag";

type ProductData = {
    id: string;
    title: string;
    price: string | number;
    description: string;
    images: string[];
};

function Shop({ productData, handleAddToBag }: { productData: ProductData[], handleAddToBag: (id: string) => void }) {
    const cardRenderLimit = 16;

    const loadTheSpinners = () => {
        return Array.from({ length: cardRenderLimit }).map(() => {
            const adHocId = nanoid();
            return <ProductCard id={adHocId} key={adHocId} handleAddToBag={() => void 0}/>;
        });
    };

    const loadTheProductData = () => {
        return productData
            .slice(0, cardRenderLimit)
            .map((product) => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    description={product.description}
                    imgsrc={product.images[0]}
                    handleAddToBag={handleAddToBag}
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
    id: string;
    imgsrc?: string;
    title?: string;
    price?: string | number;
    description?: string;
    handleAddToBag: (id: string) => void;
};

function ProductCard({
    id,
    imgsrc = SpinnerImg,
    title = "Loading...",
    price = "",
    description = "Loading...",
    handleAddToBag,
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
            <div role='button' aria-label={`add ${title} to bag`} onClick={() => handleAddToBag(id)}>
                <AddToBag />
            </div>
        </div>
    );
}
