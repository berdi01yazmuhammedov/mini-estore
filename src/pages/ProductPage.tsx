import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import VapeFooterActions from '@/components/VapeFooterActions';
import { useEffect } from 'react';
import { fetchVapeById } from '@/store/vapeSlice';

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { currentVape, isLoading } = useAppSelector((state) => state.vapes);
    useEffect(() => {
        dispatch(fetchVapeById(Number(id)));
    }, [id]);
    if (isLoading) {
        return <div className="py-16 text-center text-sm text-[#86868b]">Загрузка...</div>;
    }
    if (!currentVape) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center gap-4 px-4 text-center">
                <h1 className="text-2xl font-semibold text-[#111111]">Товар не найден</h1>
                <p className="text-sm text-[#86868b]">
                    Возможно, товар был удалён или ссылка устарела.
                </p>
                <Link
                    to="/"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/10 px-5 text-sm font-medium text-[#111111] transition-all duration-200 hover:bg-[#f5f5f7]"
                >
                    Вернуться в каталог
                </Link>
            </div>
        );
    }

    return (
        <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-8">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#86868b] transition-all duration-200 hover:text-[#111111]"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Назад в каталог
                </Link>
                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                    <div className="rounded-[32px] bg-[#f5f5f7] p-4 sm:p-6 lg:p-8">
                        <div className="flex aspect-square w-full items-center justify-center rounded-[28px] bg-white p-6 sm:p-10">
                            <img
                                src={currentVape.image}
                                alt={currentVape.name}
                                className="h-full w-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div className="space-y-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#86868b]">
                                {currentVape.brand}
                            </p>
                            <h1 className="text-3xl font-semibold tracking-tight text-[#111111] sm:text-4xl lg:text-5xl">
                                {currentVape.name}
                            </h1>
                            <p className="max-w-xl text-sm leading-6 text-[#86868b] sm:text-base">
                                {currentVape.description || currentVape.flavor}
                            </p>
                        </div>
                        <div className="rounded-[28px] bg-[#f5f5f7] p-5 sm:p-6">
                            <p className="text-sm text-[#86868b]">Цена</p>
                            <p className="mt-2 text-3xl font-semibold tracking-tight text-[#111111]">
                                {currentVape.price} ₽
                            </p>
                            <div className="mt-5">
                                <VapeFooterActions product={currentVape} />
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[24px] bg-[#f5f5f7] p-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                                    Вкус
                                </p>
                                <p className="mt-2 text-lg font-semibold text-[#111111]">
                                    {currentVape.flavor}
                                </p>
                            </div>
                            <div className="rounded-[24px] bg-[#f5f5f7] p-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                                    Крепость
                                </p>
                                <p className="mt-2 text-lg font-semibold text-[#111111]">
                                    {currentVape.strength}
                                </p>
                            </div>
                            <div className="rounded-[24px] bg-[#f5f5f7] p-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                                    Затяжки
                                </p>
                                <p className="mt-2 text-lg font-semibold text-[#111111]">
                                    {currentVape.puffs}
                                </p>
                            </div>
                            <div className="rounded-[24px] bg-[#f5f5f7] p-4">
                                <p className="text-xs uppercase tracking-[0.18em] text-[#86868b]">
                                    Наличие
                                </p>
                                <p className="mt-2 text-lg font-semibold text-[#111111]">
                                    {currentVape.stock} шт.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;
