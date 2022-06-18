import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';

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
            <h2>Total Shoes: {shoes.length}</h2>
        </div>
    );
};

export default Shop;