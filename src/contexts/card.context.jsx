import { useEffect } from "react";
import { createContext , useState } from "react"; 


const addCartItem = (cartItems , productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
        );

    if(existingCartItem){
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id 
        ? {...cartItem , quantity : cartItem.quantity + 1} 
        : cartItem )
    }    

    // case of new item
    return [...cartItems , {...productToAdd , quantity: 1}];
}
const removeCartItem = (cartItems , cartItemToRemove) => {
    // find if cartItems contains cartItemToRemove
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
        );

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id);
    }    

    // case of new item
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id 
        ? {...cartItem , quantity : cartItem.quantity - 1} 
        : cartItem )
}
const clearCartItem = (cartItems , productToClear) => {
    return cartItems.filter(cartItem => cartItem.id != productToClear.id);

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart : () => {},
    removeItemToCart : () => {},
    cartCount : 0,
    clearCart : () => {},
    carttotal : 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen , setIsCartOpen] = useState(false);
    const [cartItems , setCartItems] = useState([]);
    const [cartCount , setCartCount] = useState(0);
    const [cartTotal , setCartTotal] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity , 0);
        setCartCount(newCartCount);
    }, [cartItems] )

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price , 0);
        setCartTotal(newCartTotal);
    }, [cartItems] )

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems,productToAdd));
        }
    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems,productToRemove));
        }
    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems , productToClear));
    }
    const value = {isCartOpen , setIsCartOpen ,addItemToCart ,cartItems , cartCount , removeItemFromCart , clearItemFromCart , cartTotal};
    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>;
}