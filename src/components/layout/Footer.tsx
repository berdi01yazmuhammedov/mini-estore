const Footer = () => {
    return (
        <footer id="service" className="border-t border-black/5 bg-[#f5f5f7] px-4 py-8 sm:px-6 lg:px-10">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-4 text-sm text-[#86868b] sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-semibold text-[#111111]">Vape Store</p>
                    <p className="max-w-xl leading-6">
                        Современная витрина для устройств и вкусов с чистой типографикой, удобным мобильным UX и акцентом на продукт.
                    </p>
                </div>
                <p>Самовывоз, быстрый заказ и аккуратный каталог без визуального шума.</p>
            </div>
        </footer>
    );
};

export default Footer;
