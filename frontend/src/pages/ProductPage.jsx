import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching single product, using fallback:', error);
        const staticData = await import('../data');
        const fallbackProduct = staticData.default.find((p) => p._id === id);
        setProduct(fallbackProduct);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-2xl font-bold">Loading...</div>;

  const addToCartHandler = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, qty },
    });
    navigate('/cart');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Link to="/" className="inline-block mb-6 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition font-medium">
        &larr; Go Back
      </Link>
      
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-xl shadow-md" />
        </div>
        
        <div className="md:w-1/2 flex flex-col">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">{product.name}</h2>
            <div className="text-gray-500 mb-4">{product.rating} ★ ({product.numReviews} Reviews)</div>
            <p className="text-4xl font-bold text-blue-600">${product.price}</p>
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed mb-8 border-b pb-6">
            {product.description}
          </p>

          <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="font-semibold text-gray-700">Status:</span>
              <span className={`font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold text-gray-700">Qty:</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="form-select w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className={`w-full py-4 rounded-lg font-bold text-lg mt-4 transition-all ${
                product.countInStock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg transform hover:-translate-y-1'
              }`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
