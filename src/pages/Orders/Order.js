import React from 'react';

const Order = ({ order, index }) => {
    const { image, model, finalPrice } = order;
    return (
        <tr>
            <th>{index + 1}</th>
            <td><img className='w-8' src={image} alt="" /></td>
            <td>{model}</td>
            <td className='text-orange-500 font-bold'>${finalPrice} <button class="btn btn-circle bg-red-500 ml-8 btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button></td>
        </tr>
    );
};

export default Order;