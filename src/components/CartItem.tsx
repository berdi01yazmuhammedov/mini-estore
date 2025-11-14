import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import type { Vape } from '@/types/vape';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, removeItem, removeOneFromCart } from '@/store/cartSlice';

interface Props {
    item: Vape;
}

const CartItem = ({ item}: Props) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) => state.cart.items.find((i) => i.id === item.id));

    if (!cartItem) return null;

    return (
        <div className="w-2/3 mx-auto flex items-center gap-4 p-4 border-b dark:border-zinc-700">
            <img src={item.image} className="w-20 h-20 object-contain" alt={item.name} />

            <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.flavor}</p>
                <p className="font-semibold mt-1">{item.price} ₽</p>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => dispatch(removeOneFromCart(item.id))}
                >
                    −
                </Button>

                <span className="min-w-[20px] text-center">{cartItem.quantity}</span>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={cartItem.quantity >= item.stock}
                    onClick={() => dispatch(addToCart(item))}
                >
                    +
                </Button>
            </div>

            <Button variant="ghost" size="icon" onClick={() => dispatch(removeItem(item.id))}>
                <Trash2 className="w-5 h-5 text-red-500" />
            </Button>
        </div>
    );
};

export default CartItem;
