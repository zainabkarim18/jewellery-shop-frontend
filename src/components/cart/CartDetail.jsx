import React, { useState, useEffect } from 'react';
import { fetchCart, updateQuantity, removeFromCart, deleteFromCart, clearCart } from '../../services/cartService'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useNavigate } from 'react-router-dom'; 
import { placeOrder } from '../../services/orderService'; 

const CartDetail = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const items = await fetchCart();
        console.log('Cart data:', items); 
        setCartItems(items || []);
      } catch (error) {
        setError('Failed to load cart data.');
      }
    };

    loadCart();
  }, []);

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) {
      setError('Quantity must be at least 1.');
      return;
    }

    const item = cartItems.find(item => item.jewellery_id === id);
    if (!item) {
      setError('Jewellery not found in cart.');
      return;
    }

    if (newQuantity > item.stock) {
      setError('Quantity exceeds available stock.');
      return;
    }

    try {
      await updateQuantity(id, newQuantity);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.jewellery_id === id
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      setError('');
    } catch (error) {
      setError('Failed to update quantity.');
    }
  };

  const handleRemoveFromCart = async (id) => {
    const item = cartItems.find(item => item.jewellery_id === id);
    if (!item) {
      setError('Jewellery not found in cart.');
      return;
    }

    if (item.quantity <= 1) {
      handleDeleteFromCart(id); 
      return;
    }

    try {
      await removeFromCart(id);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.jewellery_id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
      setError('');
    } catch (error) {
      setError('Failed to remove jewellery.');
    }
  };

  const handleDeleteFromCart = async (id) => {
    try {
      await deleteFromCart(id);
      setCartItems(prevItems =>
        prevItems.filter(item => item.jewellery_id !== id)
      );
      setError('');
    } catch (error) {
      setError('Failed to delete jewellery.');
    }
  };

  const handleNavigateToDetail = (id) => {
    navigate(`/jewellery/${id}`);
  };

  const handlePlaceOrder = async () => {
    setPlacingOrder(true);
    try {
      const orderData = {
        cart: cartItems.map(item => ({
          jewellery_id: item.jewellery_id,
          quantity: item.quantity,
        })),
      };

      console.log('Placing order with data:', orderData);

      await placeOrder(orderData);

      await clearCart();

      setCartItems([]); 
      setSuccessMessage('Order placed successfully!');
      navigate('/orders');
  
    } catch (error) {
      setError('Failed to place order. Please try again.');
      console.error('Error placing order:', error.message);
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Your Cart</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cartItems.map(item => (
            <li key={item.jewellery_id} className="list-group-item d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
              <div className="d-flex flex-column">
                <strong
                  className="mb-1 text-dark cursor-pointer" 
                  onClick={() => handleNavigateToDetail(item.jewellery_id)}
                >
                  {item.jewellery_name}
                </strong>
                <span>{item.price} BD</span>
              </div>
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleUpdateQuantity(item.jewellery_id, item.quantity + 1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="btn btn-outline-warning btn-sm me-2"
                  onClick={() => handleRemoveFromCart(item.jewellery_id)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDeleteFromCart(item.jewellery_id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        className="btn btn-primary"
        onClick={handlePlaceOrder}
        disabled={placingOrder}
      >
        {placingOrder ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default CartDetail;
