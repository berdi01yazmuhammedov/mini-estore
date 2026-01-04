import type { StrengthType } from "../admin/AddVape";

interface SelectProps{
    strength: StrengthType,
    setStrength: React.Dispatch<React.SetStateAction<StrengthType>>
}

export const Select: React.FC<SelectProps> = ({ strength, setStrength }) => (
    <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
            Крепость
        </label>
        <select
            value={strength}
            onChange={(e) => setStrength(e.target.value as StrengthType)}
            className="
                w-full rounded-md border
                border-gray-300 dark:border-zinc-700
                bg-transparent px-3 py-2 dark:bg-zinc-800
                text-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500
            "
        >
            <option value="Легкая">Легкая</option>
            <option value="Средняя">Средняя</option>
            <option value="Сильная">Сильная</option>
        </select>
    </div>
);
