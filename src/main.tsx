import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import CartPage from './pages/CartPage.tsx';
import PayPage from './pages/PayPage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import AddVape from './components/admin/AddVape.tsx';
import VapeList from './components/admin/VapeList.tsx';
import Orders from './components/admin/Orders.tsx';
import OrderSuccess from './pages/OrderSuccess.tsx';
import AdminLogin from './pages/AdminLogin.tsx';
import ProtectedRoute from './components/admin/ProtectedRoute.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<App />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/pay" element={<PayPage />} />
                    <Route path="/admin-login" element={<AdminLogin />} />
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <AdminPage />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<VapeList />} />
                        <Route path="add" element={<AddVape />} />
                        <Route path="list" element={<VapeList />} />
                        <Route path="orders" element={<Orders />} />
                    </Route>
                    <Route path="order-success" element={<OrderSuccess />} />
                    <Route path="*" element={<h1>404</h1>} /> // ADD NOT FOUND PAGE
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
