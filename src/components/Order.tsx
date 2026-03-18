import { clearCart } from '@/store/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import type { Vape } from '@/types/vape';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
const API_URL = import.meta.env.VITE_API_URL;
interface OrderProps {
    cart: Vape[];
}
type PickupType = 'Самовывоз' | 'Доставка';
const Order: React.FC<OrderProps> = ({ cart }) => {
    const orderItems = cart.map((vape: Vape) => {
        return {
            id: vape.id,
            flavor: vape.flavor,
            name: vape.name,
            price: vape.price,
            quantity: vape.quantity,
        };
    });
    const dispatch = useAppDispatch();
    const [isPickup, setIsPickup] = useState<PickupType>('Самовывоз');
    const [contactType, setContactType] = useState<'telegram' | 'email'>('telegram');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePickupChange = (type: PickupType) => {
        setIsPickup(type);
        if (type === 'Самовывоз') {
            setAddress('');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        try {
            setLoading(true);
            const orderData = {
                items: orderItems,
                contact,
                contactType,
                isPickup,
                address: isPickup === 'Доставка' ? address : null,
            };
            const res = await fetch(`${API_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            if (!res.ok) {
                alert('Произошла ошибка при обработке заказа');
            }

            dispatch(clearCart());
            navigate('/order-success');
        } catch {
            alert('Произошла ошибка при обработке заказа');
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="rounded-[32px] bg-[#f5f5f7] p-4 sm:p-6 lg:p-8">
            <div className="space-y-3">
                <h2 className="text-2xl font-semibold tracking-tight text-[#111111] sm:text-3xl">
                    Оформление заказа
                </h2>
                <p className="text-sm leading-6 text-[#86868b] sm:text-base">
                    После подтверждения мы свяжемся с вами в Telegram или по email, чтобы быстро
                    уточнить детали заказа.
                </p>
            </div>

            <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="space-y-3">
                    <label className="text-sm font-medium text-[#111111]">Способ получения</label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {(['Самовывоз', 'Доставка'] as PickupType[]).map((type) => {
                            const active = isPickup === type;
                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => handlePickupChange(type)}
                                    className={`min-h-11 rounded-[22px] px-4 text-sm font-medium transition-all duration-200 ${
                                        active
                                            ? 'bg-[#111111] text-white'
                                            : 'bg-white text-[#111111] hover:scale-[1.02]'
                                    }`}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>
                    {isPickup === 'Самовывоз' ? (
                        <p className="rounded-[24px] bg-white px-4 py-4 text-sm leading-6 text-[#86868b]">
                            Самовывоз доступен в удобный для вас день на Площади Мужества.
                            Подтверждение обычно занимает 2–3 минуты.
                        </p>
                    ) : (
                        <div className="space-y-3">
                            <p className="rounded-[24px] bg-white px-4 py-4 text-sm leading-6 text-[#86868b]">
                                Доставка сейчас ограничена. Оставьте адрес, и мы подтвердим
                                возможность вручную.
                            </p>
                            <input
                                className="min-h-12 w-full rounded-[22px] border border-black/5 bg-white px-4 text-base text-[#111111] outline-none placeholder:text-[#86868b]"
                                type="text"
                                placeholder="Адрес доставки"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    )}
                </div>
                <div className="space-y-3">
                    <label className="text-sm font-medium text-[#111111]">
                        Куда отправить статус заказа
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                            type="button"
                            onClick={() => setContactType('telegram')}
                            className={`min-h-11 rounded-[22px] px-4 text-sm font-medium transition-all duration-200 ${
                                contactType === 'telegram'
                                    ? 'bg-[#111111] text-white'
                                    : 'bg-white text-[#111111] hover:scale-[1.02]'
                            }`}
                        >
                            Telegram
                        </button>
                        <button
                            type="button"
                            onClick={() => setContactType('email')}
                            className={`min-h-11 rounded-[22px] px-4 text-sm font-medium transition-all duration-200 ${
                                contactType === 'email'
                                    ? 'bg-[#111111] text-white'
                                    : 'bg-white text-[#111111] hover:scale-[1.02]'
                            }`}
                        >
                            Email
                        </button>
                    </div>
                    <input
                        required
                        className="min-h-12 w-full rounded-[22px] border border-black/5 bg-white px-4 text-base text-[#111111] outline-none placeholder:text-[#86868b]"
                        type={contactType === 'email' ? 'email' : 'text'}
                        placeholder={contactType === 'email' ? 'Ваша почта' : 'Ваш Telegram без @'}
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Оформляем…' : 'Заказать'}
                </Button>
            </form>
        </section>
    );
};

export default Order;
