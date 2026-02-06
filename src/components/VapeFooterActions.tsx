import { addToCart, removeOneFromCart } from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Vape } from '@/types/vape';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';

interface VapeFooterActionsProps {
    product: Vape
}
const VapeFooterActions: React.FC<VapeFooterActionsProps> = ({product}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) => state.cart.items.find((i) => i.id === product.id));
    return (
        <div className="mt-auto px-3 pb-3 pt-2">
            {cartItem ? (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-4">
                        <Button size="sm" onClick={() => dispatch(removeOneFromCart(product.id))}>
                            −
                        </Button>

                        <span className="font-semibold">{cartItem.quantity}</span>

                        <Button
                            size="sm"
                            disabled={cartItem.quantity >= product.stock}
                            onClick={() => dispatch(addToCart(product))}
                        >
                            +
                        </Button>
                    </div>

                    <button
                        onClick={() => navigate('/cart')}
                        className="cursor-pointer
                                            text-center text-sm
                                            rounded-md py-2
                                            bg-secondary hover:bg-secondary/80
                                            transition
                                          "
                    >
                        В корзину
                    </button>
                </div>
            ) : (
                <Button className="z-50 w-full gap-2" onClick={() => dispatch(addToCart(product))}>
                    <ShoppingCart className="w-4 h-4" />
                    Добавить
                </Button>
            )}
        </div>
    );
};

export default VapeFooterActions;
