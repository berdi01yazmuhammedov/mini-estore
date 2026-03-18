import { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { useSearch } from '@/context/SearchContext';

const navigation = [
    { label: 'Каталог', href: '/#catalog' },
    { label: 'Коллекция', href: '/#featured' },
    { label: 'Доставка', href: '/#service' },
] as const;

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { items } = useAppSelector((state) => state.cart);
    const { search, setSearch } = useSearch();

    const cartLabel = useMemo(() => (items.length > 0 ? `${items.length}` : ''), [items.length]);

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
                <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center gap-3 px-4 sm:min-h-[72px] sm:px-6 lg:px-10">
                    <Link
                        to="/"
                        className="shrink-0 text-sm font-semibold tracking-[0.24em] text-[#111111] uppercase"
                    >
                        Vape Store
                    </Link>

                    <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
                        {navigation.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-[#86868b] transition-all duration-200 hover:text-[#111111]"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
                        <label className="relative hidden w-full max-w-[280px] lg:block">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Поиск вкусов"
                                className="h-11 w-full rounded-full border border-black/5 bg-[#f5f5f7] pl-11 pr-4 text-sm text-[#111111] outline-none transition-all duration-200 placeholder:text-[#86868b] focus:border-black/10 focus:bg-white"
                            />
                        </label>
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

                    <div className="ml-auto flex items-center gap-2 md:hidden">
                        <NavLink
                            to="/cart"
                            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#111111]"
                            aria-label="Корзина"
                        >
                            <ShoppingBag className="h-5 w-5" />
                            {cartLabel ? (
                                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#111111] px-1 text-[10px] font-semibold text-white">
                                    {cartLabel}
                                </span>
                            ) : null}
                        </NavLink>
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen(true)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#111111]"
                            aria-label="Открыть меню"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            <div
                className={`fixed inset-0 z-[60] bg-white/95 px-4 pb-8 pt-5 backdrop-blur-xl transition-all duration-300 md:hidden ${
                    isMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}
            >
                <div className="flex items-center justify-between">
                    <Link
                        to="/"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-sm font-semibold uppercase tracking-[0.24em] text-[#111111]"
                    >
                        Vape Store
                    </Link>
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen(false)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#111111]"
                        aria-label="Закрыть меню"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                    <label className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Поиск вкусов"
                            className="h-12 w-full rounded-[28px] border border-black/5 bg-[#f5f5f7] pl-11 pr-4 text-base text-[#111111] outline-none placeholder:text-[#86868b]"
                        />
                    </label>

                    <nav className="flex flex-col gap-2 pt-2">
                        {navigation.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex min-h-11 items-center rounded-[22px] px-4 text-lg font-medium text-[#111111] transition-all duration-200 active:scale-[0.99]"
                            >
                                {item.label}
                            </a>
                        ))}
                        <Link
                            to="/cart"
                            onClick={() => setIsMenuOpen(false)}
                            className="flex min-h-11 items-center rounded-[22px] px-4 text-lg font-medium text-[#111111]"
                        >
                            Корзина
                        </Link>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Header;
