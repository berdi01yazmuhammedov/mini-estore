import type { Vape } from '@/types/vape';
import React from 'react';
import VapeCard from './VapeCard';
interface VapeRenderProps {
    vapes: Vape[];
}
const VapeRender: React.FC<VapeRenderProps> = ({ vapes }) => {
    return (
        <div
            className="
    mx-auto
    grid
    gap-2 lg:gap-6 
    p-4
    grid-cols-[repeat(auto-fill,minmax(160px,1fr))]
  "
        >
            {vapes.map((vape) => (
                <VapeCard key={vape.id} vape={vape} />
            ))}
        </div>
    );
};

export default VapeRender;
