import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const Cart = ({ cart, removeFromCart }) => {
    const { name, model, _id, image, price, quantity } = cart;
    const [user, loading] = useAuthState(auth);

    const totalPrice = price * quantity;
    const shipping = 5;
    const tax = parseFloat(totalPrice / 100 * 10).toFixed(2);
    const finalPrice = Math.round(totalPrice + shipping + parseFloat(tax));

    const handleAddToCart = (id) => {
        const order = {
            productId: cart._id,
            name,
            model,
            user: user.email,
            price,
            image
        }

        fetch('http://localhost:5000/order', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
                    <h3 className='font-bold'>Price: <span className='text-orange-500'> ${price}</span> </h3>
                </div>
            </div>

            <div className='flex justify-center items-center gap-5 my-2'>
                <div>
                    <h3>Quantity: {quantity}</h3>
                    <h3>Shipping: ${shipping}</h3>
                    <h3>TAX- 10%: ${tax}</h3>
                    <h3 className='font-bold'>Total Price: <span className='text-orange-500'> ${finalPrice}</span></h3>
                </div>

                <div className='flex flex-col gap-2'>
                    <button onClick={() => removeFromCart(cart._id)} className="btn bg-red-600 btn-sm font-bold">Delete</button>

                    <button onClick={() => handleAddToCart(_id)} className="btn btn-sm font-bold">Order</button>

                </div>
            </div>
        </div>
    );
};

export default Cart;