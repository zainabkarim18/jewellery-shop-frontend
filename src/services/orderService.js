const BASE_URL = '/api/orders/';

const token = () => localStorage.getItem('access_token');

const fetchOrders = async () => {
    try {
        const res = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token()}`,
            }
        });

        if (!res.ok) throw new Error('Failed to fetch orders.');

        return await res.json();
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        throw error;
    }
};

const orderDetail = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}${id}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token()}`,
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch order details. Status: ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        console.error('Error fetching order details:', error.message);
        throw error;
    }
};

const deleteOrder = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}delete/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token()}`,
            }
        });

        if (!res.ok) throw new Error('Failed to delete order.');

    } catch (error) {
        console.error('Error deleting order:', error.message);
        throw error;
    }
};



const placeOrder = async (orderData) => {
    try {
        const res = await fetch(`${BASE_URL}add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token()}`,
            },
            body: JSON.stringify(orderData),
        });
        console.log(res);

        if (!res.ok) { 
            throw new Error('Failed to place order.');
        }

        
        return res;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
};





export { fetchOrders, orderDetail, deleteOrder, placeOrder }