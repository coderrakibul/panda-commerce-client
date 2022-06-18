import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import { Link } from 'react-router-dom';
import Shoe from './Shoe';

const Shoes = () => {
    const [shoes, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);

    const firstFour = shoes.slice(0, 4);

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
        <div className='m-8 border-2 p-4'>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    firstFour.map(shoe => <Shoe
                        key={shoe._id}
                        shoe={shoe}
                    ></Shoe>)
                }
            </div>
            <h2 className='w-48 mx-auto rounded text-center py-2 m-8 text-2xl text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'><Link to="/shop">BUY NOW</Link></h2>
        </div>
    );
};

export default Shoes;