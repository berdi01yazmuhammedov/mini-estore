import { useMemo, useState } from 'react';
import type { Vape } from '@/types/vape';
import { useSearch } from '@/context/SearchContext';
import ProductGrid from './ProductGrid';

const BRANDS = ['ВСЕ', 'WAKA', 'ELFBAR', 'LOST MARY', 'PUFFMI', 'HQD', 'PLONQ'] as const;
type Brand = (typeof BRANDS)[number];

interface ProductShowcaseProps {
    products: Vape[];
}

const ProductShowcase = ({ products }: ProductShowcaseProps) => {
    const { search } = useSearch();
    const [activeBrand, setActiveBrand] = useState<Brand>('ВСЕ');

    const filteredProducts = useMemo(() => {
        return [...products]
            .filter((product) => (activeBrand === 'ВСЕ' ? true : product.brand === activeBrand))
            .filter((product) => {
                if (!search.trim()) return true;
                const query = search.toLowerCase();
                return (
                    product.name.toLowerCase().includes(query) ||
                    product.flavor.toLowerCase().includes(query) ||
                    product.brand.toLowerCase().includes(query)
                );
            })
            .sort((a, b) => b.price - a.price);
    }, [activeBrand, products, search]);

    return (
        <section className="px-4 py-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
            <div className="mx-auto max-w-[1440px]">
                <div className="flex flex-col gap-4 sm:gap-5">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className="text-2xl font-semibold tracking-tight text-[#111111] sm:text-3xl">
                            Каталог
                        </h1>
                        <span className="text-sm text-[#86868b]">{filteredProducts.length}</span>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {BRANDS.map((brand) => {
                            const isActive = activeBrand === brand;

                            return (
                                <button
                                    key={brand}
                                    type="button"
                                    onClick={() => setActiveBrand(brand)}
                                    className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-[#111111] text-white'
                                            : 'bg-[#f5f5f7] text-[#111111] hover:scale-[1.02] hover:bg-[#ededf0]'
                                    }`}
                                >
                                    {brand}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <ProductGrid products={filteredProducts} />
            </div>
        </section>
    );
};

export default ProductShowcase;
