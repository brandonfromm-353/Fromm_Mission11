import { ReactNode, useState, useEffect, createContext, useContext } from "react";
import { CartItem } from "../types/CartItem";

// manages the cart state
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookID: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component that wraps the application and provides the cart context
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    // adds items to the cart with their price and quantity
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.bookID === item.bookID);
            const updatedCart = prevCart.map((i) =>
                i.bookID === item.bookID ? { ...i, price: i.price + item.price, quantity: i.quantity + 1 } : i
            );
            return existingItem ? updatedCart : [...prevCart, item];
        });
    };

    // removes items from the cart based on the bookID
    const removeFromCart = (bookID: number) => {
        setCart((prevCart) => prevCart.filter((i) => i.bookID !== bookID));
    };

    // clears the entire cart, but isn't fully implemented yet
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Provide the cart context to the children components
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

// This allows components to access the cart context easily
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};