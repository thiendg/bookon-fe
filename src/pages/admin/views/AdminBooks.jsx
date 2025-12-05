// src/pages/admin/views/AdminBooks.jsx
import React, { useEffect, useState } from 'react';
import BasePage from '@/components/BasePage';
import { booksService } from '@/services/books.service';

const emptyForm = {
    title: '',
    description: '',
    price: '',
    stock_quantity: 0,
    category_id: '',
    author: '',
    publisher: '',
    publication_year: '',
    slug: '',
    cover_image: null,
};

const AdminBooks = () => {
    const [books, setBooks] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);

    const loadBooks = async (page = 1) => {
        try {
            setLoading(true);
            setError('');
            const res = await booksService.list({ page, pageSize: 10 });

            if (!res.success) {
                setError(res.message || 'Không tải được danh sách sách');
                return;
            }

            setBooks(res.data.data || []);
            setPagination(res.data.pagination || null);
        } catch (err) {
            setError(err.message || 'Lỗi khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setForm(prev => ({ ...prev, [name]: files[0] }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleEdit = (book) => {
        setEditingId(book.id);
        setForm({
            title: book.title || '',
            description: book.description || '',
            price: book.price || '',
            stock_quantity: book.stock_quantity || 0,
            category_id: book.category_id || '',
            author: book.author || '',
            publisher: book.publisher || '',
            publication_year: book.publication_year || '',
            slug: book.slug || '',
            cover_image: null,
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setForm(emptyForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');

            const payload = {
                ...form,
            };

            if (!payload.slug && payload.title) {
                payload.slug = payload.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9\-]/g, '');
            }

            if (form.cover_image) {
                payload.cover_image = form.cover_image;
            }

            if (editingId) {
                await booksService.update(editingId, payload);
            } else {
                await booksService.create(payload);
            }

            handleCancelEdit();
            await loadBooks();
        } catch (err) {
            setError(err.message || 'Lỗi khi lưu dữ liệu');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xoá sách này?')) return;
        try {
            setLoading(true);
            setError('');
            await booksService.remove(id);
            await loadBooks();
        } catch (err) {
            setError(err.message || 'Lỗi khi xoá');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (pagination && page >= 1 && page <= pagination.totalPages) {
            loadBooks(page);
        }
    };

    return (
        <BasePage title="Quản lý sản phẩm" currentPage="home">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

                {error && <div className="text-red-600 mb-4">{error}</div>}

                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-3xl shadow p-4 mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={form.slug}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Giá</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Số lượng tồn</label>
                        <input
                            type="number"
                            name="stock_quantity"
                            value={form.stock_quantity}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Category ID</label>
                        <input
                            type="number"
                            name="category_id"
                            value={form.category_id}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Tác giả</label>
                        <input
                            type="text"
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">NXB</label>
                        <input
                            type="text"
                            name="publisher"
                            value={form.publisher}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Năm XB</label>
                        <input
                            type="number"
                            name="publication_year"
                            value={form.publication_year}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Mô tả</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            rows={3}
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1">Ảnh bìa</label>
                        <input
                            type="file"
                            name="cover_image"
                            onChange={handleChange}
                            className="w-full"
                            accept="image/*"
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2">
                        {editingId && (
                            <button
                                type="button"
                                className="px-4 py-2 border rounded-lg"
                                onClick={handleCancelEdit}
                            >
                                Huỷ
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#05EAC0] text-white rounded-2xl hover:bg-[#04c7a4] disabled:opacity-50"
                            disabled={loading}
                        >
                            {editingId ? 'Cập nhật' : 'Thêm mới'}
                        </button>
                    </div>
                </form>

                <div className="bg-white rounded-3xl shadow overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-2 text-left">ID</th>
                                <th className="p-2 text-left">Tiêu đề</th>
                                <th className="p-2 text-right">Giá</th>
                                <th className="p-2 text-right">Tồn kho</th>
                                <th className="p-2">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((b) => (
                                <tr key={b.id} className="border-t">
                                    <td className="p-2">{b.id}</td>
                                    <td className="p-2 max-w-xs truncate">{b.title}</td>
                                    <td className="p-2 text-right">
                                        {Number(b.price).toLocaleString('vi-VN')} ₫
                                    </td>
                                    <td className="p-2 text-right">{b.stock_quantity}</td>
                                    <td className="p-2 text-center">
                                        <button
                                            className="text-[#0b7560] mr-2"
                                            onClick={() => handleEdit(b)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="text-red-600"
                                            onClick={() => handleDelete(b.id)}
                                        >
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {pagination && pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-4 gap-2">
                        <button
                            className="px-3 py-1 border rounded-lg disabled:opacity-50"
                            disabled={!pagination.hasPrevPage}
                            onClick={() => handlePageChange(pagination.currentPage - 1)}
                        >
                            &laquo;
                        </button>
                        <span className="px-2 py-1 text-sm">
                            Trang {pagination.currentPage} / {pagination.totalPages}
                        </span>
                        <button
                            className="px-3 py-1 border rounded-lg disabled:opacity-50"
                            disabled={!pagination.hasNextPage}
                            onClick={() => handlePageChange(pagination.currentPage + 1)}
                        >
                            &raquo;
                        </button>
                    </div>
                )}
            </div>
        </BasePage>
    );
};

export default AdminBooks;
