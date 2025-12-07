import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/AuthProvider';
import { CartProvider } from '@/hooks/useCart';
import { SettingsProvider } from './context/SettingsProvider';
import { ViewModeProvider } from './context/ViewModeContext';
import MainContent from './components/MainContent';


// Auth Views
import ForgotPassword from './pages/auth/views/ForgotPassword';
import Login from './pages/auth/views/Login';
import ProtectedRoute from './pages/auth/views/ProtectedRoute';
import Register from './pages/auth/views/Register';
import ResetPassword from './pages/auth/views/ResetPassword';
import VerifyEmail from './pages/auth/views/VerifyEmail';
import Dashboard from "./pages/home/views/Dashboard";

// Home/Public Views
import CategoryList from './pages/home/views/CategoryList';
import CategoryBooks from './pages/home/views/CategoryBooks';
import ProfilePage from './pages/home/views/ProfilePage';
import OrderList from './pages/home/views/OrderList';
import OrderDetailsPage from './pages/home/views/OrderDetailsPage';
import ReviewsPage from './pages/home/views/ReviewsPage';

// Admin Views
import AdminLayout from './pages/admin/views/AdminLayout';
import AdminRoute from './pages/auth/views/AdminRoute';
import UserList from './pages/admin/views/UserList';
import UserCreate from './pages/admin/views/UserCreate';
import UserDetail from './pages/admin/views/UserDetail';
import BookList from './pages/admin/views/BookList';
import BookCreate from './pages/admin/views/BookCreate';
import BookDetail from './pages/admin/views/BookDetail';
import RoleList from './pages/admin/views/RoleList';
import RoleCreate from './pages/admin/views/RoleCreate';
import RoleDetail from './pages/admin/views/RoleDetail';
import AdminCategoryList from './pages/admin/views/AdminCategoryList';
import AdminCategoryCreate from './pages/admin/views/AdminCategoryCreate';
import AdminCategoryDetail from './pages/admin/views/AdminCategoryDetail';
import AdminOrderList from './pages/admin/views/AdminOrderList';
import AdminOrderDetail from './pages/admin/views/AdminOrderDetail';
import AdminReviewList from './pages/admin/views/AdminReviewList';
import AdminReviewDetail from './pages/admin/views/AdminReviewDetail';
import AdminPostList from './pages/admin/views/AdminPostList';
import AdminPostCreate from './pages/admin/views/AdminPostCreate';
import AdminPostDetail from './pages/admin/views/AdminPostDetail';
import AdminPostCommentList from './pages/admin/views/AdminPostCommentList';
import AdminPostCommentDetail from './pages/admin/views/AdminPostCommentDetail';
import AdminSettingDetail from './pages/admin/views/AdminSettingDetail';
import AdminContactList from './pages/admin/views/AdminContactList';
import AdminContactDetail from './pages/admin/views/AdminContactDetail';
import AdminFaqList from './pages/admin/views/AdminFaqList';
import AdminFaqCreate from './pages/admin/views/AdminFaqCreate';
import AdminFaqDetail from './pages/admin/views/AdminFaqDetail';
import FilesList from './pages/admin/views/FilesList';
import OrderItemsList from './pages/admin/views/OrderItemsList';
import OrderReviewsList from './pages/admin/views/OrderReviewsList';
import SessionsList from './pages/admin/views/SessionsList';
import TransactionsList from './pages/admin/views/TransactionsList';
import UserTokensList from './pages/admin/views/UserTokensList';
import AdminDashboardPage from './pages/admin/views/AdminDashboardPage';

// Home/Public Views - additional
import ContactPage from './pages/home/views/ContactPage';
import FaqPage from './pages/home/views/FaqPage'; FaqPage
import PostListPage from './pages/home/views/PostListPage';
import PostDetailPage from './pages/home/views/PostDetailPage';
import StoreBookList from './pages/store/views/BookList';
import StoreBookDetail from './pages/store/views/BookDetail';
import StoreCartPage from './pages/store/views/CartPage';


function App() {
  return (
    <Router>
      <SettingsProvider>
        <AuthProvider>
          <CartProvider>
            <ViewModeProvider>
              <MainContent>
                <div className="App">
                  <Routes>
                    {/* Root / Public routes */}
                    <Route path="/" element={<StoreBookList />} />
                    <Route path="/books" element={<StoreBookList />} />
                    <Route path="/books/:id" element={<StoreBookDetail />} />
                    <Route path="/cart" element={<StoreCartPage />} />
                    <Route path="/posts" element={<PostListPage />} />
                    <Route path="/posts/:id" element={<PostDetailPage />} />
                    <Route path="/categories" element={<CategoryList />} />
                    <Route path="/categories/:categoryId" element={<CategoryBooks />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faqs" element={<FaqPage />} />

                    {/* Auth routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/verify-email" element={<VerifyEmail />} />

                    {/* Protected / User routes */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />

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
                      <Route path="reviews" element={<ReviewsPage />} />
                    </Route>

                    {/* Admin routes (nested under /admin) */}
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
                      <Route path="roles/create" element={<RoleCreate />} />
                      <Route path="roles/:id" element={<RoleDetail />} />

                      <Route path="categories" element={<AdminCategoryList />} />
                      <Route path="categories/create" element={<AdminCategoryCreate />} />
                      <Route path="categories/:id" element={<AdminCategoryDetail />} />

                      <Route path="orders" element={<AdminOrderList />} />
                      <Route path="orders/:id" element={<AdminOrderDetail />} />

                      <Route path="reviews" element={<AdminReviewList />} />
                      <Route path="reviews/:id" element={<AdminReviewDetail />} />

                      <Route path="posts" element={<AdminPostList />} />
                      <Route path="posts/create" element={<AdminPostCreate />} />
                      <Route path="posts/:id" element={<AdminPostDetail />} />

                      <Route path="post-comments" element={<AdminPostCommentList />} />
                      <Route path="post-comments/:id" element={<AdminPostCommentDetail />} />

                      <Route path="settings" element={<AdminSettingDetail />} />
                      <Route path="contacts" element={<AdminContactList />} />
                      <Route path="contacts/:id" element={<AdminContactDetail />} />
                      <Route path="faqs" element={<AdminFaqList />} />
                      <Route path="faqs/create" element={<AdminFaqCreate />} />
                      <Route path="faqs/:id" element={<AdminFaqDetail />} />

                      <Route path="files" element={<FilesList />} />
                      <Route path="order-items" element={<OrderItemsList />} />
                      <Route path="order-reviews" element={<OrderReviewsList />} />
                      <Route path="sessions" element={<SessionsList />} />
                      <Route path="transactions" element={<TransactionsList />} />
                      <Route path="user-tokens" element={<UserTokensList />} />
                    </Route>

                    {/* Fallback 404 */}
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                  </Routes>
                </div>
              </MainContent>
            </ViewModeProvider>
          </CartProvider>
        </AuthProvider>
      </SettingsProvider>
    </Router>
  );
}

export default App;