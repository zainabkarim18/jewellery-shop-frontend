import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jewelleryDetail } from '../../services/jewelleryService'; 

const JewelleryDetails = () => {
  const { id } = useParams(); 
  const [jewellery, setJewellery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchJewellery = async () => {
      try {
        const data = await jewelleryDetail(id); 
        setJewellery(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchJewellery();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {jewellery ? (
        <div>
          <h1>{jewellery.name}</h1>
          <p>Description: {jewellery.description}</p>
          <p>Price: {jewellery.price} BD</p>
          <img src={jewellery.image} alt={jewellery.name} /><br /><br />
          
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      ) : (
        <p>No details available.</p>
      )}
    </div>
  );
};

export default JewelleryDetails;
