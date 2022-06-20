import React, { useEffect, useState } from 'react';
import { addToDb } from '../../utilities/localdb';
import Loading from '../Shared/Loading';
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5000/productCount')
            .then(res => res.json())
            .then(data => {
                const count = data.count;
                const pages = Math.ceil(count / 8);
                setPageCount(pages);
            })
    }, []);

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/product')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
    }, []);

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product._id);
    }


    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className='p-4'>
            <h2 className='text-center text-2xl font-bold my-8'>Product Collection: {products.length}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            {
                [...Array(pageCount).keys()]
                    .map(number => <button onClick={() => setPage(number)} className={page === number ? 'btn btn-active btn-primary mx-2 my-8' : 'btn btn-sm mx-2 my-8'}>{number}</button>)
            }
        </div>
    );
};

export default Products;