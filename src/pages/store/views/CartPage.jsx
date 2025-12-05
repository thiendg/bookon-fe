// src/pages/store/views/CartPage.jsx
import React, { useState } from "react";
import BasePage from "@/components/BasePage";
import { useCart } from "@/hooks/useCart";
import { ordersService } from "@/services/orders.service";
import { orderItemsService } from "@/services/orderItems.service";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalAmount } =
    useCart();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!items.length) {
      setError("Cart is empty");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const orderPayload = {
        user_id: null, // guest order
        total_amount: totalAmount,
        ...checkoutData,
      };

      // 1. Create order
      const orderRes = await ordersService.create(orderPayload);
      if (!orderRes.success) {
        throw new Error(orderRes.message || "Failed to create order");
      }

      const order = orderRes.data.order || orderRes.data;

      // 2. Create order_items for each product
      for (const item of items) {
        await orderItemsService.create({
          order_id: order.id,
          book_id: item.book.id,
          quantity: item.quantity,
          price_at_purchase: item.book.price,
        });
      }

      clearCart();
      setMessage("Order placed successfully!");
    } catch (err) {
      setError(
        err.message || "An error occurred while placing the order"
      );
    } finally {
      setLoading(false);
    }
  };

  // === EMPTY CART – only show message, no form ===
  if (!items || items.length === 0) {
    return (
      <BasePage title="Shopping Cart" currentPage="home">
        <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 mb-1 text-sm md:text-base">
            Your cart is empty!
          </p>
          <p className="text-gray-500 mb-6 text-xs md:text-sm max-w-md">
            Looks like you haven&apos;t added anything to your cart yet. Go
            ahead and explore our books!
          </p>
          <a
            href="/home"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-full text-sm md:text-base font-medium hover:bg-blue-700 transition-colors"
          >
            Browse Books
          </a>
        </div>
      </BasePage>
    );
  }

  // === CART WITH ITEMS ===
  return (
    <BasePage title="Shopping Cart" currentPage="home">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: cart items */}
          <div className="flex-1">
            {items.map(({ book, quantity }) => (
              <div
                key={book.id}
                className="flex items-start gap-4 bg-white rounded-2xl shadow-sm mb-4 p-4"
              >
                <div className="w-16 h-20 bg-gray-100 overflow-hidden rounded-2xl flex-shrink-0">
                  <img
                    src={
                      book.cover_image_url
                        ? `/uploads/${book.cover_image_url}`
                        : "/default_book_cover.png"
                    }
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold mb-1 line-clamp-2">
                    {book.title}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    Price: {Number(book.price).toLocaleString("vi-VN")} ₫
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Quantity:</span>
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) =>
                          updateQuantity(
                            book.id,
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-20 border rounded-lg px-2 py-1 text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      className="text-red-600 text-sm hover:underline"
                      onClick={() => removeFromCart(book.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {items.length > 0 && (
              <button
                type="button"
                className="mt-2 text-sm text-gray-600 underline"
                onClick={clearCart}
              >
                Clear cart
              </button>
            )}
          </div>

          {/* Right column: summary + checkout form */}
          <div className="w-full lg:w-1/3 space-y-4">
            {/* Total */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Total</span>
                <span className="font-bold text-[#0b7560] text-lg">
                  {totalAmount.toLocaleString("vi-VN")} ₫
                </span>
              </div>
            </div>

            {/* Checkout form */}
            <form
              onSubmit={handleCheckout}
              className="bg-white rounded-2xl shadow-sm p-4 space-y-3"
            >
              <div>
                <label className="block text-sm font-medium mb-1">
                  Recipient full name
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={checkoutData.customer_name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="customer_email"
                  value={checkoutData.customer_email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone number
                </label>
                <input
                  type="text"
                  name="customer_phone"
                  value={checkoutData.customer_phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Shipping address
                </label>
                <textarea
                  name="shipping_address"
                  value={checkoutData.shipping_address}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment method
                </label>
                <select
                  name="payment_method"
                  value={checkoutData.payment_method}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="COD">
                    Cash on delivery (COD)
                  </option>
                  <option value="BANK_TRANSFER">Bank transfer</option>
                </select>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}
              {message && (
                <div className="text-green-600 text-sm">{message}</div>
              )}

              <button
                type="submit"
                className="w-full bg-[#05EAC0] text-white py-2 rounded-2xl text-sm md:text-base font-medium hover:bg-[#04c7a4] disabled:opacity-50"
                disabled={loading || !items.length}
              >
                {loading ? "Processing..." : "Place order"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default CartPage;
