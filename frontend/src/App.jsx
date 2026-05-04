import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-8 mt-auto mt-12 border-t border-gray-800">
    <div className="container mx-auto text-center px-4">
      <p className="text-sm tracking-wide">
        &copy; {new Date().getFullYear()} <span className="text-white font-semibold">ProStore</span>. All rights reserved.
      </p>
    </div>
  </footer>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-300 selection:text-blue-900 overflow-x-hidden">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-10 fade-in">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
