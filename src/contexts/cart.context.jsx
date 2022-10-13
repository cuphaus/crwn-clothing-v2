import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const CART_ACTION_TYPES = {
    CHANGE_CART_VISIBILITY: 'CHANGE_CART_VISIBILITY',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type){
        case CART_ACTION_TYPES.CHANGE_CART_VISIBILITY:
            return {
                ...state,
                isCartOpen: payload
            };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

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
            return cartItems.filter(x => x.id !== productToRemove.id);
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
    const [ cartState, dispatch ] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, cartTotal } = cartState;

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.CHANGE_CART_VISIBILITY, bool));
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (productToRemove, deleteFlag) => {
        const newCartItems = removeCartItem(cartItems, productToRemove, deleteFlag);
        updateCartItemsReducer(newCartItems);
    };

    const updateCartItemsReducer = (newCartItems) => {
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, 
                { 
                    cartItems: newCartItems, 
                    cartTotal: newCartTotal, 
                    cartCount: newCartCount
                }
            )
        );
    };    

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, cartCount, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};