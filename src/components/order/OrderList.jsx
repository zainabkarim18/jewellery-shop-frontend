import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/orderService'; 
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const data = await fetchOrders();
                setOrders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    if (loading) return <div className="alert alert-info" role="alert">Loading...</div>;
    if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Your Orders</h1>
            {orders.length === 0 ? (
                <div className="alert alert-warning" role="alert">No orders found.</div>
            ) : (
                <ul className="list-group">
                    {orders.map(order => (
                        <li 
                            key={order.id} 
                            className="list-group-item d-flex justify-content-between align-items-center mb-3"
                        >
                            <div>
                                <p className="mb-1">
                                    <strong>Order ID: </strong>
                                    <Link 
                                        to={`/orders/${order.id}`} 
                                        style={{ color: '#007bff', textDecoration: 'none' }}
                                        onMouseEnter={e => e.target.style.textDecoration = 'underline'}
                                        onMouseLeave={e => e.target.style.textDecoration = 'none'}
                                    >
                                        {order.id}
                                    </Link>
                                </p>
                                <p className="mb-1"><strong>Total Price:</strong> {order.total_price} BD</p>
                                <p className="mb-0"><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderList;
