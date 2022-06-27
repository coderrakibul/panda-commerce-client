import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import HistoryList from './HistoryList';

const History = () => {
    const [history, setHistory] = useState([]);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

    let totalCost = 0;

    for (const product of history) {
        totalCost = totalCost + product.finalPrice;
        console.log(totalCost)
    }


    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(`http://localhost:5000/history?user=${user.email}`)
                .then(res => res.json())
                .then(data => setHistory(data));
            setLoading(false);
        }
    }, [user])

    if (loading) {
        return <Loading></Loading>
    }


    return (
        <div className='container mx-auto mb-16'>
            {history.length > 0 ? <h2 className='text-center text-2xl font-bold my-8'>Total Payments: {history?.length}</h2> : <h2 className='text-center text-2xl font-bold my-8'>No History!</h2>}

            {
                history.map(hist => <HistoryList
                    key={hist._id}
                    hist={hist}
                ></HistoryList>)
            }

            {history.length > 0 ? <h2 className='text-center text-2xl font-bold my-8'>Total Cost: <span className='font-bold text-orange-500'>${totalCost}</span></h2> : ""}

        </div>
    );
};

export default History;