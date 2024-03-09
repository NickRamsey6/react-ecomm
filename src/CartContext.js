import { createContext, useState } from "react";
import { productsArray, getProductData } from "./productsStore";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

    // [{ id: 1, quantity: 2 } { id: 1, quantity: 0 }] Shopping Cart data

    function getProductQuantity(id) {
        // ? to check if id is undefined
        const quantity = cartProducts.find(product => product.id === id)?.quantity;

        if(quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity === 0) { //Product is NOT in cart
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else { //Product IS in cart
            setCartProducts(
                cartProducts.map(
                    // map through current cartProducts object when ID matches, add 1 to quantity updating the cartProducts object
                    product =>
                    product.id === id                                           //If passed in id matches the product.id in the cart object
                    ? { ...product, quantity: product.quantity + 1 }            //If id does match, add to quantity
                    : product                                                   //If id does not match leave that product's object as is
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if(quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    // map through current cartProducts object when ID matches, subtract 1 to quantity updating the cartProducts object
                    product =>
                    product.id === id                                           //If passed in id matches the product.id in the cart object
                    ? { ...product, quantity: product.quantity - 1 }            //If id does match, subtract from quantity
                    : product                                                   //If id does not match leave that product's object as is
                )
            )
        }
    }

    function deleteFromCart(id) {
        //Filter starts with empty array [], if object meets condition, object is added to array
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => {
                return currentProduct.id !== id;
            }) 
        )
    }

    function getTotalCost() {
        let totalCost =0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        });
        return totalCost;

    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

// Context (cart, addToCart, removeCart)
// Provider -> gives your React app access to all the things in your context