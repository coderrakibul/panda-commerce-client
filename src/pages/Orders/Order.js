import React from 'react';

const Order = ({ order, index }) => {
    const { image, model, finalPrice } = order;
    return (
        <tr>
            <th>{index + 1}</th>
            <td><img className='w-8' src={image} alt="" /></td>
            <td>{model}</td>
            <td>{finalPrice}</td>
        </tr>
    );
};

export default Order;