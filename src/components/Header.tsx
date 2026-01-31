import { ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAppSelector } from '@/store/hooks';
import { Link } from 'react-router-dom';

const Header = () => {
    const { items } = useAppSelector((state) => state.cart);
   const isAdmin = localStorage.getItem('admin_key') === import.meta.env.VITE_ADMIN_KEY;


    return (
        <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 px-6 py-3 flex items-center justify-between gap-4 md:gap-8 shadow-sm">
            {/* Логотип */}
            <Link
                to="/"
                className="flex-1 text-xl font-bold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
                Mini-eStore
            </Link>

            {/* Навигация */}
            <nav className="flex items-center gap-4 md:gap-6">
                <Link
                    to="/cart"
                    className="relative w-10 h-10 flex items-center justify-center cursor-pointer"
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
                    <ShoppingCart className="w-8 h-8 text-gray-700 dark:text-gray-300" />
                </Link>

                {isAdmin && (
                    <Link
                        to="/admin"
                        className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
                    >
                        Админ
                    </Link>
                )}

                {/* Тема */}
                <ThemeToggle />
            </nav>
        </header>
    );
};

export default Header;
