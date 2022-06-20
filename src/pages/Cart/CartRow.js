import React from 'react';

const CartRow = ({ cartRow, removeFromCart, deleteCart }) => {
    const { name, model, _id, image, price, quantity } = cartRow;

    const totalPrice = price * quantity;
    const shipping = 5;
    const tax = parseFloat(totalPrice / 100 * 10).toFixed(2);
    const finalPrice = Math.round(totalPrice + shipping + parseFloat(tax));

    return (
        // <tr className='font-bold'>
        //     <th>{index + 1}</th>
        //     <td>{model}</td>
        //     <td><img className='w-16' src={image} alt="" /></td>
        //     <td>${price}</td>
        //     <td>{quantity}</td>
        //     <td>${shipping}</td>
        //     <td>${tax}</td>
        //     <td>${finalPrice}</td>
        //     <td></td>
        //     <td></td>
        //     <td></td>
        // </tr>
        <div className='flex justify-center items-center grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2'>
            <div className='flex justify-center items-center gap-5 my-2'>
                <div>
                    <img className='w-24' src={image} alt="productImage" />
                </div>

                <div>
                    <h3>Name: {name}</h3>
                    <h3>Model: {model}</h3>
                    <h3>Id: {_id}</h3>
                    <h3>Price: ${price}</h3>
                </div>
            </div>

            <div className='flex justify-center items-center gap-5 my-2'>
                <div>
                    <h3>Quantity: {quantity}</h3>
                    <h3>Shipping: ${shipping}</h3>
                    <h3>TAX- 10%: ${tax}</h3>
                    <h3>Final Price: ${finalPrice}</h3>
                </div>

                <div className='flex flex-col gap-2'>
                    <button onClick={() => removeFromCart(_id)} class="btn bg-red-600 btn-sm font-bold">Delete</button>
                    <button class="btn btn-sm font-bold">Order</button>

                </div>
            </div>
        </div>
    );
};

export default CartRow;