import SpinnerImg from "../assets/spinner.svg";

function Shop() {
    return (
        <main>
            <h2>Browse our catalog</h2>
        </main>
    );
}

export default Shop

function ProductCardSpinner() {
    return (
        <div>
            <img src={SpinnerImg} alt='Loading...' />
            <h2 role='status'>Loading...</h2>
            <h3></h3>
        </div>
    );
}
