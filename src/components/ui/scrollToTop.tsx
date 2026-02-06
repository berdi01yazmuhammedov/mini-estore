import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import clsx from 'clsx';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={clsx(
                'cursor-pointer fixed bottom-6 right-6 z-50',
                'flex items-center justify-center',
                'w-12 h-12 rounded-full',
                'transition-all duration-300 ease-out',
                'shadow-lg backdrop-blur-md',
                'border',
                visible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-90 pointer-events-none',
                'bg-white/80 text-black border-gray-200 hover:bg-black hover:text-white',
                'dark:bg-zinc-900/80 dark:text-white dark:border-zinc-700 dark:hover:bg-white dark:hover:text-black'
            )}
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    );
};

export default ScrollToTop;
