import type { Vape } from '@/types/vape';
import React, { useMemo, useState } from 'react';
import VapeCard from './VapeCard';
import VapeFilter from './VapeFilter';
import { useSearch } from '@/context/SearchContext';
interface VapeRenderProps {
    vapes: Vape[];
}
export type Brand = 'ВСЕ' | 'WAKA' | 'ELFBAR' | 'LOST MARY' | 'PUFFMI' | 'HQD' | 'PLONQ';
export const BRAND_ORDER: Brand[] = ['WAKA', 'ELFBAR', 'LOST MARY', 'PUFFMI', 'HQD', 'PLONQ'];

export const DEFAULT_BRAND: Brand = 'ВСЕ';

const VapeRender: React.FC<VapeRenderProps> = ({ vapes }) => {
    const { search } = useSearch();
    const isBrand = (value: string): value is Brand => BRAND_ORDER.includes(value as Brand);
    const getBrandIndex = (brand: string) =>
        isBrand(brand) ? BRAND_ORDER.indexOf(brand) : Number.MAX_SAFE_INTEGER;
    const [activeBrand, setActiveBrand] = useState<Brand>(DEFAULT_BRAND);

    const sortByBrandAndPrice = (a: Vape, b: Vape) => {
        const brandDiff = getBrandIndex(a.brand) - getBrandIndex(b.brand);

        if (brandDiff !== 0) return brandDiff;

        return b.price - a.price;
    };
    const filteredVapes = useMemo(() => {
        let result = [...vapes];

        if (activeBrand !== 'ВСЕ') {
            result = result.filter((v) => v.brand === activeBrand);
        }

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (v) => v.flavor.toLowerCase().includes(q) || v.name.toLowerCase().includes(q)
            );
        }

        return result.sort(sortByBrandAndPrice);
    }, [vapes, activeBrand, search]);
    return (
        <div>
            <VapeFilter activeBrand={activeBrand} onChange={setActiveBrand} />
            <div
                className="
    mx-auto
    grid
    gap-2 lg:gap-6 
    p-4
    grid-cols-[repeat(auto-fill,minmax(160px,1fr))]
  "
            >
                {filteredVapes.map((vape) => (
                    <VapeCard key={vape.id} vape={vape} />
                ))}
            </div>
        </div>
    );
};

export default VapeRender;
