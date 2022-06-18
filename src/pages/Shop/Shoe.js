import React from 'react';

const Shoe = ({ shoe }) => {
    const { name, model, image, price, description } = shoe;
    return (
        <div class="card bg-base-100 shadow-xl">

            <label for="shoe-modal" class="btn modal-button">Description</label>
            <figure class="px-10 pt-10">
                <img src={image} alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body mt-6">
                <h2>Brand: {name}</h2>
                <p>Code: {model}</p>
                <h3 className='text-xl font-bold'>Price: <span className='text-orange-500'>${price}</span></h3>
                <div class="card-actions w-full">
                    <button class="btn btn-primary w-full font-bold">Add to Cart</button>
                </div>

                <input type="checkbox" id="shoe-modal" class="modal-toggle" />
                <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">Description!</h3>
                        <p class="py-4">{description}</p>
                        <div class="modal-action">
                            <label for="shoe-modal" class="btn bg-red-700">Close</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shoe;