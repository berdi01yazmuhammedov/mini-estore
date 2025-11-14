
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { fetchVapes } from './store/vapeSlice';
import VapeCard from './components/VapeCard.tsx';

function App() {
    const dispatch = useAppDispatch();
    const { vapes, isLoading, error } = useAppSelector((state) => state.vapes);
    const { items } = useAppSelector((state) => state.cart);
    
    useEffect(() => {
        dispatch(fetchVapes());
    }, [dispatch]);
    if (isLoading) return <h2>Loading...</h2>
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 p-4 bg-gray-50 dark:bg-zinc-950 min-h-screen transition-colors duration-300">
            {vapes.map((vape) => (
                <VapeCard key={vape.id} vape={vape} />
            ))}
        </div>
    );
}

export default App;
