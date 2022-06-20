import React from 'react';

const Item = ({ item }) => {
    const { name, model, image, price, description } = item;
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="px-10 pt-10 mx-auto">
                <img src={image} alt="Shoes" className="rounded-xl h-48" />
            </div>
            <div className="card-body mt-6">
                <h2>Brand: {name}</h2>
                <p>Code: {model}</p>
                <h3 className='text-xl font-bold'>Price: <span className='text-orange-500'>${price}</span></h3>
                <label htmlFor="shoe-modal" className="btn modal-button">Description</label>

                <input type="checkbox" id="shoe-modal" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Description!</h3>
                        <p className="py-4">{description}</p>
                        <div className="modal-action">
                            <label htmlFor="shoe-modal" className="btn bg-red-700">Close</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Item;