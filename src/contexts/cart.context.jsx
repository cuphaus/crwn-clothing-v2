import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    var existingItem = cartItems.find(i =>  i.id === productToAdd.id);
    // find if cart contains incoming product
    if(existingItem){
        // item exists; increment quantity
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        });
    } else {
        // otherwise add new cart item
        return [...cartItems, { ...productToAdd, quantity: 1 }];
    }
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [ cartItems, setCartItems ] = useState([]);
    const [cartCount, setCartCount] = useState(0)

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    useEffect(() => {
        const initValue = {quantity: 0};
        const newCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCount);
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};