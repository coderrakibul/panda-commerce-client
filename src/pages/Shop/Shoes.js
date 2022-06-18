import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import Shoe from './Shoe';

const Shoes = () => {
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
        <div className='p-4'>
            <h2 className='text-center text-2xl font-bold m-8'>Total Products: {shoes.length}</h2>
            <h2 className='text-2xl font-bold mb-4'>Shoe Collection</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    shoes.map(shoe => <Shoe
                        key={shoe._id}
                        shoe={shoe}
                    ></Shoe>)
                }
            </div>
        </div>
    );
};

export default Shoes;