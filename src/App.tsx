import VapeRender from './components/VapeRender.tsx';
import useVapes from './hooks/useVapes.ts';

function App() {
    const { vapes, isLoading, error } = useVapes();
    if (isLoading) return <h2>Загрузка...</h2>;
    if (error) return <p>Error: {error}</p>;
    return <VapeRender vapes={vapes} />;
}

export default App;
