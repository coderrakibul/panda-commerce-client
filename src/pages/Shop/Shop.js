import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import ScrollButton from '../Shared/ScrollButton';

import ShopItem from './ShopItem';

const Shop = () => {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/shoe')
            .then(res => res.json())
            .then(data => {
                setShoes(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <Loading></Loading>
    }


    return (
        <div>
            <h2 className='text-center text-2xl font-bold m-8'>Total Products: {shoes.length}</h2>

            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    shoes.map(shoe => <ShopItem
                        key={shoe._id}
                        shoe={shoe}
                    ></ShopItem>)
                }

            </div>
           <ScrollButton></ScrollButton>
        </div>
    );
};

export default Shop;