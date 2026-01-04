import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

export type StrengthType = 'Легкая' | 'Средняя' | 'Сильная';

const AddVape = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [flavor, setFlavor] = useState('');
    const [strength, setStrength] = useState<StrengthType>('Легкая');
    const [stock, setStock] = useState('');
    const [puffs, setPuffs] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('flavor', flavor);
        formData.append('strength', strength);
        formData.append('stock', stock);
        formData.append('puffs', puffs);
        formData.append('price', price);
        formData.append('description', description);
        if (image) formData.append('image', image);

        await fetch('http://localhost:3001/api/vapes', {
            method: 'POST',
            body: formData,
        });

        setName('');
        setBrand('');
        setFlavor('');
        setStrength('Легкая');
        setStock('');
        setPuffs('');
        setPrice('');
        setImage(null);
        setDescription('');
    };

    return (
        <div className="max-w-3xl mx-auto">
            <form
                onSubmit={handleSubmit}
                className="
                    bg-white dark:bg-zinc-900
                    border border-gray-300 dark:border-zinc-700
                    rounded-2xl p-6
                    shadow-sm
                    flex flex-col gap-6
                "
            >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    Добавить товар
                </h2>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Название" required value={name} onChange={setName} />
                    <Input label="Бренд" value={brand} onChange={setBrand} />
                    <Input label="Вкус" required value={flavor} onChange={setFlavor} />
                    <Select strength={strength} setStrength={setStrength} />
                    <Input label="Запас" type="number" required value={stock} onChange={setStock} />
                    <Input label="Затяжки" type="number" value={puffs} onChange={setPuffs} />
                    <Input label="Цена" type="number" required value={price} onChange={setPrice} />
                </div>

                {/* IMAGE */}
                <div>
                    <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
                        Картинка
                    </label>
                    <input
                        type="file"
                        required
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="
                            w-full text-sm
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-md file:border-0
                            file:bg-blue-600 file:text-white
                            hover:file:bg-blue-700
                            transition
                        "
                    />
                </div>

                {/* DESCRIPTION */}
                <div>
                    <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
                        Описание
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="
                        self-start
                        px-6 py-2 rounded-md
                        bg-blue-600 text-white
                        hover:bg-blue-700
                        transition
                    "
                >
                    Добавить товар
                </button>
            </form>
        </div>
    );
};

export default AddVape;
