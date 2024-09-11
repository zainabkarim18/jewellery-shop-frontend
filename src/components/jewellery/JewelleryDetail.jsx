import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../../services/cartService';
import { jewelleryDetail } from '../../services/jewelleryService'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/JewelleryDetail.css'; 

const JewelleryDetails = () => {
  const { id } = useParams(); 
  const [jewellery, setJewellery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [goToCart, setGoToCart] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        const data = await jewelleryDetail(id); 
        if (data.stock < 0) {
          setError('Invalid stock value for this jewellery.');
          setJewellery(null);
        } else {
          setJewellery(data);
        }
      } catch (err) {
          console.error('Error fetching data:', err);
          setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchJewellery();
  }, [id]);

  const handleAddToCart = async () => {
    if (!jewellery || quantity < 1) {
      setError('Invalid quantity or jewellery details');
      return;
    }

    if (quantity > jewellery.stock) {
      setError('Not enough stock available.');
      return;
    }

    const cartId = 1;

    try {
      await addToCart(cartId, jewellery.id, quantity); 
      setSuccessMessage('Jewellery added to cart.');
      setError('');
      setGoToCart(true); 
    } catch (error) {
      console.error('Error adding jewellery to cart:', error);
      setError('Failed to add jewellery to cart.');
    }
  };

  useEffect(() => {
    if (goToCart) {
      navigate('/cart');
    }
  }, [goToCart, navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && !goToCart && (
        <div className="alert alert-success">
          {successMessage}
          <div>Would you like to <Link to="/cart" className="btn btn-primary">go to your cart</Link>?</div>
        </div>
      )}
      {jewellery ? (
        <div className="card mb-4 shadow-sm">
          <div className="card-body d-flex">
            <div className="flex-grow-1">
              <h1 className="card-title">{jewellery.name}</h1>
              <p className="card-text"><strong>Description:</strong> {jewellery.description}</p>
              <p className="card-text"><strong>Price:</strong> {jewellery.price} BD</p>
              <label htmlFor="quantity" className="form-label">Quantity:</label>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  if (value >= 1 && value <= jewellery.stock) {
                    setQuantity(value);
                    setError(''); 
                  } else if (value > jewellery.stock) {
                    setQuantity(jewellery.stock);
                    setError('Quantity adjusted to available stock.');
                  } else if (value < 1) {
                    setQuantity(1); 
                    setError('Quantity cannot be less than 1.');
                  }
                }} 
                min="1"
                max={jewellery.stock} 
                className="form-control form-control-sm"
              />
              <div className="mt-3"> 
                <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
            <img src={jewellery.image} alt={jewellery.name} className="img-fluid ms-3" /> 
          </div>
        </div>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
};

export default JewelleryDetails;
