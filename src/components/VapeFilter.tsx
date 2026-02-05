import clsx from 'clsx';

const BRANDS = ['ВСЕ', 'WAKA', 'ELFBAR', 'LOST MARY', 'PUFFMI', 'HQD', 'PLONQ'] as const;

type Brand = (typeof BRANDS)[number];

interface VapeFilterProps {
    activeBrand: Brand;
    onChange: (brand: Brand) => void;
}

const VapeFilter = ({ activeBrand, onChange }: VapeFilterProps) => {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            {BRANDS.map((brand) => {
                const isActive = activeBrand === brand;

                return (
                    <button
                        key={brand}
                        onClick={() => onChange(brand)}
                        className={clsx(
                            'px-5 py-2 rounded-xl font-medium transition-all duration-300',
                            'border backdrop-blur-md',
                            'active:scale-95',
                            isActive
                                ? 'bg-black text-white border-black dark:bg-white dark:text-black'
                                : 'bg-white/60 text-black border-gray-300 hover:bg-black hover:text-white dark:bg-black/40 dark:text-white dark:border-gray-700 dark:hover:bg-white dar:hover:text-black'
                        )}
                    >
                        {brand}
                    </button>
                );
            })}
        </div>
    );
};
export default VapeFilter;