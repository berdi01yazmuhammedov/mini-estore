import { createRoot } from 'react-dom/client';
import "./index.css";
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.tsx';


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<App />} />
                <Route path="*" element={<h1>404</h1>} /> // ADD NOT FOUND PAGE
                
            </Route>
        </Routes>
    </BrowserRouter>
);
