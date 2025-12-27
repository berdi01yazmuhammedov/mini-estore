import React, { useState } from 'react';

type StrengthType = 'Легкая' | 'Средняя' | 'Сильная';
const AddVape = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [flavor, setFlavor] = useState('');
    const [nicotine, setNicotine] = useState('');
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
        formData.append('nicotine', nicotine);
        formData.append('strength', strength);
        formData.append('stock', stock.toString());
        formData.append('puffs', puffs.toString());
        formData.append('price', price.toString());
        formData.append('description', description);

        if (image) formData.append('image', image);

        const res = await fetch('http://localhost:3001/api/vapes', {
            method: 'POST',
            body: formData,
        });
        const data = await res.json();
        console.log('Ответ сервера', data);
    };
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
                required
                type="text"
                placeholder="Название электронки"
                value={name}
                onChange={(e) => setName(e.target.value.toLocaleUpperCase())}
            />
            <input
                type="text"
                placeholder="Брэнд"
                value={brand}
                onChange={(e) => setBrand(e.target.value.toUpperCase())}
            />
            <input
                required
                type="text"
                placeholder="Вкус"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value.toUpperCase())}
            />
            <input
                type="text"
                placeholder="Количество никотина"
                value={nicotine}
                onChange={(e) => setNicotine(e.target.value)}
            />
            <select
                className="rounded-md py-1 px-1 bg-primary text-secondary"
                value={strength}
                onChange={(e) => setStrength(e.target.value as StrengthType)}
            >
                <option value="Легкая">Легкая</option>
                <option value="Средняя">Средняя</option>
                <option value="Крепкий">Крепкий</option>
            </select>
            <input
                required
                type="number"
                placeholder="Запас"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            />
            <input
                type="number"
                placeholder="Затяжки"
                value={puffs}
                onChange={(e) => setPuffs(e.target.value)}
            />
            <input
                required
                type="number"
                placeholder="Цена"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                required
                type="file"
                placeholder="Картинка"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
            <input
                type="text"
                placeholder="Описание"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button className="rounded-md cursor-pointer hover:bg-primary/10" type="submit">
                Добавить
            </button>
        </form>
    );
};

export default AddVape;
