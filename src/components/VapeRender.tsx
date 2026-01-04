import type { Vape } from '@/types/vape'
import React from 'react'
import VapeCard from './VapeCard';
interface VapeRenderProps {
    vapes: Vape[];
}
const VapeRender:React.FC<VapeRenderProps> = ({vapes}) => {
    
  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 p-4 bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
            {vapes.map((vape) => (
                <VapeCard key={vape.id} vape={vape} />
            ))}
        </div>
  )
}

export default VapeRender