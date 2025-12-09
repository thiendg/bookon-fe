import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/hooks/AuthProvider';
import { CartProvider } from '@/hooks/useCart';
import { SettingsProvider } from './context/SettingsProvider';
import { ViewModeProvider } from './context/ViewModeContext';
import MainContent from './components/MainContent';


// Auth Views
import ForgotPassword from './views/auth/ForgotPassword';
import Login from './views/auth/Login';
import ProtectedRoute from './views/auth/ProtectedRoute';
import Register from './views/auth/Register';
import ResetPassword from './views/auth/ResetPassword';
import VerifyEmail from './views/auth/VerifyEmail';
import Dashboard from "./views/home/Dashboard";
import AboutPage from './views/home/AboutPage'; // Import AboutPage

// Home/Public Views
import CategoryList from './views/home/CategoryList';
import CategoryBooks from './views/home/CategoryBooks';
import ProfilePage from './views/home/ProfilePage';
import OrderList from './views/home/OrderList';
import OrderDetailsPage from './views/home/OrderDetailsPage';
import ReviewsPage from './views/home/ReviewsPage';

// Admin Views
import AdminLayout from './views/admin/AdminLayout';
import AdminRoute from './views/auth/AdminRoute';
import UserList from './views/admin/UserList';
import UserCreate from './views/admin/UserCreate';
import UserDetail from './views/admin/UserDetail';
import BookList from './views/admin/BookList';
import BookCreate from './views/admin/BookCreate';
import BookDetail from './views/admin/BookDetail';
import RoleList from './views/admin/RoleList';
import RoleCreate from './views/admin/RoleCreate';
import RoleDetail from './views/admin/RoleDetail';
import AdminCategoryList from './views/admin/AdminCategoryList';
import AdminCategoryCreate from './views/admin/AdminCategoryCreate';
import AdminCategoryDetail from './views/admin/AdminCategoryDetail';
import AdminOrderList from './views/admin/AdminOrderList';
import AdminOrderDetail from './views/admin/AdminOrderDetail';
import AdminReviewList from './views/admin/AdminReviewList';
import AdminReviewDetail from './views/admin/AdminReviewDetail';
import AdminPostList from './views/admin/AdminPostList';
import AdminPostCreate from './views/admin/AdminPostCreate';
import AdminPostDetail from './views/admin/AdminPostDetail';
import AdminPostCommentList from './views/admin/AdminPostCommentList';
import AdminPostCommentDetail from './views/admin/AdminPostCommentDetail';
import AdminSettingDetail from './views/admin/AdminSettingDetail';
import AdminContactList from './views/admin/AdminContactList';
import AdminContactDetail from './views/admin/AdminContactDetail';
import AdminFaqList from './views/admin/AdminFaqList';
import AdminFaqCreate from './views/admin/AdminFaqCreate';
import AdminFaqDetail from './views/admin/AdminFaqDetail';
import FilesList from './views/admin/FilesList';
import OrderItemsList from './views/admin/OrderItemsList';
import OrderReviewsList from './views/admin/OrderReviewsList';
import SessionsList from './views/admin/SessionsList';
import TransactionsList from './views/admin/TransactionsList';
import UserTokensList from './views/admin/UserTokensList';
import AdminDashboardPage from './views/admin/AdminDashboardPage';

// Home/Public Views - additional
import ContactPage from './views/home/ContactPage';
import FaqPage from './views/home/FaqPage'; FaqPage
import PostListPage from './views/home/PostListPage';
import PostDetailPage from './views/home/PostDetailPage';
import StoreBookList from './views/store/BookList';
import StoreBookDetail from './views/store/BookDetail';
import StoreCartPage from './views/store/CartPage';


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
                    <Route path="/about" element={<AboutPage />} />

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