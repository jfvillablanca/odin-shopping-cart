import { Link } from "react-router-dom";
import ShoppingBag from "../assets/ShoppingBag";

type Props = {
    handleClick: () => void;
    numOfItemsInBag: number;
};

function Nav({ handleClick, numOfItemsInBag }: Props) {
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
            <div
                role='button'
                onClick={handleClick}
                aria-label='Shopping Bag'
                className='relative'
            >
                <ShoppingBag className='text-amber-500' />
                {numOfItemsInBag > 0 && (
                    <h3 className='absolute -top-3 -right-3 w-6 h-6 bg-amber-500 rounded-full text-gray-600 text-center text-sm font-mono font-bold flex items-center justify-center'>
                        {numOfItemsInBag}
                    </h3>
                )}
            </div>
        </nav>
    );
}

export default Nav;
