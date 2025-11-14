import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
            <div className="bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                <Header />

                <main>
                    <Outlet />
                </main>
            </div>
    );
};

export default Layout;
