import React from 'react';

const ShopItem = ({ shoe }) => {
    const { name, model, image, price, description } = shoe;

    return (
        <div class="card bg-base-100 shadow-xl">

            <label for="description-modal" class="btn modal-button">Description</label>
            <figure class="px-10 pt-4">
                <img className='h-48' src={image} alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body">
                <h2>Brand: {name}</h2>
                <p>Code: {model}</p>
                <h3>Price: ${price}</h3>
                <div class="card-actions w-full">
                    <button class="btn btn-primary w-full">Add to Cart</button>
                </div>




                <input type="checkbox" id="description-modal" class="modal-toggle" />
                <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box">
                        <h3 class="font-bold text-lg">Congratulations random Interner user!</h3>
                        <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
                        <div class="modal-action">
                            <label for="description-modal" class="btn">Yay!</label>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default ShopItem;