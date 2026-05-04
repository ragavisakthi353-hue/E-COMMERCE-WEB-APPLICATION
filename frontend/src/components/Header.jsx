import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { state } = useCart();
  const { cartItems } = state;
  const { userInfo, logout } = useAuth();

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          PROSTORE
        </Link>
        <nav>
          <ul className="flex space-x-8 text-lg items-center">
            <li>
              <Link to="/cart" className="flex items-center hover:text-blue-400 transition-colors relative">
                <FaShoppingCart className="mr-2" /> Cart
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </span>
                )}
              </Link>
            </li>
            {userInfo ? (
              <li className="relative group">
                <div className="flex items-center cursor-pointer hover:text-blue-400 transition-colors">
                  <FaUser className="mr-2" /> {userInfo.name}
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity invisible group-hover:visible z-50">
                  <button 
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center text-red-600 rounded-md"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              </li>
            ) : (
              <li>
                <Link to="/login" className="flex items-center hover:text-blue-400 transition-colors">
                  <FaUser className="mr-2" /> Sign In
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
