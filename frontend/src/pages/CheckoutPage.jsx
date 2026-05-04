import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { state: cartState, dispatch } = useCart();
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const [error, setError] = useState(null);

  if (!userInfo) {
    navigate('/login');
    return null;
  }

  const itemsPrice = cartState.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2));
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const totalPrice = (Number(itemsPrice) + Number(taxPrice) + Number(shippingPrice)).toFixed(2);

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const orderData = {
        orderItems: cartState.cartItems,
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      };

      const { data } = await axios.post('http://localhost:5000/api/orders', orderData, config);
      
      // Clear cart
      dispatch({ type: 'CLEAR_CART' });
      alert(`Order Placed Successfully! Order ID: ${data._id}`);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  if (cartState.cartItems.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 border-b pb-4">Checkout</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 font-bold">{error}</div>}

      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3">
          <form className="bg-white rounded-xl shadow-lg p-8 border border-gray-100" onSubmit={placeOrderHandler}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Address</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Address</label>
                <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">City</label>
                <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Postal Code</label>
                <input type="text" required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Country</label>
                <input type="text" required value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-gray-800">Payment Method</h2>
            <div className="mb-8">
               <label className="inline-flex items-center">
                 <input type="radio" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} className="form-radio text-blue-600 h-5 w-5" />
                 <span className="ml-2 text-lg text-gray-700">PayPal or Credit Card</span>
               </label>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-lg hover:bg-blue-700 shadow-md">
              Place Order
            </button>
          </form>
        </div>

        <div className="md:w-1/3">
          <div className="bg-gray-50 rounded-xl shadow-md p-6 border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold border-b pb-4 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2"><span className="text-gray-600">Items:</span> <span className="font-semibold">${itemsPrice.toFixed(2)}</span></div>
            <div className="flex justify-between mb-2"><span className="text-gray-600">Shipping:</span> <span className="font-semibold">${shippingPrice.toFixed(2)}</span></div>
            <div className="flex justify-between mb-4"><span className="text-gray-600">Tax:</span> <span className="font-semibold">${taxPrice.toFixed(2)}</span></div>
            <div className="flex justify-between border-t pt-4 text-xl font-bold">
              <span>Total:</span> <span className="text-blue-600">${totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
