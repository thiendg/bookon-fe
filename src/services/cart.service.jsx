// src/services/cart.service.jsx
import { BehaviorSubject } from 'rxjs';

// Initialize cart from local storage or as empty array
const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
const cartSubject = new BehaviorSubject(initialCart);

export const cartService = {
    // Observable for cart changes
    cart: cartSubject.asObservable(),

    // Get current cart value
    get cartValue() {
        return cartSubject.value;
    },

    // Save cart to local storage
    saveCart: (cartItems) => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        cartSubject.next(cartItems);
    },

    /**
     * Add an item to the cart or update its quantity if it already exists.
     * @param {Object} item - The item to add (must have an 'id').
     * @param {number} quantity - The quantity to add.
     */
    addItem: (item, quantity = 1) => {
        const currentCart = cartService.cartValue;
        const existingItemIndex = currentCart.findIndex(cartItem => cartItem.id === item.id);

        if (existingItemIndex > -1) {
            // Item exists, update quantity
            const updatedCart = [...currentCart];
            updatedCart[existingItemIndex].quantity += quantity;
                        cartService.saveCart(updatedCart);
        } else {
            // Item does not exist, add new item
            const newCart = [...currentCart, { ...item, quantity }];
            cartService.saveCart(newCart);
        }
    },

    /**
     * Update the quantity of a specific item in the cart.
     * @param {number} itemId - The ID of the item to update.
     * @param {number} quantity - The new quantity. If 0 or less, the item is removed.
     */
    updateItemQuantity: (itemId, quantity) => {
        const currentCart = cartService.cartValue;
        const updatedCart = currentCart.map(cartItem =>
            cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
        ).filter(cartItem => cartItem.quantity > 0); // Remove if quantity is 0 or less
                    cartService.saveCart(updatedCart);
    },

    /**
     * Remove an item from the cart.
     * @param {number} itemId - The ID of the item to remove.
     */
    removeItem: (itemId) => {
        const currentCart = cartService.cartValue;
        const updatedCart = currentCart.filter(cartItem => cartItem.id !== itemId);
                    cartService.saveCart(updatedCart);
    },

    /**
     * Clear all items from the cart.
     */
    clearCart: () => {
        cartService.saveCart([]);
    },

    /**
     * (Conceptual) Function to convert cart to an order.
     * This would typically involve interacting with a backend orders API.
     */
    checkout: async () => {
        // Implement logic to send cart items to backend orders API
        // For now, it's a placeholder
        console.log("Checking out cart:", cartService.cartValue);
        alert("Checkout functionality not yet fully implemented. See console for cart contents.");
        // After successful checkout, clear cart:
        // cartService.clearCart();
        return { success: true, message: "Checkout initiated." };
    }
};