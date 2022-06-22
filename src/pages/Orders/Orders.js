import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import Order from './Order';

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
        <div className='container mx-auto mb-16'>
            <h2 className='text-center text-2xl font-bold my-8'>Total: {orders.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full md:w-5/6 lg:w-3/5 mx-auto">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Image</th>
                            <th>Model</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) => <Order
                                key={order._id}
                                order={order}
                                index={index}
                            ></Order>)
                        }
                        <tr>
                            <td></td>
                            <td></td>
                            <td className='font-bold'>Total Pay =</td>
                            <td className='font-bold text-xl'>{}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button className="btn bg-green-500 btn-sm font-bold w-2/4 mx-auto block mt-8">Proceed Order</button>
        </div>
    );
};

export default Orders;