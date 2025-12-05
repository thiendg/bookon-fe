import axiosInstance from './axiosInstance';

const BOOKS_API = '/modules/books/api/index.php'; 

export const booksService = {
  async list({
    page = 1,
    pageSize = 12,
    search = '',
    categoryId = null,
    sortBy,
    sortOrder,
  } = {}) {
    const params = { page, pageSize };
    if (search) params.search = search;
    if (categoryId) params.category_id = categoryId;
    if (sortBy && sortOrder) {
      params.sortBy = sortBy;
      params.sortOrder = sortOrder;
    }


    return axiosInstance.get(BOOKS_API, { params });
  },

  async get(id) {
    return axiosInstance.get(BOOKS_API, {
      params: { id },
    });
  },

  async create(bookData) {
    const formData = new FormData();
    Object.entries(bookData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    return axiosInstance.post(BOOKS_API, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  
  async update(id, bookData) {
    const formData = new FormData();
    Object.entries(bookData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value);
      }
    });

    return axiosInstance.put(BOOKS_API, formData, {
      params: { id },
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  async remove(id) {
    return axiosInstance.delete(BOOKS_API, {
      params: { id },
    });
  },
};
