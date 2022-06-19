import React from 'react';

const Cart = ({ cart }) => {
    console.log(cart)

    return (
        <div>
            <h2>This is cart page {cart?.length}</h2>        
        </div>
    );
};

export default Cart;