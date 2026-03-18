import type { Vape } from '@/types/vape';
import ProductCard from './ProductCard';
import SectionHeading from '@/components/ui/SectionHeading';

interface ProductGridProps {
    products: Vape[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
    return (
        <section id="catalog" className="px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-14">
            <div className="mx-auto max-w-[1440px]">
                <SectionHeading
                    eyebrow="Catalog"
                    title="Продукты, оформленные как premium-витрина"
                    description="Один экран — один фокус: изображение, название и цена. Ничего лишнего, только чистая иерархия и много воздуха."
                />

                <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
                    {products.map((vape) => (
                        <ProductCard key={vape.id} vape={vape} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
