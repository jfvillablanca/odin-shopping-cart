import { nanoid } from "nanoid";
import SpinnerImg from "../assets/spinner.svg";

function Shop() {
    const [productData, setProductData] = useState([]);

    const loadTheSpinners = () => {
        const spinners = Array.from({ length: 8 }).map(() => (
            <ProductCardSpinner key={nanoid()} />
        ));
        return spinners;
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

function ProductCardSpinner() {
    return (
        <div>
            <img src={SpinnerImg} alt='Loading...' />
            <h2 role='status'>Loading...</h2>
            <h3></h3>
        </div>
    );
}
