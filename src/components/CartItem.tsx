import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import type { Vape } from '@/types/vape';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, removeItem, removeOneFromCart } from '@/store/cartSlice';

interface Props {
    item: Vape;
}

const CartItem = ({ item }: Props) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) => state.cart.items.find((i) => i.id === item.id));

    if (!cartItem) return null;

    return (
        <div className="flex flex-col gap-4 rounded-[28px] bg-[#f5f5f7] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[24px] bg-white p-3">
                    <img
                        src={cartItem.image}
                        className="h-full w-full object-contain"
                        alt={item.name}
                    />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-[#111111]">{item.name}</h3>
                    <p className="text-sm text-[#86868b]">{item.flavor}</p>
                    <p className="text-base font-semibold text-[#111111]">{item.price} ₽</p>
                </div>
            </div>
            <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center gap-2 rounded-full bg-white p-1">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => dispatch(removeOneFromCart(item.id))}
                    >
                        −
                    </Button>
                    <span className="min-w-8 text-center text-sm font-semibold text-[#111111]">
                        {cartItem.quantity}
                    </span>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10"
                        disabled={cartItem.quantity >= item.stock}
                        onClick={() => dispatch(addToCart(item))}
                    >
                        +
                    </Button>
                </div>

                <Button variant="ghost" size="icon" onClick={() => dispatch(removeItem(item.id))}>
                    <Trash2 className="h-5 w-5 text-[#86868b]" />
                </Button>
            </div>
        </div>
    );
};

export default CartItem;
