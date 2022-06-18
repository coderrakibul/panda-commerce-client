import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import Bag from './Bag';

const Bags = () => {
    const [bags, setBags] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/bag')
            .then(res => res.json())
            .then(data => {
                setBags(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-4'>
            <h2 className='text-center text-2xl font-bold m-8'>Total Bags: {bags.length}</h2>
            <h2 className='text-2xl font-bold mb-4'>Bag Collection</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    bags.map(bag => <Bag
                        key={bag._id}
                        bag={bag}
                    ></Bag>)
                }
            </div>
        </div>
    );
};

export default Bags;