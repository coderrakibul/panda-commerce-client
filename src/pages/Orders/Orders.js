import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import Order from './Order';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(`https://polar-lake-06561.herokuapp.com/order?user=${user.email}`)
                .then(res => res.json())
                .then(data => setOrders(data));
            setLoading(false);
        }
    }, [user, orders])


    const removeFromOrder = (id) => {
        const proceed = window.confirm('are you sure?');
        if (proceed) {
            const url = `https://polar-lake-06561.herokuapp.com/order/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
        }
    }


    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='container mx-auto mb-16'>
            {
                orders.length > 0 ? <h2 className='text-center text-2xl font-bold my-8'>Total: {orders.length}</h2> : <h2 className='text-center text-2xl font-bold my-8'>No Items Ordered</h2>
            }
            <div className="overflow-x-auto">
                {
                    orders.length > 0 && <table className="table w-full md:w-5/6 lg:w-2/4 mx-auto">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Model</th>
                                <th>Total</th>
                                <th className='flex justify-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order) => <Order
                                    key={order._id}
                                    order={order}
                                    removeFromOrder={removeFromOrder}
                                ></Order>)
                            }
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
};

export default Orders;