import { useMemo, useState } from 'react';
import type { Vape } from '@/types/vape';
import { useSearch } from '@/context/SearchContext';
import ProductGrid from './ProductGrid';
import SectionHeading from '@/components/ui/SectionHeading';

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
        <div className="px-4 py-6 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-[1440px] rounded-[28px] bg-white">
                <div className="flex flex-col gap-6 rounded-[28px] border border-black/5 bg-white px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
                    <SectionHeading
                        eyebrow="Filter"
                        title="Тонкая навигация по брендам"
                        description="Фильтрация остаётся лёгкой и тактильно удобной: крупные зоны касания, минимум шума и быстрый выбор на мобильных устройствах."
                    />

                    <div className="flex flex-wrap gap-3">
                        {BRANDS.map((brand) => {
                            const isActive = activeBrand === brand;

                            return (
                                <button
                                    key={brand}
                                    type="button"
                                    onClick={() => setActiveBrand(brand)}
                                    className={`min-h-11 rounded-full px-4 text-sm font-medium transition-all duration-200 ${
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
            </div>

            <ProductGrid products={filteredProducts} />
        </div>
    );
};

export default ProductShowcase;
