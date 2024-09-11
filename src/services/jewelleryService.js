const fetchJewelleries = async () => {
    try {
        const res = await fetch('/api/jewellery/');

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Error fetching jewelleries:', err);
        throw err;
    }
};

const jewelleryDetail = async (id) => {
    try {
        const res = await fetch(`/api/jewellery/${id}`);

        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
    }
};


export { fetchJewelleries, jewelleryDetail }