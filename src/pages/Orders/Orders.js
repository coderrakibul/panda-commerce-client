import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/order')
            .then(res => res.json())
            .then(data => {
                setOrders(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-center text-2xl font-bold my-8'>Total: {orders.length}</h2>
        </div>
    );
};

export default Orders;