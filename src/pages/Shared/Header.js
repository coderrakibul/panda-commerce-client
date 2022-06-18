import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ children }) => {

    const menuItems = <>
        <li><NavLink className='rounded-lg font-bold text-white' to="/home">Home</NavLink></li>
        <li><NavLink className='rounded-lg font-bold text-white' to="/shop">Shop</NavLink></li>
        <li><NavLink className='rounded-lg font-bold text-white' to="/login">Login</NavLink></li>
    </>

    return (
        <div class="drawer drawer-end">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content flex flex-col">
                <div class="w-full navbar bg-accent">
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