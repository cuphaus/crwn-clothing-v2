import { createContext, useState, useEffect } from "react";

const removeCartItem = (cartItems, productToRemove, deleteFlag) => {
    var existingItem = cartItems.find(i =>  i.id === productToRemove.id);
    if(existingItem){
        if(!deleteFlag){
            // decrement existing item
            return cartItems.map((cartItem) => {
                return cartItem.id === productToRemove.id 
                ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 0) }
                : cartItem
            });
        } else {
            // delete item
            return cartItems.filter(x => x.id !== productToRemove.id).map(x => x);
        }
    }
}

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
    removeItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToRemove, deleteFlag) => {
        setCartItems(removeCartItem(cartItems, productToRemove, deleteFlag));
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);

        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};