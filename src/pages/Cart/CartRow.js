import React from 'react';
import { toast } from 'react-toastify';

const CartRow = ({ cartRow, removeFromCart }) => {
    const { name, model, _id, image, price, quantity } = cartRow;

    const totalPrice = price * quantity;
    const shipping = 5;
    const tax = parseFloat(totalPrice / 100 * 10).toFixed(2);
    const finalPrice = Math.round(totalPrice + shipping + parseFloat(tax));


    const handleOrder = () => {

        const order = {
            productId: _id,
            productName: name,
            model: model,
            quantity: quantity,
            image: image,
            finalPrice: finalPrice
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
                    toast('Order Added Success!')
                }
                else {
                    toast.error('already added')
                }
            });
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
                    <button onClick={() => removeFromCart(_id)} className="btn bg-red-600 btn-sm font-bold">Delete</button>

                    <button onClick={handleOrder} className="btn btn-sm font-bold">Order</button>

                </div>
            </div>
        </div>
    );
};

export default CartRow;