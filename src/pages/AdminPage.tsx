import { Link, Outlet } from 'react-router-dom';

const AdminPage = () => {
    return (
        <div>
            <div className=" flex gap-4 p-4">
                <Link to="list">Список товаров</Link>
                <Link to="add">Добавить товар</Link>
            </div>
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPage;
