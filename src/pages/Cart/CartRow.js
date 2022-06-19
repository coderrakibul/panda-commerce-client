import React from 'react';

const CartRow = ({ cartRow, index }) => {
    const { model, _id, image, quantity } = cartRow;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{model}</td>
            <td className='text-orange-500 font-bold'>{_id}</td>
            <td><img className='w-16' src={image} alt="" /></td>
            <td>{quantity}</td>
            <td><button class="btn btn-error">Delete</button></td>
        </tr>
    );
};

export default CartRow;