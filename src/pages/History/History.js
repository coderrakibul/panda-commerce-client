import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import HistoryList from './HistoryList';

const History = () => {
    const [history, setHistory] = useState([]);
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setLoading(true);
            fetch(`http://localhost:5000/history?user=${user.email}`)
                .then(res => res.json())
                .then(data => setHistory(data));
            setLoading(false);
        }
    }, [history, user])

    if (loading) {
        return <Loading></Loading>
    }


    return (
        <div className='container mx-auto mb-16'>
            <h2 className='text-center text-2xl font-bold my-8'>Total Payments: {history.length}</h2>

            {
                history.map(hist => <HistoryList
                    key={hist._id}
                    hist={hist}
                ></HistoryList>)
            }
        </div>
    );
};

export default History;