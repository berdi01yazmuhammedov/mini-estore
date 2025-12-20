import { useState } from 'react';

const Order = () => {
    const [isPickup, setIsPickup] = useState(true);
    const [contactType, setContactType] = useState<'telegram' | 'email'>('telegram');
    const [contact, setContact] = useState('');
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
                <h2 className="mt-4">Способ получения</h2>
                <div className="mt-2 flex gap-4">
                    <button
                        onClick={() => setIsPickup(true)}
                        className={`py-2 px-2 border-2 rounded-md cursor-pointer hover:bg-secondary/80 ${isPickup ? 'isPickup' : ''}`}
                    >
                        Самовывоз
                    </button>
                    <button
                        onClick={() => setIsPickup(false)}
                        className={`py-2 px-2 border-2 rounded-md cursor-pointer hover:bg-secondary/80 ${!isPickup ? 'isPickup' : ''}`}
                    >
                        Доставка
                    </button>
                </div>
                {isPickup ? (
                    <div className="mt-2">
                        <h2>
                            Можно получить в день заказа или, в удобный Вам день также на Площади
                            Мужества.
                        </h2>
                        <label htmlFor=""></label>
                    </div>
                ) : (
                    <h2>Адрес доставки</h2>
                )}
                <form
                    className="flex flex-col items-center gap-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <label>Данные о заказе отправить на:</label>
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
