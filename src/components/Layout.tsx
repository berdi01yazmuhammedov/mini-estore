import Header from './Header';
import { Outlet } from 'react-router-dom';
import ScrollToTop from './ui/scrollToTop';

const Layout = () => {
    return (
            <div className="bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                <Header />

                <main className="container mx-auto px-2 py-2 lg:px-6">
                    <Outlet />
                </main>
                <ScrollToTop />
            </div>
    );
};

export default Layout;
