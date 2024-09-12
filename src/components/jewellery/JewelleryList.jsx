import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJewelleries } from '../../services/jewelleryService'; 
import 'bootstrap/dist/css/bootstrap.min.css';

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

  if (loading) return <div className="text-center mt-5"><p>Loading...</p></div>;
  if (error) return <div className="text-center mt-5"><p className="text-danger">Error: {error.message}</p></div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Jewelleries</h1>
      {Array.isArray(jewelleries) && jewelleries.length > 0 ? (
        <div className="row">
          {jewelleries.map(jewellery => (
            <div className="col-md-4 mb-4" key={jewellery.id}>
              <div className="card">
                <img src={jewellery.image} className="card-img-top" alt={jewellery.name} />
                <div className="card-body">
                  <h4 className="card">{jewellery.name}</h4> 
                  <Link to={`/jewellery/${jewellery.id}`} className="btn btn-primary btn-sm">View Details</Link> 
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No data available or data is not an array.</p>
      )}
    </div>
  );
};

export default JewelleryList;
