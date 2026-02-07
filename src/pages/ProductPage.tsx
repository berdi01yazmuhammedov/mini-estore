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
        return <div className="text-center py-10">Загрузка...</div>;
    }
    if (!currentVape) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center gap-4 px-4 text-center">
                <h1 className="text-2xl font-semibold">Товар не найден</h1>
                <p className="text-sm text-muted-foreground">
                    Возможно, товар был удален или ссылка устарела.
                </p>
                <Link
                    to="/"
                    className="rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent"
                >
                    Вернуться в каталог
                </Link>
            </div>
        );
    }

    return (
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8 md:pt-12">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
            >
                <ChevronLeft className="h-4 w-4" />
                Назад в каталог
            </Link>

            <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
                <div className="rounded-3xl border border-border bg-card p-4 shadow-sm md:p-8">
                    <div className="aspect-square w-full overflow-hidden rounded-2xl bg-muted/40">
                        <img
                            src={currentVape.image}
                            alt={currentVape.name}
                            className="h-full w-full object-contain p-4"
                        />
                    </div>
                    <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        <span className="rounded-full bg-secondary px-3 py-1">{currentVape.brand}</span>
                        <span className="rounded-full bg-secondary px-3 py-1">
                            {currentVape.flavor}
                        </span>
                        <span className="rounded-full bg-secondary px-3 py-1">
                            {currentVape.strength}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {currentVape.brand}
                        </p>
                        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                            {currentVape.name}
                        </h1>
                        <p className="text-sm text-muted-foreground">{currentVape.description}</p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase text-muted-foreground">Цена</p>
                                <p className="text-2xl font-semibold text-primary">
                                    {currentVape.price} ₽
                                </p>
                            </div>
                            <VapeFooterActions product={currentVape} />
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="text-xs uppercase text-muted-foreground">Вкус</p>
                            <p className="mt-1 text-lg font-semibold">{currentVape.flavor}</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="text-xs uppercase text-muted-foreground">Крепость</p>
                            <p className="mt-1 text-lg font-semibold">{currentVape.strength}</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="text-xs uppercase text-muted-foreground">Затяжки</p>
                            <p className="mt-1 text-lg font-semibold">{currentVape.puffs}</p>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="text-xs uppercase text-muted-foreground">Бренд</p>
                            <p className="mt-1 text-lg font-semibold">{currentVape.brand}</p>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-border bg-gradient-to-br from-muted/40 to-transparent p-5">
                        <p className="text-xs uppercase text-muted-foreground">
                            Почему стоит попробовать
                        </p>
                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                            <li>• Долгая автономность и стабильный вкус.</li>
                            <li>• Стильный дизайн и приятная тяга.</li>
                            <li>• Идеален для ежедневного использования.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductPage;
