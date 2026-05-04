import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

const CartPage = () => {
  const { state, dispatch } = useCart();
  const { cartItems } = state;
  const navigate = useNavigate();

  const removeFromCartHandler = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const checkoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-md shadow-sm">
          <p className="text-xl text-blue-700">Your cart is empty. <Link to="/" className="font-bold underline ml-2">Go back and shop.</Link></p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-6 w-2/5">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
                    <Link to={`/product/${item._id}`} className="font-semibold text-lg text-gray-800 hover:text-blue-600">
                      {item.name}
                    </Link>
                  </div>
                  <div className="text-xl font-bold text-gray-900 w-1/5">${item.price}</div>
                  <div className="w-1/5">
                    <select
                      value={item.qty}
                      onChange={(e) => dispatch({ type: 'ADD_ITEM', payload: { ...item, qty: Number(e.target.value) }})}
                      className="form-select px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full max-w-[80px]"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-1/5 text-right">
                    <button
                      onClick={() => removeFromCartHandler(item._id)}
                      className="text-red-500 hover:text-red-700 bg-red-50 p-3 rounded-full hover:bg-red-100 transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-4 text-lg">
                <span className="text-gray-600">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span className="font-bold text-gray-900">${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-6 mt-4">
                <button
                  type="button"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all"
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
