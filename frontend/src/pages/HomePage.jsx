import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data from API, using fallback data:', error);
        // Fallback to static data if MongoDB server is down
        const staticData = await import('../data');
        setProducts(staticData.default);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-20 text-3xl font-bold">Loading...</div>;

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-800 text-white rounded-2xl mb-12 p-10 md:p-20 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Level Up Your Gear</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Discover the latest electronics, premium gadgets, and must-have accessories at unbeatable prices.
          </p>
          <a href="#latest-products" className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg">
            Shop Now
          </a>
        </div>
      </div>

      <h2 id="latest-products" className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
        Latest Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
