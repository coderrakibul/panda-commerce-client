import React from 'react';

const CartRow = ({ cartRow, index, removeFromCart }) => {
    const { model, _id, image, price, quantity } = cartRow;
    return (
        <tr className=' font-bold'>
            <th>{index + 1}</th>
            <td>{model}</td>
            <td className='text-orange-500'>{_id}</td>
            <td><img className='w-16' src={image} alt="" /></td>
            <td>${price}</td>
            <td>{quantity}</td>
            <td onClick={() => removeFromCart(_id)}><button class="btn btn-xs font-bold">Delete</button></td>
            <td><button class="btn btn-xs font-bold">Order</button></td>
        </tr>
    );
};

export default CartRow;