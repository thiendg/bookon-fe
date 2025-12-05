// src/pages/home/views/Dashboard.jsx
import React from "react";
import BasePage from "@/components/BasePage";

const Dashboard = () => {
  return (
    <BasePage title="Dashboard" currentPage="home">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-700">
          This is the default Dashboard page. You can navigate to the feature pages:
        </p>

        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>
            Product list page: <code>/books</code> or <code>/home</code>
          </li>
          <li>
            Shopping cart: <code>/cart</code>
          </li>
          <li>
            Product management (admin): <code>/admin/books</code>
          </li>
          <li>
            Order management (admin): <code>/admin/orders</code>
          </li>
        </ul>
      </div>
    </BasePage>
  );
};

export default Dashboard;
