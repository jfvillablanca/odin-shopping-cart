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
            <div role="listitem" aria-label="bag-item" className='flex flex-col gap-2 w-full' key={item.id}>
                <h3 className="title">{item.title}</h3>
                <div className="flex justify-between w-full">
                    <h3 className="quantity justify-end">{item.quantity} x</h3>
                    <h3 className="price">{(item.price).toFixed(2)}</h3>
                    <h3 className="subtotal">{(item.quantity * item.price).toFixed(2)}</h3>
                </div>
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
            className='absolute right-0 top-0 bg-blue-800 w-1/4 z-50 py-2 px-4'
            hidden={!isBagOpen}
        >
            {bagContents.length === 0 && <h2>Your bag is empty</h2>}
            <div role="list" className='flex flex-col gap-2'>
                {checkoutItems}
                <h2 aria-label='Checkout Total' className='self-end mt-4'>
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

export default ShoppingBagSidebar;
