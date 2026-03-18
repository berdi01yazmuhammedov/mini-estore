import Header from './layout/Header';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ui/scrollToTop';
import Footer from './layout/Footer';

const Layout = () => {
    return (
        <div className="min-h-screen bg-white text-[#111111] antialiased">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <ScrollToTop />
        </div>
    );
};

export default Layout;
