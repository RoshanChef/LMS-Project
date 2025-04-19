import React from 'react'
import ContactUsForm from '../../Common/ContactUsForm'

function ContactFormSection() {
  return (
    <div className='mx-auto flex flex-col gap-4'>
      <h1 className='text-4xl text-center font-bold'>Get in Touch</h1>
      <p className='text-gray-400 text-center'>
        We'd love to here for you, Please fill out this form.
      </p>
      <ContactUsForm width="450"/>
    </div>
  )
}

export default ContactFormSection
