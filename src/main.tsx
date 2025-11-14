import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import CartPage from './pages/CartPage.tsx';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<App />} />
                    <Route path='cart' element={<CartPage />} />
                    <Route path="*" element={<h1>404</h1>} /> // ADD NOT FOUND PAGE
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
