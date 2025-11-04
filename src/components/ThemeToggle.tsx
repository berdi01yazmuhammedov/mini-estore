import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>(
        (localStorage.getItem('theme') as 'dark' | 'light') ||
            (document.documentElement.classList.contains('dark') ? 'dark' : 'light')
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="cursor-pointer z-50 flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-gray-100 dark:bg-gray-200 dark:text-yellow-600 shadow-md hover:shadow-lg transition-colors duration-300"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
