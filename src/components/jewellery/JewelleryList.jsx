import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {fetchJewelleries}  from '../../services/jewelleryService'; 

const JewelleryList = () => {
  const [jewelleries, setJewelleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJewelleries = async () => {
      try {
        const data = await fetchJewelleries(); 
        setJewelleries(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadJewelleries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Jewelleries</h1>
      {Array.isArray(jewelleries) && jewelleries.length > 0 ? (
        <ul>
          {jewelleries.map(jewellery => (
            <li key={jewellery.id}>
              <Link to={`/jewellery/${jewellery.id}`}>{jewellery.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No data available or data is not an array.</p>
      )}
    </div>
  );
};

export default JewelleryList;
