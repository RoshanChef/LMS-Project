import React from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute() {
    return (
        <div>
            <Navigate to={'/login'} />
        </div>
    )
}

export default PrivateRoute
