import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import Order from './Order';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);

    let totalPay = 0;

    for(const order of orders){
        totalPay = totalPay + order.finalPrice
    }

    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(`http://localhost:5000/order?user=${user.email}`)
                .then(res => res.json())
                .then(data => setOrders(data));
            setLoading(false);
        }
    }, [user])

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='container mx-auto mb-16'>
            {
                orders.length > 0 ? <h2 className='text-center text-2xl font-bold my-8'>Total: {orders.length}</h2> : <h2 className='text-center text-2xl font-bold my-8'>No Items Added</h2>
            }
            <div class="overflow-x-auto">
                {
                    orders.length > 0 && <table class="table w-full md:w-5/6 lg:w-3/5 mx-auto">
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
                                <td className='font-bold text-xl text-orange-500'>${totalPay}</td>
                            </tr>
                        </tbody>
                    </table>
                }
            </div>

            {orders.length > 0 && <button className="btn bg-green-500 btn-sm font-bold w-2/4 mx-auto block mt-8">Proceed Order</button>}
        </div>
    );
};

export default Orders;