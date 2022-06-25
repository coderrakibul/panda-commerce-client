import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import User from '../../images/user.png'

const Profile = () => {

    const [user, loading] = useAuthState(auth);
    console.log(user)

    if (loading) {
        return <Loading></Loading>
    }

    return (
        <div className=' container mx-auto my-8'>
            <div className='p-4'>
                <div className='font-bold'>
                    <h2 className='text-2xl font-bold underline'>My Profile</h2>
                    
                    <div class="avatar mt-4">
                        <div class="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            {user?.photoURL ? <img src={user.photoURL} alt='userImage' /> : <img src={User} alt='userImage' />}
                        </div>
                    </div>
                        <h3>Name: {user?.displayName}</h3>
                        <h3>Email: {user?.email}</h3>
                        <h3>{user.emailVerified ? <span className='text-green-500'>Verified Account</span> : <span className='text-red-500'>Not Verified</span>}</h3>
                        <h3>Last Signin: {user?.metadata?.creationTime}</h3>
                        <h3>Last Visited: {user?.metadata?.lastSignInTime}</h3>
                </div>
            </div>
        </div>
    );
};

export default Profile;