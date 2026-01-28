import type { Order } from '@/types/order';
import { useEffect, useState } from 'react';
const API_URL = import.meta.env.VITE_API_URL;
const statusColors: Record<string, string> = {
    Новый: 'bg-blue-100 text-blue-800',
    'В обработке': 'bg-yellow-100 text-yellow-800',
    Завершён: 'bg-green-100 text-green-800',
};
const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/orders`);
            const data = await res.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (id: string) => {
        if (!confirm('Удалить заказ?')) return;
        try {
            await fetch(`${API_URL}/api/orders/${id}`, { method: 'DELETE' });
            setOrders((prev) => prev.filter((order) => order.id !== id));
        } catch (error) {
            console.error(error);
            alert('Произошла ошибка при удалении заказа');
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    if (loading) return <h2 className="p-4">Загрузка заказов...</h2>;
    return (
        <div className="space-y-4">
            {orders.length === 0 && <p>Заказы отсутствуют</p>}

            {orders.map((order) => (
                <div
                    key={order.id}
                    className="border rounded-md p-4 shadow-sm hover:shadow-md transition"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-mono text-sm text-gray-500">
                            ID: {order.id.slice(0, 8)}
                        </span>
                        <span
                            className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                statusColors[order.status] || 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            {order.status}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
                        <div>
                            <p>
                                <span className="font-semibold">Контакт:</span> {order.contact} (
                                {order.contact_type})
                            </p>
                            <p>
                                <span className="font-semibold">Получение:</span> {order.is_pickup}
                            </p>
                            {order.address && (
                                <p>
                                    <span className="font-semibold">Адрес:</span> {order.address}
                                </p>
                            )}
                        </div>
                        <div className="text-right">
                            <p>
                                <span className="font-semibold">Создан:</span>{' '}
                                {new Date(order.created_at).toLocaleString()}
                            </p>
                            <p className="font-bold">Итого: {order.total_price}₽</p>
                        </div>
                    </div>

                    <ul className="mt-2 border-t pt-2 space-y-1">
                        {order.items.map((item) => (
                            <li key={item.id} className="flex justify-between text-sm">
                                <span>
                                    {item.name} × {item.quantity}
                                </span>
                                <span>{item.price * item.quantity}₽</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-2 flex justify-end">
                        <button
                            onClick={() => deleteOrder(order.id)}
                            className="cursor-pointer text-red-500 hover:text-red-700 text-sm"
                        >
                            Удалить
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Orders;
