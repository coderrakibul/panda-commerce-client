import React from 'react';
import { Link } from 'react-router-dom';

const Order = ({ order, index, removeFromOrder }) => {
    const { image, model, finalPrice, _id } = order;
    return (
        <tr>
            <td><img className='w-8' src={image} alt="" /></td>
            <td>{model}</td>
            <td className='text-orange-500 font-bold'>${finalPrice}</td>
            <td className='flex items-center justify-between'>
                <button onClick={() => removeFromOrder(_id)} className="btn btn-circle bg-red-500 ml-8 btn-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                {!order?.paid && <Link to={`/payment/${_id}`}><button className='text-red-500 font-bold ml-4 btn btn-ghost btn-sm'>Pay</button></Link>}

                {order?.paid && <span className='text-green-500 font-bold ml-4'>Paid</span>}

            </td>
        </tr>
    );
};

export default Order;