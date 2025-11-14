import CartItem from '@/components/CartItem';
import { useAppSelector } from '@/store/hooks';

const CartPage = () => {
    const cart = useAppSelector((state) => state.cart.items);
    console.log(cart);
    
    return (
        <div className="w-2/3 mx-auto">
            <h2>Корзина</h2>
            {cart.map((item) => (
                <CartItem key={item.id} item={item} />
            ))}
        </div>
    );
};

export default CartPage;
