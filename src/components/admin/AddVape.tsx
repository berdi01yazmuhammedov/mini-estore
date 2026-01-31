import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { detectBrand } from '@/utils/detectBrands';

export type StrengthType = 'Легкая' | 'Средняя' | 'Сильная';
const API_URL = import.meta.env.VITE_API_URL;
const BRAND_RULES = [
    { match: 'WAKA', brand: 'WAKA' },
    { match: 'LOST MARY', brand: 'LOST MARY' },
    { match: 'ELFBAR', brand: 'ELFBAR' },
    { match: 'HQD', brand: 'HQD' },
    { match: 'PUFFMI', brand: 'PUFFMI' },
    { match: 'PLONQ', brand: 'PLONQ' },
];
const AddVape = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [brandTouched, setBrandTouched] = useState(false);
    const [flavor, setFlavor] = useState('');
    const [strength, setStrength] = useState<StrengthType>('Легкая');
    const [stock, setStock] = useState('');
    const [puffs, setPuffs] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileRef = useRef<HTMLInputElement | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => {
        setIsDragging(false);
    };
    const handleDragDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setImage(file);
            if (fileRef.current) {
                fileRef.current.files = e.dataTransfer.files;
            }
        }
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        try {
            setLoading(true);
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

            await fetch(`${API_URL}/api/vapes`, {
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
            if (fileRef.current) {
                fileRef.current.value = '';
            }
            setDescription('');
        } catch (error) {
            alert('Произошла ошибка при добавлении заказа');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (brandTouched) return;
        const detecded = detectBrand(name);
        if (detecded !== brand) {
            setBrand(detecded);
        }
    }, [name, brandTouched, brand]);
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <form
                    onSubmit={handleSubmit}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDragDrop}
                    className={`
                    relative
                    bg-white dark:bg-zinc-900
                    border rounded-2xl p-6
                    flex flex-col gap-6
                    transition
                    ${isDragging ? 'ring-2 ring-blue-500 bg-blue-50/40 dark:bg-zinc-800' : ''}
  `}
                >
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Добавить товар
                    </h2>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input label="Название" required value={name} onChange={setName} />
                        <Input
                            label="Бренд"
                            value={brand}
                            onChange={(value) => {
                                setBrand(value);
                                setBrandTouched(true);
                            }}
                        />
                        {!brand && name && (
                            <p className="text-xs text-gray-400">
                                Бренд не распознан — можно указать вручную
                            </p>
                        )}
                        <Input label="Вкус" required value={flavor} onChange={setFlavor} />
                        <Select strength={strength} setStrength={setStrength} />
                        <Input
                            label="Запас"
                            type="number"
                            required
                            value={stock}
                            onChange={setStock}
                        />
                        <Input label="Затяжки" type="number" value={puffs} onChange={setPuffs} />
                        <Input
                            label="Цена"
                            type="number"
                            required
                            value={price}
                            onChange={setPrice}
                        />
                    </div>

                    {/* IMAGE */}
                    {isDragging && (
                        <div
                            className="absolute inset-0 z-20 flex items-center justify-center
                  bg-blue-500/10 backdrop-blur-sm rounded-2xl
                  pointer-events-none"
                        >
                            <span className="text-lg font-semibold text-blue-600">
                                Отпусти файл для загрузки
                            </span>
                        </div>
                    )}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
                            Картинка
                        </label>
                        <input
                            ref={fileRef}
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
                        {image && (
                            <p className="text-xs text-gray-500 mt-1">
                                Загружено: <span className="font-medium">{image.name}</span>
                            </p>
                        )}
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
                        className={`cursor-pointer self-start
                        px-6 py-2 rounded-md
                        bg-blue-600 text-white
                       
                        transition duration-300
                        ${loading ? 'opacity-50 cursor-not-allowed' : ' hover:bg-blue-700'}
                        `}
                    >
                        {loading ? 'Добавляем...' : 'Добавить товар'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddVape;
