import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover hover:opacity-90 transition-opacity"
        />
      </Link>
      <div className="p-6">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">{product.name}</h3>
        </Link>
        <div className="flex items-center space-x-1 mb-4 text-sm text-gray-500">
          <span>{product.rating} ★</span>
          <span>({product.numReviews} reviews)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
