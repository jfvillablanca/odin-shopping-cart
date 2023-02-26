import { Link } from "react-router-dom";
import ShoppingBag from "../assets/ShoppingBag";

type Props = {
    isBagOpen: boolean;
    handleClick: () => void;
};

function Nav({ isBagOpen, handleClick }: Props) {
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
            <div role='button' onClick={handleClick} aria-label='Shopping Bag'>
                <ShoppingBag className='text-amber-500' />
            </div>
        </nav>
    );
}

export default Nav;
