import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        try {
            const raw = localStorage.getItem('bookon_cart');
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('bookon_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (book, quantity = 1) => {
        setItems(prev => {
            const existing = prev.find(i => i.book.id === book.id);
            if (existing) {
                return prev.map(i =>
                    i.book.id === book.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...prev, { book, quantity }];
        });
    };

    const updateQuantity = (bookId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(bookId);
            return;
        }
        setItems(prev =>
            prev.map(i =>
                i.book.id === bookId ? { ...i, quantity } : i
            )
        );
    };

    const removeFromCart = (bookId) => {
        setItems(prev => prev.filter(i => i.book.id !== bookId));
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const totalAmount = items.reduce(
        (sum, i) => sum + i.quantity * parseFloat(i.book.price || 0),
        0
    );

    const value = {
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalAmount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside CartProvider');
    return ctx;
};
