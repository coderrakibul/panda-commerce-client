import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51L0gwOCHgcol8ks1TUlNWNgW47HRGblYDdW2auw0wud0KWinkGaNs7d6XeEXOKsuxNbVchYWNnFZ8Pq40lumBq1300tAFEvpgI');

const Payment = () => {
    const { id } = useParams();
    const url = `https://polar-lake-06561.herokuapp.com/order/${id}`

    const { data: order, isLoading } = useQuery(['order', id], () => fetch(url, {
        method: 'GET',
        headers: {

        }
    }).then(res => res.json()));

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='mx-auto'>
            <div class="card w-50 max-w-md bg-base-100 shadow-xl my-12">
                <div class="card-body">
                    <h2>Hello, <span className="text-success font-bold text-xl">{order.userName}</span></h2>
                    <h2 class="card-title">Please Pay <span className='text-orange-500 font-bold'>${order.finalPrice} </span> for {order.model}</h2>
                </div>
            </div>
            <div class="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                <div class="card-body">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm order={order} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;