import React from 'react'
import { useSelector } from 'react-redux'

function AdminRoute({ children }) {
    const { user } = useSelector(state => state.profile);

    if (user.accountType === 'Admin') {
        return children;
    }
    else
        return <Navigate to="/admin" />
}

export default AdminRoute
