import { useEffect, useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingBag, X } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { useSearch } from '@/context/SearchContext';

const Header = () => {
    const { items } = useAppSelector((state) => state.cart);
    const { search, setSearch } = useSearch();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        setIsAdmin(!!localStorage.getItem('admin_key'));
    }, []);
    const cartLabel = useMemo(() => (items.length > 0 ? `${items.length}` : ''), [items.length]);

    return (
        <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center gap-3 px-4 sm:min-h-[72px] sm:px-6 lg:px-10">
            <Link
                to="/"
                className="shrink-0 text-sm font-semibold tracking-[0.2em] text-[#111111] uppercase"
            >
                Berdi
            </Link>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
                <label className="relative w-[min(52vw,240px)] sm:w-[240px] lg:w-[280px]">
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Поиск..."
                        className="h-11 w-full rounded-full border border-black/5 bg-[#f5f5f7] pl-10 pr-4 text-sm text-[#111111] outline-none transition-all duration-200 placeholder:text-[#86868b] focus:border-black/10 focus:bg-white"
                    />
                    {search ? (
                        <X
                            className="cursor-pointer absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]"
                            onClick={() => setSearch('')}
                        />
                    ) : (
                        <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
                    )}
                </label>
                {isAdmin && (
                    <Link to="/admin" className="border py-1 px-3 rounded-md text-red-500">
                        бэр
                    </Link>
                )}
                <NavLink
                    to="/cart"
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#111111] transition-all duration-200 hover:scale-[1.02] hover:bg-[#ededf0]"
                    aria-label="Корзина"
                >
                    <ShoppingBag className="h-5 w-5" />
                    {cartLabel ? (
                        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#111111] px-1 text-[10px] font-semibold text-white">
                            {cartLabel}
                        </span>
                    ) : null}
                </NavLink>
            </div>
        </div>
    );
};

export default Header;
