import React from 'react'
import { useSelector } from 'react-redux';

function Dashboard() {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return (
            <div className='custom-loader'></div>
        )
    }

    return (
        <div className=''>
            Dashboard
        </div>
    )
}

export default Dashboard
