import useVapes from "@/hooks/useVapes";
import VapeRender from "../VapeRender";

const VapeList = () => {
    const { vapes, isLoading, error } = useVapes();
    if (isLoading) return <h2>Loading...</h2>;
    if (error) return <p>Error: {error}</p>;
    return <VapeRender vapes={vapes} isAdmin={true}/>;
};

export default VapeList;
