import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function ForgotPassword() {
    const { loading } = useSelector(state => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState(false);

    function handleOnSubmit() {

    }

    return (
        <div >
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>{!emailSent ? "Reset your password" : "Check email"}</h1>
                    <p>{!emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" :
                        `We have sent the reset email to {email}`}</p>
                    <form onSubmit={handleOnSubmit}>
                        {
                            !emailSent ? (
                                <label>
                                    <p>Email Address</p>
                                    <input type="email" required
                                        name='email' placeholder='Enter the Email' value={email} onChange={e => setEmail(e.target.value)} />
                                </label>

                            ) : (
                                <div></div>
                            )
                        }
                        <button>
                            {!emailSent ? "Resend  Password" : "Resend Email"}
                        </button>
                    </form>
                    <div>
                        <Link to="login">
                            <p>Back to Login</p>
                        </Link>
                    </div>


                </div>
            )
            }
        </div >
    );
}

export default ForgotPassword;