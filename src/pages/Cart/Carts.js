import React, { useEffect, useState } from 'react';
import Cart from './Cart';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Carts = () => {
    const [carts, setCarts] = useState([]);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(`http://localhost:5000/cart?user=${user.email}`)
                .then(res => res.json())
                .then(data => setCarts(data));
            setLoading(false);
        }
    }, [carts, user])


    const removeFromCart = (id) => {
        const proceed = window.confirm('are you sure?');
        if (proceed) {
            const url = `http://localhost:5000/cart/${id}`;
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
        <div className='container mx-auto mb-8'>
            <h2 className='text-center text-2xl font-bold my-8'>{carts.length > 0 ? <>Total Item: {carts.length}</> : <>No Items Added</>}</h2>
            <div>
                {
                    carts.map(cart => <Cart
                        key={cart._id}
                        cart={cart}
                        removeFromCart={removeFromCart}
                    ></Cart>)
                }
            </div>
            {
                carts.length > 1 ? <button className="btn bg-red-600 btn-sm font-bold w-2/4 mx-auto block mt-8">Delete All</button> : ''
            }
        </div>
    );
};

export default Carts;