import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/AuthProvider';

// Auth Views
import ForgotPassword from './pages/auth/views/ForgotPassword';
import Login from './pages/auth/views/Login';
import ProtectedRoute from './pages/auth/views/ProtectedRoute';
import Register from './pages/auth/views/Register';
import ResetPassword from './pages/auth/views/ResetPassword';
import VerifyEmail from './pages/auth/views/VerifyEmail';
import Dashboard from "./pages/home/views/Dashboard";

// Home/Public Views
import HomePage from './pages/home/views/HomePage';
// import BookDetailsPage from './pages/home/views/BookDetailsPage';
import CategoryList from './pages/home/views/CategoryList';
import CategoryBooks from './pages/home/views/CategoryBooks';
// import CartPage from './pages/home/views/CartPage'; // Assuming this is also a public route for now
import ProfilePage from './pages/home/views/ProfilePage'; // For authenticated user profile
import OrderList from './pages/home/views/OrderList'; // Import OrderList
import OrderDetailsPage from './pages/home/views/OrderDetailsPage'; // Import OrderDetailsPage
import ReviewsPage from './pages/home/views/ReviewsPage'; // Import ReviewsPage

// Admin Views
import AdminLayout from './pages/admin/views/AdminLayout';
import AdminRoute from './pages/auth/views/AdminRoute';
import UserList from './pages/admin/views/UserList';
import UserCreate from './pages/admin/views/UserCreate';
import UserDetail from './pages/admin/views/UserDetail';
import BookList from './pages/admin/views/BookList';
import BookCreate from './pages/admin/views/BookCreate';
import BookDetail from './pages/admin/views/BookDetail';
import RoleList from './pages/admin/views/RoleList'; // Import RoleList
import RoleCreate from './pages/admin/views/RoleCreate'; // Import RoleCreate
import RoleDetail from './pages/admin/views/RoleDetail'; // Import RoleDetail
import AdminCategoryList from './pages/admin/views/AdminCategoryList'; // Import
import AdminCategoryCreate from './pages/admin/views/AdminCategoryCreate'; // Import
import AdminCategoryDetail from './pages/admin/views/AdminCategoryDetail'; // Import
import AdminOrderList from './pages/admin/views/AdminOrderList'; // Import
import AdminOrderDetail from './pages/admin/views/AdminOrderDetail'; // Import
import AdminReviewList from './pages/admin/views/AdminReviewList'; // Import
import AdminReviewDetail from './pages/admin/views/AdminReviewDetail'; // Import
import AdminPostList from './pages/admin/views/AdminPostList'; // Import
import AdminPostCreate from './pages/admin/views/AdminPostCreate'; // Import
import AdminPostDetail from './pages/admin/views/AdminPostDetail'; // Import
import AdminPostCommentList from './pages/admin/views/AdminPostCommentList'; // Import
import AdminPostCommentDetail from './pages/admin/views/AdminPostCommentDetail'; // Import
import AdminSettingDetail from './pages/admin/views/AdminSettingDetail'; // Import
import AdminContactList from './pages/admin/views/AdminContactList'; // Import
import AdminContactDetail from './pages/admin/views/AdminContactDetail'; // Import
import AdminFaqList from './pages/admin/views/AdminFaqList'; // Import
import AdminFaqCreate from './pages/admin/views/AdminFaqCreate'; // Import
import AdminFaqDetail from './pages/admin/views/AdminFaqDetail'; // Import
import FilesList from './pages/admin/views/FilesList';
import OrderItemsList from './pages/admin/views/OrderItemsList';
import OrderReviewsList from './pages/admin/views/OrderReviewsList';
import SessionsList from './pages/admin/views/SessionsList';
import TransactionsList from './pages/admin/views/TransactionsList';
import UserTokensList from './pages/admin/views/UserTokensList';
import AdminDashboardPage from './pages/admin/views/AdminDashboardPage';

// Home/Public Views - additional
import ContactPage from './pages/home/views/ContactPage';
import FaqPage from './pages/home/views/FaqPage'; // Import FaqPage
import PostListPage from './pages/home/views/PostListPage';
import PostDetailPage from './pages/home/views/PostDetailPage';

import { CartProvider } from '@/hooks/useCart';
import StoreBookList from './pages/store/views/BookList';
import StoreBookDetail from './pages/store/views/BookDetail';
import StoreCartPage from './pages/store/views/CartPage';
import AdminBooks from './pages/admin/views/AdminBooks';
import AdminOrders from './pages/admin/views/AdminOrders';


function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/*các route cho phần #3 */}
              <Route path="/home" element={<StoreBookList />} />
              <Route path="/books" element={<StoreBookList />} />
              <Route path="/books/:id" element={<StoreBookDetail />} />
              <Route path="/cart" element={<StoreCartPage />} />

              {/* Auth routes cũ */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/*  admin quản lý sản phẩm */}
              <Route
                path="/admin/books"
                element={
                  <ProtectedRoute>
                    <AdminBooks />
                  </ProtectedRoute>
                }
              />

              {/*  admin quản lý đơn hàng */}
              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute>
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </div>
        </CartProvider>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Render Register component */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            {/* <Route path="/books/:id" element={<BookDetailsPage />} /> */}
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/:categoryId" element={<CategoryBooks />} />
            {/* <Route path="/cart" element={<CartPage />} /> */}
            <Route path="/posts" element={<PostListPage />} /> {/* New route for Public Post List Page */}
            <Route path="/posts/:id" element={<PostDetailPage />} /> {/* New route for Public Post Detail Page */}

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            >
              <Route path="orders" element={<OrderList />} />
              <Route path="orders/:orderId" element={<OrderDetailsPage />} />
              <Route path="reviews" element={<ReviewsPage />} /> {/* Nested route for Reviews Page */}
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboardPage />} />
              <Route path="users" element={<UserList />} />
              <Route path="users/create" element={<UserCreate />} />
              <Route path="users/:id" element={<UserDetail />} />
              <Route path="books" element={<BookList />} />
              <Route path="books/create" element={<BookCreate />} />
              <Route path="books/:id" element={<BookDetail />} />
              <Route path="roles" element={<RoleList />} />
              <Route path="roles/create" element={<RoleCreate />} /> {/* New route for Role Create */}
              <Route path="roles/:id" element={<RoleDetail />} />
              <Route path="categories" element={<AdminCategoryList />} /> {/* New route for Admin Category List */}
              <Route path="categories/create" element={<AdminCategoryCreate />} /> {/* New route for Admin Category Create */}
              <Route path="categories/:id" element={<AdminCategoryDetail />} />
              <Route path="orders" element={<AdminOrderList />} /> {/* New route for Admin Order List */}
              <Route path="orders/:id" element={<AdminOrderDetail />} />
              <Route path="reviews" element={<AdminReviewList />} /> {/* New route for Admin Review List */}
              <Route path="reviews/:id" element={<AdminReviewDetail />} />
              <Route path="posts" element={<AdminPostList />} /> {/* New route for Admin Post List */}
              <Route path="posts/create" element={<AdminPostCreate />} /> {/* New route for Admin Post Create */}
              <Route path="posts/:id" element={<AdminPostDetail />} />
              <Route path="post-comments" element={<AdminPostCommentList />} /> {/* New route for Admin Post Comment List */}
              <Route path="post-comments/:id" element={<AdminPostCommentDetail />} /> {/* New route for Admin Post Comment Detail */}
              <Route path="settings" element={<AdminSettingDetail />} />
              <Route path="contacts" element={<AdminContactList />} /> {/* New route for Admin Contact List */}
              <Route path="contacts/:id" element={<AdminContactDetail />} />
              <Route path="faqs" element={<AdminFaqList />} /> {/* New route for Admin FAQ List */}
              <Route path="faqs/create" element={<AdminFaqCreate />} /> {/* New route for Admin FAQ Create */}
              <Route path="faqs/:id" element={<AdminFaqDetail />} /> {/* New route for Admin FAQ Detail */}
              <Route path="files" element={<FilesList />} />
              <Route path="order-items" element={<OrderItemsList />} />
              <Route path="order-reviews" element={<OrderReviewsList />} />
              <Route path="sessions" element={<SessionsList />} />
              <Route path="transactions" element={<TransactionsList />} />
              <Route path="user-tokens" element={<UserTokensList />} />
              {/* Add other admin routes here */}
            </Route>

            {/* Public Contact Page */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faqs" element={<FaqPage />} /> {/* New route for Public FAQ Page */}

            {/* 404 - Should be the last route */}
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;