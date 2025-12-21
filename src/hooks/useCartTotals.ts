import type { Vape } from '@/types/vape';
import { useMemo } from 'react';

export const useCartTotals = (cart: Vape[]) => {
    return useMemo(() => {
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
        const items = cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        }));

        return { totalPrice, totalQuantity, items };
    }, [cart]);
};
