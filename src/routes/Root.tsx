import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function Root() {
    const [isBagOpen, setIsBagOpen] = useState(false);

    const handleBagIconClick = () =>
        setIsBagOpen((prevIsBagOpen) => !prevIsBagOpen);

    return (
        <div className='h-screen w-screen'>
            <Nav handleClick={handleBagIconClick} />
            <main className='relative'>
                <Outlet />
                <ShoppingBagSidebar isBagOpen={isBagOpen} bagContents={[]} />
            </main>
        </div>
    );
}

export default Root;

type ItemInCheckout = {
    id: string;
    title: string;
    quantity: number;
    price: number;
};

function ShoppingBagSidebar({
    isBagOpen,
    bagContents,
}: {
    isBagOpen: boolean;
    bagContents: ItemInCheckout[];
}) {
    const checkoutItems = bagContents.map((item) => {
        return (
            <div className='flex' key={item.id}>
                <h3>{item.title}</h3>
                <h3>{item.quantity}</h3>
                <h3>{item.price}</h3>
            </div>
        );
    });

    const checkoutTotal = bagContents.reduce(
        (acc: number, cur: ItemInCheckout) => {
            return acc + cur.price * cur.quantity;
        },
        0
    );

    return (
        <aside
            className='absolute right-0 top-0 bg-blue-300 w-1/4 z-50'
            hidden={!isBagOpen}
        >
            {bagContents.length === 0 && <h2>Your bag is empty</h2>}
            <div className='flex flex-col'>
                {checkoutItems}
                <h2 aria-label='Checkout Total'>
                    Checkout Total: $ {`${checkoutTotal.toFixed(2)}`}
                </h2>
            </div>
            <button
                disabled={bagContents.length === 0}
                aria-label='Checkout Button'
            >
                Checkout Now
            </button>
        </aside>
    );
}
