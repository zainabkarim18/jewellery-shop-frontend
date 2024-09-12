import React, { useEffect, useState } from 'react';
import { orderDetail, deleteOrder } from '../../services/orderService';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadOrderDetails = async () => {
            try {
                const data = await orderDetail(id);
                console.log('Order Details:', data);
                setOrder(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadOrderDetails();
    }, [id]);

    const handleDelete = async () => {
        try {
            await deleteOrder(id);
            navigate('/orders');
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <div className="alert alert-info" role="alert">Loading...</div>;
    if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Bill</h1>
            {order ? (
                <div>
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Total Price:</strong> {order.total_price} BD</p>
                    <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>

                    {/* <h2 className="mt-4">Cart Items</h2>
                    {order.cart && order.cart.items && order.cart.items.length > 0 ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Jewellery ID</th>
                                    <th>Jewellery Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.cart.items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.jewellery_id}</td>
                                        <td>{item.jewellery_name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price} BD</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No items in cart.</p>
                    )} */}

                    <button onClick={handleDelete} className="btn btn-danger mt-3">Delete Order</button>
                </div>
            ) : (
                <p>Order not found.</p>
            )}
        </div>
    );
};

export default OrderDetails;
