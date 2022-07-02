import React from 'react';
import imoji from '../../images/imoji.png'

const NotFound = () => {
    return (
        <div className='container text-center notfound-page'>
            <div className='flex justify-center items-center h-screen'>
                <div className='mb-24'>
                    <img src={imoji} alt="imoji" />
                    <h1 className='text-8xl font-bold text-red-600'>404!</h1>
                    <h3 className='text-2xl font-bold text-red-600'>Page Not Found</h3>
                </div>
            </div>
        </div>
    );
};

export default NotFound;