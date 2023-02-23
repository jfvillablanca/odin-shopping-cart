function Nav() {
    return (
        <nav className='flex items-center justify-between bg-gray-600 w-screen px-9 h-14'>
            <h1 className='flex-1 text-lg'>Logo here</h1>
            <ul className='flex flex-1 items-center justify-around list-none'>
                <li>Home</li>
                <li>Shop</li>
            </ul>
            <button>Add to Cart</button>
        </nav>
    );
}

export default Nav;
