import { Button, Spinner } from '@radix-ui/themes';
import { Heart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { fetchVapes } from './store/vapeSlice';

function App() {
    const dispatch = useAppDispatch();
    const { vapes, isLoading, error } = useAppSelector((state) => state.vapes);

    useEffect(() => {
        dispatch(fetchVapes());
    }, [dispatch]);
    if (isLoading) return <Spinner>Loading...</Spinner>;
    if (error) return <p>Error: {error}</p>;

    const renderedVapes = vapes.map((vape) => {
        return (
            <div key={vape.id} className="flex flex-col items-center gap-4 max-w-[300px]">
                <Heart className="text-gray-800 dark:text-gray-200" />
                <img src={vape.image} alt={vape.name} />
                <h4>{vape.name}</h4>
                <h5>{vape.price}</h5>
                <Button>Add to cart</Button>
            </div>
        );
    });
    return <div className="flex flex-wrap justify-center gap-4">{renderedVapes}</div>;
}

export default App;
