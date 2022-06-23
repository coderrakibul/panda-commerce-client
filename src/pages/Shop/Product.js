import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import { useNavigate } from 'react-router-dom';

const Product = ({ product }) => {
    const { _id, name, model, quantity, image, price, description } = product;

    const [user, loading] = useAuthState(auth);

    const navigate = useNavigate();

    const navigateUser = () => {
        if (!user) {
            navigate("/login");
        }
    }

    const handleAddToCart = (id) => {
        navigateUser();
        const cart = {
            productId: product._id,
            name,
            model,
            quantity,
            user: user.email,
            price,
            image
        }

        fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cart)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    toast(`${model} added to Cart `)
                }
                else {
                    toast.error(`${model} Already Exist`)
                }
            })

    }

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className="card bg-base-100 shadow-xl">

            <label htmlFor="shoe-modal" className="btn modal-button">Description</label>
            <div className="px-10 pt-10 mx-auto">
                <img src={image} alt="Shoes" className="rounded-xl h-48" />
            </div>
            <div className="card-body mt-6">
                <h2>Brand: {name}</h2>
                <p>Code: {model}</p>
                <h3 className='text-xl font-bold'>Price: <span className='text-orange-500'>${price}</span></h3>
                <div className="card-actions w-full">
                    <button onClick={() => handleAddToCart(_id)} className="btn btn-primary w-full font-bold">Add to Cart</button>
                </div>

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

export default Product;