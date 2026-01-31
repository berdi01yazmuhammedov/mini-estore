import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || 'feardota15';
const AdminLogin = () => {
    const [key, setKey] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (key === ADMIN_KEY) {
            localStorage.setItem('admin_key', key);
            navigate('/admin');
        } else {
            alert('Неверная пара логин/пароль');
        }
    };
    return (
        <div className="max-w-sm mx-auto mt-20 p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Вход в админку</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="password"
                    placeholder="Введите ключ"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Войти
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
