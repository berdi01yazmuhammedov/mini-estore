import Header from './Header';
import { Outlet } from 'react-router-dom';
import "@radix-ui/themes/styles.css";
import { Theme } from '@radix-ui/themes';

const Layout = () => {
    return (
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
            <div className="bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                <Header />

                <main>
                    <Outlet />
                </main>
            </div>
        </Theme>
    );
};

export default Layout;
