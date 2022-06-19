import React, { useEffect, useState } from 'react';
import { getStoredCart, removeFromDb } from '../../utilities/localdb';
import Loading from '../Shared/Loading';
import CartRow from './CartRow';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, []);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProducts = products.find(product => product._id === id)
            if (addedProducts) {
                const quantity = storedCart[id];
                addedProducts.quantity = quantity;
                savedCart.push(addedProducts);
            }
        }
        setCart(savedCart);
    }, [products]);

    const removeFromCart = (id) => {
        removeFromDb(id);
    }



    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-center text-2xl font-bold my-8'>Total Item: {cart.length}</h2>
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
                                removeFromCart={removeFromCart}
                            ></CartRow>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Cart;