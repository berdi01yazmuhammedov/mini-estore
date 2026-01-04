import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchVapes } from '@/store/vapeSlice';
import { useEffect } from 'react';

const useVapes = () => {
    const dispatch = useAppDispatch();
    const { vapes, isLoading, error } = useAppSelector((state) => state.vapes);

    useEffect(() => {
        dispatch(fetchVapes());
    }, [dispatch]);

    return { vapes, isLoading, error, refetch: () => dispatch(fetchVapes()) };
};

export default useVapes;
