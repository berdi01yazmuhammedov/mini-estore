import type { Vape } from '@/types/vape';
import React, { useMemo, useState } from 'react';
import VapeCard from './VapeCard';
import VapeFilter from './VapeFilter';
interface VapeRenderProps {
    vapes: Vape[];
}
type Brand = 'ВСЕ' | 'WAKA' | 'ELFBAR' | 'LOST MARY' | 'PUFFMI' | 'HQD' | 'PLONQ';
const BRAND_ORDER: Brand[] = [
    'WAKA',
    'ELFBAR',
    'LOST MARY',
    'PUFFMI',
    'HQD',
    'PLONQ',
];

const DEFAULT_BRAND: Brand = 'ВСЕ';
const VapeRender: React.FC<VapeRenderProps> = ({ vapes }) => {
    const [activeBrand, setActiveBrand] = useState<Brand>(DEFAULT_BRAND);
    const sortByBrandAndPrice = (a: Vape, b: Vape) => {
        const brandDiff = 
        BRAND_ORDER.indexOf(a.brand as Brand) - BRAND_ORDER.indexOf(b.brand as Brand);
        if(brandDiff !== 0) return brandDiff;

        return b.price - a.price;
    }
    const filteredVapes = useMemo(() => {
        if (activeBrand === 'ВСЕ'){
            return [...vapes].sort(sortByBrandAndPrice)
        }
        return vapes
            .filter((vape) => vape.brand === activeBrand)
            .sort((a, b) => b.price - a.price);
    }, [vapes, activeBrand]);
    return (
        <div>
            <VapeFilter activeBrand={activeBrand} onChange={setActiveBrand}/>
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
