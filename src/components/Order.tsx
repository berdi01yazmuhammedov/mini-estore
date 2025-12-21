import { useCartTotals } from '@/hooks/useCartTotals';
import type { Vape } from '@/types/vape';
import { useState } from 'react';
interface OrderProps {
    cart: Vape[];
}
const Order: React.FC<OrderProps> = ({ cart }) => {
    const {totalPrice} = useCartTotals(cart);
    const orderItems = cart.map((vape: Vape) => {
        return {
            id: vape.id,
            name: vape.name,
            price: vape.price,
            quantity: vape.quantity,
        };
    });

    const [isPickup, setIsPickup] = useState('Самовывоз');
    const [contactType, setContactType] = useState<'telegram' | 'email'>('telegram');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const orderData = {
            orderItems,
            totalPrice,
            isPickup,
            contactType,
            contact,
            address,
            createdAt: new Date().toISOString(),
        };
        console.log('ORDER:', orderData);
    };
    return (
        <div className="mx-auto">
            <h1>Оформление заказа</h1>
            <p>
                При нажатии на кнопку "Заказать" на Ваш телеграм будет отправлено сообщение с
                уточнением заказа.
            </p>
            <p>
                Подтверждение не должно занимать больше 2-3 минут. Но если больше, прошу подождать.
            </p>
            <div>
                <h2 className="mt-4">Выберите способ получения</h2>
                <div className="mt-2 flex gap-4">
                    <button
                        onClick={() => setIsPickup('Самовывоз')}
                        className={`py-2 px-2 border-2 rounded-md cursor-pointer hover:bg-secondary/80 ${isPickup === 'Самовывоз' ? 'isPickup' : ''}`}
                    >
                        Самовывоз
                    </button>
                    <button
                        onClick={() => setIsPickup('Доставка')}
                        className={`py-2 px-2 border-2 rounded-md cursor-pointer hover:bg-secondary/80 ${isPickup === 'Доставка' ? 'isPickup' : ''}`}
                    >
                        Доставка
                    </button>
                </div>
                <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
                    {isPickup === 'Самовывоз' ? (
                        <div className="mt-2">
                            <h2>
                                Можно получить в день заказа или, в удобный Вам день также на{' '}
                                <span className="text-red-400">Площади Мужества.</span>
                            </h2>
                            <label htmlFor=""></label>
                        </div>
                    ) : (
                        <div>
                            <input
                                required
                                className="w-full mt-4 py-2 px-4 border rounded-sm"
                                type="text"
                                placeholder="Введите адрес доставки"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                        </div>
                    )}

                    <label>Данные о статусе заказе отправить на:</label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setContactType('email')}
                            className={`cursor-pointer px-2 py-1 border rounded ${contactType === 'email' ? 'bg-blue-500 text-white' : ''}`}
                        >
                            Почта
                        </button>
                        <button
                            type="button"
                            onClick={() => setContactType('telegram')}
                            className={`cursor-pointer px-2 py-1 border rounded ${contactType === 'telegram' ? 'bg-blue-500 text-white' : ''}`}
                        >
                            Телеграм
                        </button>
                    </div>
                    <input
                        required
                        className="w-1/3"
                        type={contactType === 'email' ? 'email' : 'text'}
                        placeholder={contactType === 'email' ? 'Ваша почта' : 'Ваш телеграм'}
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                    <button
                        type="submit"
                        className='cursor-pointer w-[150px] px-4 py-2 font-bold text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white text-center rounded-md"'
                    >
                        Заказать
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Order;
