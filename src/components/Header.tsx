import { ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAppSelector } from '@/store/hooks';
import { Link } from 'react-router-dom';

const Header = () => {
    const { items } = useAppSelector((state) => state.cart);
    return (
        <header className="flex items-center justify-between p-1 gap-10">
            <Link className="flex-1" to="/">
                <h1>Mini-estore</h1>
            </Link>
             <Link  to="/admin/list">
                <h2>Admin</h2>
            </Link>
            {/* <nav >
                <ul className="flex gap-10">
                    <li>Contact</li>
                    <li>link</li>
                    <li>link</li>
                </ul>
            </nav> */}

            <Link
                to="/cart"
                className="relative w-14 h-14 p-0 flex items-center justify-center cursor-pointer"
            >
                {items.length > 0 && (
                    <span
                        className="
        absolute -top-1 -right-1
        w-5 h-5
        text-[10px] font-bold
        bg-red-600 dark:bg-red-400
        text-white dark:text-zinc-900
        rounded-full
        flex items-center justify-center
      "
                    >
                        {items.length}
                    </span>
                )}

                <ShoppingCart className="w-10 h-10" />
            </Link>

            <ThemeToggle />
        </header>
    );
};

export default Header;
