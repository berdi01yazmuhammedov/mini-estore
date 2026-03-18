import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Vape } from '@/types/vape';

interface HeroProps {
    featuredProduct?: Vape;
}

const Hero = ({ featuredProduct }: HeroProps) => {
    return (
        <section id="featured" className="px-4 pb-6 pt-6 sm:px-6 lg:px-10 lg:pb-10 lg:pt-8">
            <div className="mx-auto grid max-w-[1440px] overflow-hidden rounded-[32px] bg-[#f5f5f7] px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-16 lg:py-18">
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#86868b] sm:text-xs">
                        Minimal Vape Collection
                    </span>
                    <h1 className="mt-4 max-w-[12ch] text-3xl font-semibold tracking-tight text-[#111111] sm:text-5xl lg:text-6xl">
                        Дизайн, который продаёт продукт сам.
                    </h1>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-[#86868b] sm:text-base lg:text-lg">
                        Лёгкий, спокойный интерфейс с акцентом на устройство, вкус и цену — без визуального шума, как в лучших product-first витринах.
                    </p>

                    <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                        <a
                            href="#catalog"
                            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#111111] px-6 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:opacity-90 sm:w-auto"
                        >
                            Смотреть каталог
                        </a>
                        {featuredProduct ? (
                            <Link
                                to={`/vape/${featuredProduct.id}`}
                                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 px-6 text-sm font-medium text-[#111111] transition-all duration-200 hover:scale-[1.02] hover:bg-white sm:w-auto"
                            >
                                Открыть продукт
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        ) : null}
                    </div>
                </div>

                <div className="mt-10 lg:mt-0">
                    <div className="mx-auto flex max-w-xl flex-col items-center rounded-[28px] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(17,17,17,0.06)] transition-all duration-300 lg:px-10 lg:py-10">
                        {featuredProduct ? (
                            <>
                                <div className="aspect-[4/5] w-full max-w-[320px] overflow-hidden">
                                    <img
                                        src={featuredProduct.image}
                                        alt={featuredProduct.name}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#86868b]">
                                        {featuredProduct.brand}
                                    </p>
                                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#111111] sm:text-3xl">
                                        {featuredProduct.name}
                                    </h2>
                                    <p className="mt-2 text-sm text-[#86868b]">{featuredProduct.flavor}</p>
                                    <p className="mt-4 text-xl font-semibold text-[#111111] sm:text-2xl">
                                        {featuredProduct.price} ₽
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="flex min-h-[320px] items-center justify-center text-center text-[#86868b]">
                                Продукт появится здесь после загрузки каталога.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
