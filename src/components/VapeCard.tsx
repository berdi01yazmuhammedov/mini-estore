import type { Vape as VapeType } from '../types/vape';
import { useNavigate } from 'react-router-dom';
import VapeFooterActions from './VapeFooterActions';

interface Props {
    vape: VapeType;
}

const VapeCard: React.FC<Props> = ({ vape }) => {
    const navigate = useNavigate();
    return (
        <div
            
            className=" 
        relative w-full max-w-[260px] h-[420px]
        rounded-2xl
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        flex flex-col
      "
        >
            {/* IMAGE */}
            <div onClick={() => navigate(`/vape/${vape.id}`)}
                className="cursor-pointer h-[260px] w-full
    bg-zinc-50 dark:bg-zinc-800
    flex items-center justify-center
    overflow-hidden"
            >
                <img
                    src={vape.image}
                    alt={vape.name}
                    className="max-h-full max-w-full
    object-contain
    p-1
    rounded-sm
    transition-transform duration-300
    hover:scale-105"
                />
            </div>

            {/* CONTENT */}
            <div className="flex flex-col gap-1 px-3 pt-2">
                <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {vape.name}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{vape.flavor}</p>
                <span className="text-base font-semibold text-red-600 dark:text-red-400">
                    {vape.price} ₽
                </span>
            </div>

            {/* FOOTER */}
            <VapeFooterActions product={vape}/>
        </div>
    );
};

export default VapeCard;
