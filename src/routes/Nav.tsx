import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className='flex items-center justify-between bg-gray-600 w-screen px-9 h-14'>
            <h1 className='flex-1 text-lg'>Logo here</h1>
            <ul className='flex flex-1 items-center justify-around list-none'>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/shop'>Shop</Link>
                </li>
            </ul>
            <button>Add to Cart</button>
        </nav>
    );
}

export default Nav;
