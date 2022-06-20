import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getStoredCart } from '../../utilities/localdb';
import Loading from './Loading';

const Header = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, []);


    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProducts = products.find(product => product._id === id)
            if (addedProducts) {
                const quantity = storedCart[id];
                addedProducts.quantity = quantity;
                savedCart.push(addedProducts);
            }
        }
        setCart(savedCart);
    }, [products]);

    if (loading) {
        return <Loading></Loading>
    }

    const menuItems = <>
        <li><NavLink className='rounded-lg font-bold text-white' to="/home">Home</NavLink></li>
        <li><NavLink className='rounded-lg font-bold text-white' to="/shop">Shop</NavLink></li>

        <li><NavLink className='rounded-lg font-bold text-white p-0 m-0' to="/cart">  <label tabindex="0" class="btn btn-ghost">
            <div class="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                <span class="badge badge-sm indicator-item text-white">{cart.length}</span>
            </div>
        </label></NavLink></li>


        <li><NavLink className='rounded-lg font-bold text-white' to="/login">Login</NavLink></li>
    </>

    return (
        <div class="drawer drawer-end">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col">
                <div class="w-full navbar bg-accent sticky top-0 z-20">
                    <div class="flex-1 px-2 mx-2 text-2xl font-bold text-white"> <Link to="/">Panda Commerce</Link> </div>
                    <div class="flex-none lg:hidden">
                        <label for="my-drawer-3" class="btn btn-square btn-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div class="flex-none hidden lg:block">
                        <ul class="menu menu-horizontal">

                            {menuItems}
                        </ul>
                    </div>
                </div>
                {children}
            </div>

            <div class="drawer-side">
                <label for="my-drawer-3" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-50 bg-accent">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Header;