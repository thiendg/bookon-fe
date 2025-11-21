// src/pages/home/views/CartPage.jsx
import React, { useState, useEffect } from 'react';
import { cartService } from '@/services/cart.service';
import BasePage from '@/components/BasePage';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { IconTrash, IconPlus, IconMinus, IconShoppingCart } from '@tabler/icons-react';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false); // Cart items are local, no async loading here initially
    const [error, setError] = useState(''); // For any future local validation or display errors

    // Subscribe to cart changes
    useEffect(() => {
        const subscription = cartService.cart.subscribe(items => {
            setCartItems(items);
        });

        // Initial load
        setCartItems(cartService.cartValue);

        return () => subscription.unsubscribe();
    }, []);

    const handleUpdateQuantity = (itemId, change) => {
        const item = cartItems.find(i => i.id === itemId);
        if (item) {
            const newQuantity = item.quantity + change;
            cartService.updateItemQuantity(itemId, newQuantity);
        }
    };

    const handleRemoveItem = (itemId) => {
        cartService.removeItem(itemId);
    };

    const handleCheckout = async () => {
        setLoading(true);
        setError('');
        try {
            // This is a placeholder for actual checkout API call
            const result = await cartService.checkout();
            if (result.success) {
                // Clear cart after successful checkout (handled inside cartService.checkout in real app)
                // cartService.clearCart(); 
                alert('Checkout successful! (Placeholder)');
            } else {
                throw new Error(result.message || 'Checkout failed');
            }
        } catch (err) {
            setError(err.message || 'An error occurred during checkout.');
        } finally {
            setLoading(false);
        }
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = 0.05; // Example tax rate
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return (
        <BasePage title="Shopping Cart">
            <Helmet>
                <meta name="description" content="View and manage your shopping cart items before checkout." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Your Shopping Cart</h1>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {cartItems.length === 0 ? (
                    <div className="empty">
                        <div className="empty-img">
                            <IconShoppingCart className="icon" style={{ width: '4rem', height: '4rem' }} />
                        </div>
                        <p className="empty-title">Your cart is empty!</p>
                        <p className="empty-subtitle">Looks like you haven't added anything to your cart yet. Go ahead and explore our books!</p>
                        <div className="empty-action">
                            <Link to="/" className="btn btn-primary">
                                Browse Books
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="row g-4">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="table-responsive">
                                    <table className="table table-vcenter card-table">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th className="text-center">Price</th>
                                                <th className="text-center">Quantity</th>
                                                <th className="text-end">Subtotal</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.map(item => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <span className="avatar me-3 rounded" style={{ backgroundImage: `url(${item.cover_image_url ? `${import.meta.env.VITE_API_URL}/public/uploads/${item.cover_image_url}` : 'https://source.unsplash.com/random/50x70/?book'})` }}></span>
                                                            <div>
                                                                <p className="m-0 text-truncate">{item.title}</p>
                                                                <small className="text-muted">{item.author}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">${parseFloat(item.price).toFixed(2)}</td>
                                                    <td className="text-center">
                                                        <div className="btn-group btn-group-sm">
                                                            <button className="btn" onClick={() => handleUpdateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                                                                <IconMinus />
                                                            </button>
                                                            <span className="btn">{item.quantity}</span>
                                                            <button className="btn" onClick={() => handleUpdateQuantity(item.id, 1)}>
                                                                <IconPlus />
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="text-end">${parseFloat(item.price * item.quantity).toFixed(2)}</td>
                                                    <td>
                                                        <button className="btn btn-icon btn-sm btn-ghost-danger" onClick={() => handleRemoveItem(item.id)}>
                                                            <IconTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer text-end">
                                    <button className="btn btn-ghost-primary" onClick={cartService.clearCart}>Clear Cart</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Order Summary</h3>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-2">
                                        <div>Subtotal ({totalItems} items)</div>
                                        <div className="font-weight-bold">${subtotal.toFixed(2)}</div>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <div>Shipping</div>
                                        <div className="font-weight-bold">Free</div>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <div>Tax ({(taxRate * 100).toFixed(0)}%)</div>
                                        <div className="font-weight-bold">${tax.toFixed(2)}</div>
                                    </div>
                                    <div className="hr-text"></div>
                                    <div className="d-flex justify-content-between h3 mb-0">
                                        <div>Order Total</div>
                                        <div>${total.toFixed(2)}</div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-primary w-100" onClick={handleCheckout} disabled={loading}>
                                        {loading ? 'Processing...' : 'Proceed to Checkout'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </BasePage>
    );
};

export default CartPage;
