import React, { useEffect, useState } from 'react';
import { getStoredCart } from '../../utilities/localdb';
import Loading from '../Shared/Loading';
import CartRow from './CartRow';

const Cart = () => {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/shoe')
            .then(res => res.json())
            .then(data => {
                setShoes(data)
                setLoading(false)
            })
    }, []);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedShoes = shoes.find(shoe => shoe._id === id)
            if (addedShoes) {
                const quantity = storedCart[id];
                addedShoes.quantity = quantity;
                savedCart.push(addedShoes);
            }
        }
        setCart(savedCart);
    }, [shoes]);

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-center text-2xl font-bold m-8'>Total Item: {cart.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Product Code</th>
                            <th>ID</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((cartRow, index) => <CartRow
                                cartRow={cartRow}
                                key={cartRow._id}
                                index={index}
                            ></CartRow>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Cart;