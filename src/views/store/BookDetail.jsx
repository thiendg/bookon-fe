// src/pages/store/views/BookDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BasePage from "@/components/BasePage";
import { booksService } from "@/services/books.service";
import { useCart } from "@/hooks/useCart";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [book, setBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await booksService.getBookById(id);
        if (!res.success) {
          throw new Error(res.message || "Failed to load book information");
        }

        // backend may return data directly or inside res.data
        const data = res.data?.book || res.data || res.book;
        setBook(data);
      } catch (err) {
        console.error("Load book error:", err);
        setError(
          err.message ||
          "An error occurred while loading book information. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    if (!book) return;
    addToCart(book, quantity);
  };

  const handleViewCart = () => {
    navigate("/cart");
  };

  if (loading) {
    return (
      <BasePage title="Product Detail" currentPage="home">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center text-gray-600">
          Loading book information…
        </div>
      </BasePage>
    );
  }

  if (error) {
    return (
      <BasePage title="Product Detail" currentPage="home">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center text-red-600">
          {error}
        </div>
      </BasePage>
    );
  }

  if (!book) {
    return (
      <BasePage title="Product Detail" currentPage="home">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center text-gray-600">
          Book not found.
        </div>
      </BasePage>
    );
  }

  return (
    <BasePage title={book.title || "Product Detail"} currentPage="home">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Small breadcrumb-style back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-4"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-sm px-6 py-6 md:px-8 md:py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Book cover */}
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 sm:w-48 md:w-56 bg-slate-50 rounded-3xl overflow-hidden shadow-inner">
                <div className="w-full h-60 sm:h-72 md:h-80 overflow-hidden">
                  <img
                    src={book?.cover_image_url ? `${import.meta.env.VITE_API_URL}/${book.cover_image_url}` : null}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Book info */}
            <div className="md:w-2/3 flex flex-col">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">
                {book.title}
              </h1>

              <div className="space-y-1 text-sm md:text-base text-gray-700 mb-4">
                {book.author && (
                  <p>
                    <span className="font-semibold">Author:</span> {book.author}
                  </p>
                )}
                {book.publisher && (
                  <p>
                    <span className="font-semibold">Publisher:</span>{" "}
                    {book.publisher}
                  </p>
                )}
                {book.publishing_year && (
                  <p>
                    <span className="font-semibold">Published year:</span>{" "}
                    {book.publishing_year}
                  </p>
                )}
                {book.category_name && (
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {book.category_name}
                  </p>
                )}
              </div>

              {/* Price + quantity + buttons */}
              <div className="mb-6">
                <div className="text-gray-600 text-sm">Price</div>
                <div className="text-2xl md:text-3xl font-bold text-[#0b7560] mb-4">
                  {Number(book.price).toLocaleString("vi-VN")} ₫
                </div>

                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Quantity:</span>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(1, parseInt(e.target.value, 10) || 1)
                        )
                      }
                      className="w-20 border rounded-lg px-2 py-1 text-sm"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="px-4 py-2 rounded-2xl bg-[#05EAC0] text-white text-sm md:text-base font-medium hover:bg-[#04c7a4] transition-colors"
                    >
                      Add to cart
                    </button>
                    <button
                      type="button"
                      onClick={handleViewCart}
                      className="px-4 py-2 rounded-2xl border border-[#05EAC0] text-[#05EAC0] text-sm md:text-base font-medium hover:bg-[#e9fffb] transition-colors"
                    >
                      View cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-gray-100 pt-4 mt-auto">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-sm md:text-base text-gray-700 whitespace-pre-line">
                  {book.description || "No description is available for this book yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasePage>
  );
};

export default BookDetail;
