import { Search, ShoppingCart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useAppSelector } from '@/store/hooks';
import { Link } from 'react-router-dom';
import { useSearch } from '@/context/SearchContext';
import { useEffect, useRef } from 'react';
const Header = () => {
    const { items } = useAppSelector((state) => state.cart);
    const isAdmin = localStorage.getItem('admin_key') === import.meta.env.VITE_ADMIN_KEY;
    const { search, setSearch } = useSearch();
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const handleUserInteraction = () => {
            if (videoRef.current) {
                videoRef.current.muted = false; // включаем звук
                videoRef.current.play().catch(() => {}); // запускаем видео
            }
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
        };

        // Слушаем клик или тап на любой части страницы
        window.addEventListener('click', handleUserInteraction, { once: true });
        window.addEventListener('touchstart', handleUserInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleUserInteraction);
            window.removeEventListener('touchstart', handleUserInteraction);
        };
    }, []);
    return (
        <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 px-6 py-3 flex items-center justify-between gap-1 lg:gap-4 md:gap-8 shadow-sm">
            <div className="relative w-[clamp(50px,10vw,100px)] h-[clamp(50px,10vw,100px)] rounded-full overflow-hidden flex-shrink-0 animate-breathe shadow-[0_0_0_5px_rgba(255,255,255,0.9),0_0_30px_rgba(255,255,255,0.2),0_0_60px_rgba(255,255,255,0.08)]">
                <video
                    ref={videoRef}
                    src="/head.mp4"
                    autoPlay
                    loop
                    muted // старт с мутом, чтобы разрешил autoplay
                    playsInline
                    className="w-full h-full object-cover block"
                    onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                    }}
                />
            </div>
            <form
                className="w-[200px] lg:w-[400px] flex items-center relative"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-2 py-2 rounded-md border-2 border-gray-300 dark:border-zinc-700"
                    type="text"
                    placeholder="Поиск вкусов..."
                />
                <Search className="cursor-pointer w-5 h-5 absolute right-1 lg:right-3 " />
            </form>
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
