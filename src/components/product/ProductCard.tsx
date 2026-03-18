import { Link } from 'react-router-dom';
import type { Vape } from '@/types/vape';

interface ProductCardProps {
    vape: Vape;
}

const ProductCard = ({ vape }: ProductCardProps) => {
    return (
        <Link
            to={`/vape/${vape.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-[#f5f5f7] p-4 transition-all duration-200 hover:scale-[1.02] hover:bg-white hover:shadow-[0_18px_50px_rgba(17,17,17,0.08)] sm:p-5"
        >
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[20px] bg-white p-4 sm:p-6">
                <img
                    src={vape.image}
                    alt={vape.name}
                    className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
            </div>

            <div className="flex flex-1 flex-col gap-2 px-1 pb-1 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#86868b]">
                    {vape.brand}
                </p>
                <h3 className="text-lg font-semibold tracking-tight text-[#111111] sm:text-xl">
                    {vape.name}
                </h3>
                <p className="text-sm text-[#86868b]">{vape.flavor}</p>
                <div className="mt-auto pt-3">
                    <p className="text-lg font-semibold text-[#111111] sm:text-xl">{vape.price} ₽</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
