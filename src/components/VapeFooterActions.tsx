import { addToCart, removeOneFromCart } from '@/store/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Vape } from '@/types/vape';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';

interface VapeFooterActionsProps {
    product: Vape;
}

const VapeFooterActions: React.FC<VapeFooterActionsProps> = ({ product }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) => state.cart.items.find((i) => i.id === product.id));
    return cartItem ? (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-full bg-white p-1">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => dispatch(removeOneFromCart(product.id))}
                >
                    −
                </Button>
                <span className="min-w-8 text-center text-sm font-semibold text-[#111111]">
                    {cartItem.quantity}
                </span>
                <Button
                    variant="secondary"
                    size="icon"
                    disabled={cartItem.quantity >= product.stock}
                    onClick={() => dispatch(addToCart(product))}
                >
                    +
                </Button>
            </div>

            <Button variant="outline" className="w-full" onClick={() => navigate('/cart')}>
                В корзину
            </Button>
        </div>
    ) : (
        <Button className="w-full gap-2" onClick={() => dispatch(addToCart(product))}>
            <ShoppingCart className="h-4 w-4" />
            Добавить
        </Button>
    );
};

export default VapeFooterActions;
