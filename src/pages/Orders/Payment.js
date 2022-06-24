import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';



const Payment = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);

    const [product] = useState({
        name: 'Product',
        price: 500,
    })

    async function handleToken(token, addresses) {
        const response = await axios.post('http://localhost:5000/checkout', { token, product })
        console.log(response.status);
        if (response.status === 200) {
            toast('Payment Success', { type: 'success' })
        }
        else {
            toast.error('Payment Failed', { type: 'failed' })
        }

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
            <div className='text-center'>
                <h2 className="text-center">Product Info</h2>
                <h3 className="text-center">Product Name: {product.name}</h3>
                <h3 className="text-center">Product Price: {product.price}</h3>
                <StripeCheckout
                    stripeKey='pk_test_51L0gwOCHgcol8ks1TUlNWNgW47HRGblYDdW2auw0wud0KWinkGaNs7d6XeEXOKsuxNbVchYWNnFZ8Pq40lumBq1300tAFEvpgI'
                    amount={product.price * 100}
                    name={product.name}
                    token={handleToken}
                    billingAddress
                    shippingAddress
                ></StripeCheckout>
            </div>
        </div>
    );
};

export default Payment;