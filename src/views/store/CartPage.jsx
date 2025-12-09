// src/pages/store/views/CartPage.jsx
import React, { useState, useEffect } from "react";
import BasePage from "@/components/BasePage";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth.hook"; // Import useAuth
import { orderService } from "@/services/order.service";
import { orderItemsService } from "@/services/orderItems.service";
import { Link } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/outline";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalAmount } = useCart();
  const { user } = useAuth(); // Get the authenticated user

  const [checkoutData, setCheckoutData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    shipping_address: "",
    payment_method: "COD",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Pre-fill form with user data if available
  useEffect(() => {
    if (user) {
      setCheckoutData(prev => ({
        ...prev,
        customer_name: user.full_name || '',
        customer_email: user.email || '',
        customer_phone: user.phone_number || '',
        shipping_address: user.address || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!items.length) {
      setError("Your cart is empty. Please add items before checking out.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const orderPayload = {
        user_id: user ? user.id : null, // Use authenticated user's ID or null for guest
        total_amount: totalAmount,
        ...checkoutData,
      };

      const orderRes = await orderService.createOrder(orderPayload);
      if (!orderRes.success) {
        throw new Error(orderRes.message || "Failed to create order.");
      }
      
      const order = orderRes.data.order || orderRes.data;

      for (const item of items) {
        await orderItemsService.create({
          order_id: order.id,
          book_id: item.book.id,
          quantity: item.quantity,
          price_at_purchase: item.book.price,
        });
      }

      clearCart();
      setMessage("Your order has been placed successfully!");
      setCheckoutData({ customer_name: "", customer_email: "", customer_phone: "", shipping_address: "", payment_method: "COD" });
    } catch (err) {
      setError(err.message || "An error occurred while placing the order.");
    } finally {
      setLoading(false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <BasePage title="Shopping Cart" currentPage="cart">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Your Shopping Cart is Empty</h1>
          <p className="text-gray-600 mb-6 max-w-md">
            Looks like you haven't added anything yet. Explore our collection and find your next favorite book!
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Browse Books
          </Link>
          {message && <div className="mt-6 text-center text-green-600">{message}</div>}
        </div>
      </BasePage>
    );
  }

  return (
    <BasePage title="Shopping Cart" currentPage="cart">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center lg:text-left">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            {items.map(({ book, quantity }) => (
              <div key={book.id} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                <div className="w-20 h-28 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={book.cover_image_url ? `${import.meta.env.VITE_API_URL}/${book.cover_image_url}` : '/no_img.jpg'}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-gray-500">Price: {Number(book.price).toLocaleString("vi-VN")} ₫</p>
                  <div className="flex items-center gap-4 mt-2">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => updateQuantity(book.id, parseInt(e.target.value, 10) || 1)}
                      className="w-20 border rounded-md px-2 py-1 text-sm"
                    />
                    <button onClick={() => removeFromCart(book.id)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="text-right mt-4">
              <button onClick={clearCart} className="text-sm text-gray-500 hover:underline">Clear Cart</button>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="w-full lg:w-2/5">
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-xl font-bold">Order Summary</h2>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total</span>
                <span className="font-bold text-xl text-indigo-600">{totalAmount.toLocaleString("vi-VN")} ₫</span>
              </div>
              <hr />
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input type="text" name="customer_name" value={checkoutData.customer_name} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" name="customer_email" value={checkoutData.customer_email} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input type="text" name="customer_phone" value={checkoutData.customer_phone} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Shipping Address</label>
                  <textarea name="shipping_address" value={checkoutData.shipping_address} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm" rows="3" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Method</label>
                  <select name="payment_method" value={checkoutData.payment_method} onChange={handleChange} className="w-full border rounded-md px-3 py-2 text-sm">
                    <option value="COD">Cash on Delivery (COD)</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                  </select>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default CartPage;
