import type { Vape } from "@/types/vape";

export const loadCart = (): Vape[] => {
    try {
        const data = localStorage.getItem("cart");
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export const clearCartStorage = () => {
    localStorage.removeItem("cart");
}