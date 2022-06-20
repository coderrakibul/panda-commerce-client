import React, { useEffect, useState } from 'react';
import { deleteShoppingCart, getStoredCart, removeFromDb } from '../../utilities/localdb';
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
        window.location.reload(false);
    }

    const deleteCart = () => {
        deleteShoppingCart();
        window.location.reload(false);
    }




    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='container mx-auto mb-8'>
            <h2 className='text-center text-2xl font-bold my-8'>Total Item: {cart.length}</h2>
            <div>
                {
                    cart.map(cartRow => <CartRow
                        cartRow={cartRow}
                        key={cartRow._id}
                        removeFromCart={removeFromCart}
                    ></CartRow>)
                }
            </div>
            <button onClick={deleteCart} class="btn bg-red-600 btn-sm font-bold w-2/4 mx-auto block mt-8">Delete All</button>
        </div>
    );
};

export default Cart;