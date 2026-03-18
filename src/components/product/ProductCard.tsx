import { Link } from 'react-router-dom';
import type { Vape } from '@/types/vape';

interface ProductCardProps {
    vape: Vape;
}

const ProductCard = ({ vape }: ProductCardProps) => {
    return (
        <Link
            to={`/vape/${vape.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-black/5 bg-white p-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_18px_50px_rgba(17,17,17,0.08)] sm:p-4"
        >
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[20px] bg-[#f5f5f7] p-4 sm:p-5">
                <img
                    src={vape.image}
                    alt={vape.name}
                    className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                />
            </div>

            <div className="flex flex-1 flex-col gap-2 px-1 pb-1 pt-4">
                <h3 className="text-base font-semibold text-[#111111] sm:text-lg">{vape.name}</h3>
                <p className="text-sm text-[#86868b]">{vape.flavor}</p>
                <p className="mt-auto pt-2 text-base font-semibold text-[#111111] sm:text-lg">
                    {vape.price} ₽
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
