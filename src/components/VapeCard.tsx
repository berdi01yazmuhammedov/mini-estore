import { ShoppingCart } from 'lucide-react';
import type { Vape as VapeType } from '../types/vape';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, removeOneFromCart } from '@/store/cartSlice';
import { Link } from 'react-router-dom';

interface Props {
    vape: VapeType;
}

const VapeCard: React.FC<Props> = ({ vape }) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) => state.cart.items.find((i) => i.id === vape.id));

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
            <div
                className="h-[260px] w-full
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
            <div className="mt-auto px-3 pb-3 pt-2">
                {cartItem ? (
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <Button size="sm" onClick={() => dispatch(removeOneFromCart(vape.id))}>
                                −
                            </Button>

                            <span className="font-semibold">{cartItem.quantity}</span>

                            <Button
                                size="sm"
                                disabled={cartItem.quantity >= vape.stock}
                                onClick={() => dispatch(addToCart(vape))}
                            >
                                +
                            </Button>
                        </div>

                        <Link
                            to="/cart"
                            className="
                text-center text-sm
                rounded-md py-2
                bg-secondary hover:bg-secondary/80
                transition
              "
                        >
                            В корзину
                        </Link>
                    </div>
                ) : (
                    <Button className="w-full gap-2" onClick={() => dispatch(addToCart(vape))}>
                        <ShoppingCart className="w-4 h-4" />
                        Добавить
                    </Button>
                )}
            </div>
        </div>
    );
};

export default VapeCard;
