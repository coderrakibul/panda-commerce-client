import React from 'react';

const HistoryList = ({ hist }) => {
    const { model, image, finalPrice, transactionId, product } = hist;


    return (
        <div className='flex gap-4 my-4 p-2 justify-center items-center'>
            <div>
                <img className='w-16' src={image} alt="productImage" />
            </div>
            <div>
                <h3>Model: <span className='font-bold'>{model}</span></h3>
                <h3>Id: <span className='text-orange-500 font-bold'>{product}</span></h3>
                <h3>Cost: <span className='text-orange-500 font-bold'>${finalPrice}</span></h3>
                <h3>Transaction Id: <span className='text-green-500 font-bold'>{transactionId}</span></h3>
            </div>
        </div>
    );
};

export default HistoryList;