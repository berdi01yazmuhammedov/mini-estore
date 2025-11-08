import {ThemeToggle} from './ThemeToggle';

const Header = () => {
    return (
        <header className="flex items-center justify-between p-1 gap-10">
            <h1 className='flex-1'>Mini-estore</h1>
            {/* <nav >
                <ul className="flex gap-10">
                    <li>Contact</li>
                    <li>link</li>
                    <li>link</li>
                </ul>
            </nav> */}
            <ThemeToggle />
        </header>
    );
};

export default Header;
