import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Shared/Loading';
import Jacket from './Jacket';

const Jackets = () => {
    const [jackets, setShoes] = useState([]);
    const [loading, setLoading] = useState(true);

    const firstFour = jackets.slice(0, 4);

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/jacket')
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
            <h2 className='text-2xl font-bold'>Jacket Collection</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    firstFour.map(jacket => <Jacket
                        key={jacket._id}
                        jacket={jacket}
                    ></Jacket>)
                }
            </div>
            <h2 className='w-48 mx-auto rounded text-center py-2 m-8 text-2xl text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'><Link to="/shop">BUY NOW</Link></h2>
        </div>
    );
};

export default Jackets;