import Header from './layout/Header';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ui/scrollToTop';

const Layout = () => {
    return (
        <div className="min-h-screen bg-white text-[#111111] antialiased">
            <Header />
            <main>
                <Outlet />
            </main>
            <ScrollToTop />
        </div>
    );
};

export default Layout;
