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

    if (!cart.length) {
        return (
            <section className="px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
                <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[32px] bg-[#f5f5f7] px-6 py-12 text-center sm:px-10">
                    <h1 className="text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl">
                        Корзина пуста
                    </h1>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-[#86868b] sm:text-base">
                        Добавьте несколько позиций в каталог и вернитесь сюда, чтобы быстро оформить
                        заказ.
                    </p>
                    <Link
                        to="/"
                        className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#111111] px-6 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:opacity-90"
                    >
                        Перейти к покупкам
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
            <div className="mx-auto max-w-[1440px]">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl">
                            Корзина
                        </h1>
                        <p className="mt-2 text-sm text-[#86868b] sm:text-base">
                            Проверьте состав заказа и подтвердите удобный способ связи.
                        </p>
                    </div>
                    <Button variant="outline" onClick={() => dispatch(clearCart())}>
                        Очистить корзину
                    </Button>
                </div>

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,420px)] lg:items-start">
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}

                        <div className="flex items-center justify-between rounded-[28px] bg-[#111111] px-5 py-5 text-white sm:px-6">
                            <span className="text-sm uppercase tracking-[0.18em] text-white/70">
                                Итого
                            </span>
                            <span className="text-2xl font-semibold">{totalPrice} ₽</span>
                        </div>
                    </div>

                    <Order cart={cart} />
                </div>
            </div>
        </section>
    );
};

export default CartPage;
