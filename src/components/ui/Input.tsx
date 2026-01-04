import type React from "react";

interface InputProps{
    label: string,
    value: string,
    onChange: (value: string) => void,
    type?: string,
    required?: boolean
}
export const Input: React.FC<InputProps> = ({ label, value, onChange, type = 'text', required = false }) => (
    <div>
        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-400">
            {label}
        </label>
        <input
            type={type}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="
                w-full rounded-md border
                border-gray-300 dark:border-zinc-700
                bg-transparent px-3 py-2
                text-gray-800 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500
            "
        />
    </div>
);
