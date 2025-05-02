import React from 'react'
import signup from '../assets/images/signup.webp';
import Template from '../components/core/Auth/Template';

function Signup() {

  return (
    <div className='mt-18'>
      <Template
        title="Join the millions learning to code with StudyNotion for free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={signup}
        formType="signup" />
    </div>
  )
}

export default Signup
