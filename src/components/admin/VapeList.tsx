import useVapes from '@/hooks/useVapes';
import type { Vape } from '@/types/vape';
import { useMemo, useState } from 'react';
import { BRAND_ORDER, type Brand } from '../VapeRender';
import { useSearch } from '@/context/SearchContext';
const API_URL = import.meta.env.VITE_API_URL;
const VapeList = () => {
    const { vapes, isLoading, error, refetch } = useVapes();
    const [editId, setEditId] = useState<number | null>(null);
    const [editData, setEditData] = useState({
        name: '',
        price: '',
        stock: '',
        flavor: '',
        description: '',
    });
    const {search} = useSearch();

    const isBrand = (value: string): value is Brand => BRAND_ORDER.includes(value as Brand);
    const getBrandIndex = (brand: string) =>
        isBrand(brand) ? BRAND_ORDER.indexOf(brand) : Number.MAX_SAFE_INTEGER;

    const filteredVapes = useMemo(() => {
        let result = [...vapes];

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(
                (v) => v.flavor.toLowerCase().includes(q) || v.name.toLowerCase().includes(q)
            );
        }

        return result.sort((a, b) => {
            const brandDiff = getBrandIndex(a.brand) - getBrandIndex(b.brand);
            if (brandDiff !== 0) return brandDiff;
            return b.price - a.price;
        });
    }, [vapes, search]);
    if (isLoading) return <h2 className="p-4">Loading...</h2>;
    if (error) return <p className="p-4 text-red-500">Error: {error}</p>;
    const handleDelete = async (id: number) => {
        const ok = confirm('Удалить товар?');
        if (!ok) return;
        await fetch(`${API_URL}/api/vapes/${id}`, { method: 'DELETE' });

        refetch();
    };
    const handleEditClick = (vape: Vape) => {
        setEditId(vape.id);
        setEditData({
            name: vape.name,
            price: vape.price.toString(),
            stock: vape.stock.toString(),
            flavor: vape.flavor,
            description: vape.description || '',
        });
    };

    const handleCancel = () => {
        setEditId(null);
    };

    const handleSave = async (id: number) => {
        await fetch(`${API_URL}/api/vapes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData),
        });
        setEditId(null);
        refetch();
    };
    return (
        <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100 dark:bg-zinc-800">
                    <tr>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-zinc-700">
                            №
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-zinc-700">
                            Id
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-zinc-700">
                            Название
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-zinc-700">
                            Вкус
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-zinc-700">
                            Описание
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-zinc-700">
                            Цена
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-zinc-700">
                            Остаток
                        </th>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-zinc-700">
                            Действия
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {filteredVapes.map((vape, index) => (
                        <tr
                            key={vape.id}
                            className="
                                hover:bg-gray-50 dark:hover:bg-zinc-800
                                transition-colors
                            "
                        >
                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {index + 1}
                            </td>
                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {vape.id}
                            </td>
                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {editId === vape.id ? (
                                    <input
                                        className="w-full rounded-md border pl-2 py-1 text-sm"
                                        value={editData.name}
                                        onChange={(e) =>
                                            setEditData({ ...editData, name: e.target.value })
                                        }
                                    />
                                ) : (
                                    vape.name
                                )}
                            </td>
                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {editId === vape.id ? (
                                    <input
                                        className="w-full rounded-md border pl-2 py-1 text-sm"
                                        value={editData.flavor}
                                        onChange={(e) =>
                                            setEditData({ ...editData, flavor: e.target.value })
                                        }
                                    />
                                ) : (
                                    vape.flavor
                                )}
                            </td>
                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {editId === vape.id ? (
                                    <input
                                        className="w-full rounded-md border pl-2 py-1 text-sm"
                                        value={editData.description}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    vape.description
                                )}
                            </td>
                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {editId === vape.id ? (
                                    <input
                                        className="w-full rounded-md border pl-2 py-1 text-sm"
                                        value={editData.price}
                                        onChange={(e) =>
                                            setEditData({ ...editData, price: e.target.value })
                                        }
                                    />
                                ) : (
                                    vape.price + '₽'
                                )}
                            </td>

                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {editId === vape.id ? (
                                    <input
                                        className="w-full rounded-md border pl-2 py-1 text-sm"
                                        value={editData.stock}
                                        onChange={(e) =>
                                            setEditData({ ...editData, stock: e.target.value })
                                        }
                                    />
                                ) : (
                                    vape.stock
                                )}
                            </td>

                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700">
                                {editId === vape.id ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSave(vape.id)}
                                            className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="px-3 py-1.5 rounded-md bg-gray-300 dark:bg-zinc-700 text-gray-800 hover:bg-gray-400 dark:hover:bg-zinc-600 transition"
                                        >
                                            Отменить
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(vape)}
                                            className="
                                            px-3 py-1.5 rounded-md text-sm
                                            border border-blue-500 text-blue-600
                                            hover:bg-blue-500 hover:text-white
                                            dark:border-blue-400 dark:text-blue-400
                                            dark:hover:bg-blue-500 dark:hover:text-white
                                            transition
                                        "
                                        >
                                            Редактировать
                                        </button>

                                        <button
                                            onClick={() => handleDelete(vape.id)}
                                            className="
                                            px-3 py-1.5 rounded-md text-sm
                                            border border-red-500 text-red-600
                                            hover:bg-red-500 hover:text-white
                                            dark:border-red-400 dark:text-red-400
                                            dark:hover:bg-red-500 dark:hover:text-white
                                            transition
                                        "
                                        >
                                            Удалить
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VapeList;
