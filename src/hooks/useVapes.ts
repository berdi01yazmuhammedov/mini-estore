import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchVapes } from '@/store/vapeSlice';
import { useEffect } from 'react';

const useVapes = () => {
    const dispatch = useAppDispatch();
    const { vapes, isLoading, error } = useAppSelector((state) => state.vapes);

    useEffect(() => {
        if (vapes.length === 0) {
            dispatch(fetchVapes());
        }
    }, [dispatch, vapes.length]);

    return { vapes, isLoading, error, refetch: () => dispatch(fetchVapes()) };
};

export default useVapes;
