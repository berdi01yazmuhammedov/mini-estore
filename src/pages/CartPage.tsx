import CartItem from '@/components/CartItem';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { clearCart } from '@/store/cartSlice';
import { Link } from 'react-router-dom';
import Order from '@/components/Order';
import { useCartTotals } from '@/hooks/useCartTotals';

const CartPage = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.items);

    const { totalPrice } = useCartTotals(cart);

    return (
        <div className="w-full mx-auto px-4">
            {!cart.length ? (
                <div className="flex flex-col gap-5">
                    <p className="text-center">Корзина пуста</p>
                    <Link
                        to="/"
                        className="w-[150px] py-2 px-2 border-2 border-dashed rounded-md text-center mx-auto hover:bg-gray-200 hover:text-black"
                    >
                        Перейти к покупкам
                    </Link>
                </div>
            ) : (
                <div className="flex lg:flex-row flex-col justify-center gap-10 px-4">
                    <div>
                        <div className="w-full mx-auto">
                            {cart.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                        <div className="flex justify-between py-5 px-4">
                            <h3>Всего</h3>
                            <p>{totalPrice} ₽</p>
                            <Button
                                size={'sm'}
                                onClick={() => dispatch(clearCart())}
                                variant="destructive"
                            >
                                Очистить корзину
                            </Button>
                        </div>
                    </div>
                    <Order cart={cart}/>
                </div>
            )}
        </div>
    );
};

export default CartPage;
