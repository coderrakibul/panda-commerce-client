import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L0gwOCHgcol8ks1TUlNWNgW47HRGblYDdW2auw0wud0KWinkGaNs7d6XeEXOKsuxNbVchYWNnFZ8Pq40lumBq1300tAFEvpgI');

const Payment = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);

    let totalPay = 0;

    for (const order of orders) {
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

        <div>
            <h2 className='text-center text-2xl font-bold my-8'> Please Pay to Purchase! </h2>
            <div class="card w-11/12 md:w-3/6 lg:w-2/5 mx-auto bg-base-100 shadow-xl mb-16">
                <div class="card-body">
                    <h2>Hello <span className='text-xl font-bold text-info flex'>{user.displayName},</span></h2>
                    <h2 class="card-title mb-4 flex">You have to pay <span className='text-xl font-bold text-orange-500'>${totalPay}</span> to buy.</h2>
                    <h2 className='text-xl'>Please! provide the required info.</h2>
                </div>
            </div>

            <div className='card w-11/12 md:w-3/6 lg:w-2/5 mx-auto bg-base-100 shadow-xl'>
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;