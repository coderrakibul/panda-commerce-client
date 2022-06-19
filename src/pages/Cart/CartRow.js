import React from 'react';

const CartRow = ({ cartRow, index, removeFromCart, deleteCart }) => {
    const { model, _id, image, price, quantity } = cartRow;

    const totalPrice = price * quantity;
    const shipping = 5;
    const tax = parseFloat(totalPrice / 100 * 10).toFixed(2);
    const finalPrice = Math.round(totalPrice + shipping + parseFloat(tax));

    return (
        <tr className='font-bold'>
            <th>{index + 1}</th>
            <td>{model}</td>
            <td><img className='w-16' src={image} alt="" /></td>
            <td>${price}</td>
            <td>{quantity}</td>
            <td>${shipping}</td>
            <td>${tax}</td>
            <td>${finalPrice}</td>
            <td onClick={() => removeFromCart(_id)}><button class="btn bg-red-600 btn-sm font-bold">Delete</button></td>
            <td onClick={deleteCart}><button class="btn bg-red-600 btn-sm font-bold">Delete All</button></td>
            <td><button class="btn btn-sm font-bold">Order</button></td>
        </tr>
    );
};

export default CartRow;