import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import Jacket from './Jacket';

const Jackets = () => {
    const [jackets, setJackets] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/jacket')
            .then(res => res.json())
            .then(data => {
                setJackets(data)
                setLoading(false)
            })
    }, []);

    

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-4'>
            <h2 className='text-center text-2xl font-bold m-8'>Total Jackets: {jackets.length}</h2>
            <h2 className='text-2xl font-bold mb-4'>Jacket Collection</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    jackets.map(jacket => <Jacket
                        key={jacket._id}
                        jacket={jacket}
                    ></Jacket>)
                }
            </div>
        </div>
    );
};

export default Jackets;