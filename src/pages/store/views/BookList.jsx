// src/pages/store/views/BookList.jsx
import React, { useEffect, useState } from "react";
import BasePage from "@/components/BasePage";
import { booksService } from "@/services/books.service";

const PAGE_SIZE = 12;

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBooks = async (page = 1, searchText = "") => {
    try {
      setLoading(true);
      setError("");

      const res = await booksService.list({
        page,
        pageSize: PAGE_SIZE,
        search: searchText,
      });

      if (!res.success) {
        console.error("Load books failed:", res);
        setError(res.message || "Failed to load book list.");
        setBooks([]);
        setPagination(null);
        return;
      }

      const payload = res.data || {};
      setBooks(payload.data || []);
      setPagination(payload.pagination || null);
    } catch (err) {
      console.error("Load books error:", err);
      setError(
        err?.message ||
          err?.error ||
          "An error occurred while loading the book list. Please try again."
      );
      setBooks([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks(1, "");
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadBooks(1, search.trim());
  };

  const handlePageChange = (page) => {
    if (!pagination) return;
    if (page < 1 || page > pagination.totalPages) return;
    loadBooks(page, search.trim());
  };

  return (
    <BasePage title="Book List" currentPage="home">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Book List</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Search and choose the books that best fit your needs.
          </p>
        </div>

        {/* Search box */}
        <form
          onSubmit={handleSearchSubmit}
          className="bg-white rounded-3xl shadow-sm px-4 py-3 mb-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center"
        >
          <input
            type="text"
            placeholder="Search products by keywords..."
            className="flex-1 border border-gray-200 rounded-2xl px-3 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[#05EAC0]/60 focus:border-[#05EAC0]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="whitespace-nowrap px-4 py-2 bg-[#05EAC0] text-white rounded-2xl text-sm md:text-base font-medium hover:bg-[#04c7a4] transition-colors"
          >
            Search
          </button>
        </form>

        {/* Status */}
        {loading && (
          <div className="mb-4 text-gray-600 text-sm text-center">
            Loading data…
          </div>
        )}
        {error && !loading && (
          <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
        )}

        {/* Book list */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {books.map((book) => (
            <a
              key={book.id}
              href={`/books/${book.id}`}
              className="group w-[140px] sm:w-[160px] md:w-[180px] lg:w-[190px] bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Cover */}
              <div className="w-full bg-gradient-to-b from-slate-100 to-slate-50">
                <div className="w-full h-44 sm:h-48 md:h-52 overflow-hidden">
                  <img
                    src={book?.cover_image_url ? `${import.meta.env.VITE_API_URL}/${book.cover_image_url}` : null}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>

              {/* Card content */}
              <div className="flex-1 flex flex-col px-3 pt-3 pb-4">
                <div className="text-[13px] font-semibold mb-1 leading-snug line-clamp-2">
                  {book.title}
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  {book.category_name || "Unknown category"}
                </div>
                <div className="mt-auto text-sm font-bold text-[#0b7560]">
                  {Number(book.price).toLocaleString("vi-VN")} ₫
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* No data */}
        {!loading && !error && books.length === 0 && (
          <div className="mt-6 text-gray-600 text-sm text-center">
            No products matched your search keyword.
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              type="button"
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
              disabled={!pagination.hasPrevPage}
              onClick={() =>
                handlePageChange(pagination.currentPage - 1)
              }
            >
              &laquo;
            </button>
            <span className="text-sm">
              Page {pagination.currentPage} / {pagination.totalPages}
            </span>
            <button
              type="button"
              className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50"
              disabled={!pagination.hasNextPage}
              onClick={() =>
                handlePageChange(pagination.currentPage + 1)
              }
            >
              &raquo;
            </button>
          </div>
        )}
      </div>
    </BasePage>
  );
};

export default BookList;
