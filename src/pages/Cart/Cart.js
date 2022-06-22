import React, { useEffect, useState } from 'react';
import { deleteShoppingCart, getStoredCart, removeFromDb } from '../../utilities/localdb';
import CartRow from './CartRow';
import { toast } from 'react-toastify';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const keys = Object.keys(storedCart);
        fetch('http://localhost:5000/productByKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {
                for (const id in storedCart) {
                    const addedProducts = products.find(product => product._id === id)
                    if (addedProducts) {
                        const quantity = storedCart[id];
                        addedProducts.quantity = quantity;
                        savedCart.push(addedProducts);
                    }
                }
                setCart(savedCart);
            })

    }, []);

    const removeFromCart = (id) => {
        const confirmDelete = window.confirm("do you want to delete this item?");
        if (confirmDelete === true) {
            toast('Item Successfully Deleted!');
            removeFromDb(id);
        }
    }

    const deleteCart = () => {
        const confirmDelete = window.confirm("do you want to delete all items?");
        if (confirmDelete === true) {
            deleteShoppingCart();
        }
    }

    return (
        <div className='container mx-auto mb-8'>
            <h2 className='text-center text-2xl font-bold my-8'>{cart.length > 0 ? <>Total Item: {cart.length}</> : <>No Items Added</>}</h2>
            <div>
                {
                    cart.map(cartRow => <CartRow
                        cartRow={cartRow}
                        key={cartRow._id}
                        removeFromCart={removeFromCart}
                    ></CartRow>)
                }
            </div>
            {
                cart.length > 1 ? <button onClick={deleteCart} className="btn bg-red-600 btn-sm font-bold w-2/4 mx-auto block mt-8">Delete All</button> : ''
            }
        </div>
    );
};

export default Cart;