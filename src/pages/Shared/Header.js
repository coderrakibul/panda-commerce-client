import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../firebase.init';
import { getStoredCart } from '../../utilities/localdb';

const Header = ({ children }) => {
    const [cart, setCart] = useState([]);

    const [user] = useAuthState(auth);

    const logout = () => {
        signOut(auth);
    };

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const keys = Object.keys(storedCart);
        fetch('http://localhost:5000/productByKeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        })
            .then(res => res.json())
            .then(products => {
                for (const id in storedCart) {
                    const addedProducts = products.find(product => product._id === id)
                    if (addedProducts) {
                        const quantity = storedCart[id];
                        addedProducts.quantity = quantity;
                        savedCart.push(addedProducts);
                    }
                }
                setCart(savedCart);
            })

    }, [cart]);


    const menuItems = <>
        <li><NavLink className='rounded-lg font-bold text-white' to="/home">Home</NavLink></li>
        <li><NavLink className='rounded-lg font-bold text-white' to="/shop">Shop</NavLink></li>
        <li><NavLink className='rounded-lg font-bold text-white p-0 m-0' to="/cart">  <label tabIndex="0" className="btn btn-ghost">
            <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span className="badge badge-sm indicator-item text-white">{cart.length}</span>
            </div>
        </label></NavLink></li>
        <li><NavLink className='rounded-lg font-bold text-white' to="/orders">Orders</NavLink></li>
        {
            user ? <>


                <div class="dropdown dropdown-end">
                    <li><NavLink className='rounded-lg font-bold text-white' to=""><button>{user.displayName}</button></NavLink></li>
                    <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <p className="rounded-lg font-bold justify-between">
                                Profile
                                <span class="badge">New</span>
                            </p>
                        </li>
                        <li><p className='rounded-lg font-bold'>Settings</p></li>
                        <li><NavLink to="/login" onClick={logout} className='rounded-lg font-bold'>Signout</NavLink></li>
                    </ul>
                </div>

            </>
                : <li><NavLink to="/login" className='rounded-lg font-bold text-white'>Login</NavLink></li>
        }
    </>

    return (
        <div className="drawer drawer-end">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar bg-accent sticky top-0 z-20">
                    <div className="flex-1 px-2 mx-2 text-2xl font-bold text-white"> <Link to="/">Panda Commerce</Link> </div>
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">

                            {menuItems}
                        </ul>
                    </div>
                </div>
                {children}
            </div>

            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-50 bg-accent">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Header;