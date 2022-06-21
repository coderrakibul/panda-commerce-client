import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/order')
        .then(res => res.json())
        .then(data => {
            setOrders(data)
        })
    }, [])

    return (
        <div>
            <h2>{orders.length}</h2>
        </div>
    );
};

export default Orders;