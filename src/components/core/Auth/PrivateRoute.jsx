import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Login from '../../../pages/Login';

function PrivateRoute({ children }) {
    const { token } = useSelector(state => state.auth);
    
    if (token)
        return children
    else
        return <Navigate to="/login" />
}

export default PrivateRoute
