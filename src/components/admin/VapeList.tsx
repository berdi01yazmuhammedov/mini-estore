import useVapes from '@/hooks/useVapes';

const VapeList = () => {
    const { vapes, isLoading, error } = useVapes();

    if (isLoading) return <h2 className="p-4">Loading...</h2>;
    if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900">
            <table className="w-full border-collapse text-sm">
                <thead className="bg-gray-100 dark:bg-zinc-800">
                    <tr>
                        <th className="p-3 text-left font-semibold text-gray-700 dark:text-gray-200 border-b border-gray-300 dark:border-zinc-700">
                            Название
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
                    {vapes.map((vape) => (
                        <tr
                            key={vape.id}
                            className="
                                hover:bg-gray-50 dark:hover:bg-zinc-800
                                transition-colors
                            "
                        >
                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {vape.name}
                            </td>

                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {vape.price} ₽
                            </td>

                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-100">
                                {vape.stock}
                            </td>

                            <td className="p-3 border-b border-gray-200 dark:border-zinc-700">
                                <div className="flex gap-2">
                                    <button
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
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default VapeList;
