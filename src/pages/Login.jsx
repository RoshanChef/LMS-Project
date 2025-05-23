import React from 'react'
import login from '../assets/images/login.webp';
import Template from '../components/core/Auth/Template';

function Login() {
    return (
        <div className='mt-14'>
            <Template
                title="Welcome Back"
                description1="Build skills for today, tomorrow, and beyond."
                description2="Education to future-proof your career."
                image={login}
                formType="login" />
        </div>
    )
}

export default Login
