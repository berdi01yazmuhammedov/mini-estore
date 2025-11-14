import { useMemo } from 'react';
import CartItem from '@/components/CartItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { clearCart } from '@/store/cartSlice';

const CartPage = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.items);

    const total = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cart]);

    return (
        <div className="w-2/3 mx-auto flex flex-col gap-10">
            {cart.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
            {!cart.length ? (
                <p className='text-center'>Корзина пуста</p>
            ) : (
                <>
                    <div className="flex justify-center gap-30">
                        <h3>Всего</h3>
                        <p>{total} ₽</p>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            className="w-[150px]"
                            onClick={() => dispatch(clearCart())}
                            variant="destructive"
                        >
                            Очистить корзину
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
