import React from 'react';

const Cart = ({ cart }) => {
    console.log(cart);
    return (
        <div>
            <h2>Total item {cart?.length}</h2>
        </div>
    );
};

export default Cart;