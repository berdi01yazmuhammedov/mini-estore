import ProductShowcase from './components/product/ProductShowcase.tsx';
import useVapes from './hooks/useVapes.ts';

function App() {
    const { vapes, isLoading, error } = useVapes();

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-sm text-[#86868b] sm:text-base">
                Загрузка каталога…
            </div>
        );
    }
      if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4 text-center text-sm text-[#86868b] sm:text-base">
                Ошибка загрузки: {error}
            </div>
        );
    }

     return <ProductShowcase products={vapes} />;
}

export default App;
