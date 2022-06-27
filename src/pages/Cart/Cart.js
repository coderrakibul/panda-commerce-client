import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Cart = ({ cart, removeFromCart }) => {
    const { name, model, _id, image, price, quantity, stock } = cart;
    const [user, loading] = useAuthState(auth);
    const [count, setCount] = useState(1);
    const newPrice = price * count;

    let totalQuantity = 0;
    let totalPrice = 0;
    const shipping = 5 * count;

    totalQuantity = quantity + totalQuantity;
    totalPrice = newPrice * totalQuantity;
    const tax = parseFloat(newPrice * 0.1).toFixed(2);

    const finalPrice = Math.round(totalPrice + shipping + parseFloat(tax));

    const decrease = (id) => {
        const totalQuantity = count - 1;
        setCount(totalQuantity)
    }

    const increase = (id) => {
        const totalQuantity = count + 1;
        setCount(totalQuantity)
    }

    const handleAddToOrder = (id) => {
        const order = {
            productId: cart._id,
            name,
            model,
            count,
            user: user.email,
            userName: user.displayName,
            finalPrice,
            image
        }

        fetch('https://polar-lake-06561.herokuapp.com/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast(`${model} added to your orders`);
                    removeFromCart(_id)
                }
                else {
                    toast.error(`${model} Already Exists`);
                }
            })

    }

    if (loading) {
        return <Loading></Loading>
    }


    return (
        <div className='flex justify-center items-center grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
            <div className='flex justify-center items-center gap-5 my-2'>
                <div>
                    <img className='w-24' src={image} alt="productImage" />
                </div>

                <div>
                    <h3>Name: {name}</h3>
                    <h3>Model: {model}</h3>
                    <h3>Id: <span className='font-bold text-orange-500'>{_id}</span></h3>
                    <h3 className='font-bold'>Price: <span className='text-orange-500'> ${newPrice}</span> </h3>
                </div>
            </div>

            <div className='flex justify-center items-center gap-5 my-2'>
                <div>
                    <h3>Quantity: <button disabled={count < 2} onClick={() => decrease(_id)} className='btn btn-ghost text-3xl font-bold text-red-500'>-</button><strong className='text-2xl'>{count}</strong> <button disabled={count === stock} onClick={() => increase(_id)} className='btn btn-ghost text-3xl font-bold text-green-500'>+</button></h3>
                    <h3>Shipping: ${shipping}</h3>
                    <h3>TAX- 10%: ${tax}</h3>
                    <h3 className='font-bold'>Total Price: <span className='text-orange-500'> ${finalPrice}</span></h3>
                </div>

                <div className='flex flex-col gap-2'>
                    <button onClick={() => removeFromCart(cart._id)} className="btn bg-red-600 btn-sm font-bold">Delete</button>

                    <button onClick={() => handleAddToOrder(_id)} className="btn btn-sm font-bold">Order</button>

                </div>
            </div>
        </div>
    );
};

export default Cart;