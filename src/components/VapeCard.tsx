import { Button } from '@radix-ui/themes';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Vape as VapeType } from '../types/vape';

interface Props {
    vape: VapeType;
}

const VapeCard: React.FC<Props> = ({ vape }) => {
    return (
        <div
            key={vape.id}
            className="
        relative flex flex-col items-center rounded-xl overflow-hidden
        bg-white dark:bg-zinc-900
        shadow-md hover:shadow-xl transition-all duration-300
        w-[250px] sm:w-[200px] md:w-[240px] lg:w-[250px]
        border border-gray-300 dark:border-zinc-800
        hover:-translate-y-1
      "
        >
            <button className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-zinc-800/70 hover:scale-110 transition-transform duration-200">
                <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>

            <div className="w-full h-[180px] sm:h-[200px] flex items-center justify-center p-2">
                <img
                    src={vape.image}
                    alt={vape.name}
                    className="object-contain max-h-full transition-transform duration-300 hover:scale-105"
                />
            </div>

            <div className="flex flex-col items-start w-full px-3 pb-3 text-left">
                <h4 className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200 truncate">
                    {vape.name}
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                    {vape.flavor}
                </p>
                <h5 className="font-semibold text-red-600 dark:text-red-400 mt-1">
                    {vape.price} ₽
                </h5>
            </div>

            <div className="p-2 bg-gradient-to-t from-white via-white/90 dark:from-zinc-900 dark:via-zinc-900/80">
                <Button
                    size="2"
                    className="w-full  !cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-300"
                >
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    );
};

export default VapeCard;
