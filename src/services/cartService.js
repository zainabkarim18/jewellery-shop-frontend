const BASE_URL = '/api/carts/';

const token = () => localStorage.getItem('access_token');


const fetchCart = async () => {
    try {
        const res = await fetch(BASE_URL, {
            headers: {
                'Authorization': `Bearer ${token()}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) throw new Error(`Failed to fetch cart. Status: ${res.status}`);
        const data = await res.json();
        return data.cart_items;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

const updateQuantity = async (jewelleryId, newQuantity) => {
    if (!jewelleryId || newQuantity < 1) throw new Error('Invalid jewelleryId or quantity');

    try {
        const res = await fetch(`${BASE_URL}update/jewellery/${jewelleryId}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity })
        });

        if (!res.ok) throw new Error(`Failed to update quantity. Status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error updating quantity:', error);
        throw error;
    }
};

const removeFromCart = async (jewelleryId) => {
    if (!jewelleryId) throw new Error('Invalid jewelleryId');

    try {
        const res = await fetch(`${BASE_URL}remove/jewellery/${jewelleryId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token()}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) throw new Error(`Failed to remove jewellery. Status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error removing jewellery:', error);
        throw error;
    }
};

const deleteFromCart = async (jewelleryId) => {
    if (!jewelleryId) throw new Error('Invalid jewelleryId');

    try {
        const res = await fetch(`${BASE_URL}delete/jewellery/${jewelleryId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token()}`,
                'Content-Type': 'application/json'
            }
        });

        if (!res.ok) throw new Error(`Failed to delete jewellery. Status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error deleting jewellery:', error);
        throw error;
    }
};

const addToCart = async (cartId, jewelleryId, quantity) => {
    if (!cartId || !jewelleryId || quantity < 1) {
        throw new Error('Invalid cartId, jewelleryId, or quantity');
    }

    try {
        const res = await fetch(`${BASE_URL}add/jewellery/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cart: cartId, jewellery: jewelleryId, quantity })
        });

        if (!res.ok) throw new Error(`Failed to add jewellery to cart. Status: ${res.status}`);
        return await res.json();
    } catch (error) {
        console.error('Error adding jewellery to cart:', error);
        throw error;
    }
};

export { fetchCart, updateQuantity, removeFromCart, deleteFromCart, addToCart };
