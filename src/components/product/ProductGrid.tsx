import type { Vape } from '@/types/vape';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Vape[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
    if (!products.length) {
        return (
            <section id="catalog" className="pb-8 pt-4 sm:pb-10">
                <div className="rounded-[28px] border border-dashed border-black/10 bg-[#f5f5f7] px-6 py-12 text-center text-sm text-[#86868b] sm:text-base">
                    Ничего не найдено. Попробуйте изменить поиск или фильтр.
                </div>
            </section>
        );
    }

    return (
        <section id="catalog" className="pb-8 pt-4 sm:pb-10">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                {products.map((vape) => (
                    <ProductCard key={vape.id} vape={vape} />
                ))}
            </div>
        </section>
    );
};

export default ProductGrid;
