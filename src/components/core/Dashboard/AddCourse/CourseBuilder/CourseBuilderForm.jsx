import React from 'react'
import { useForm } from 'react-hook-form';

function CourseBuilderForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  function submitBuilder(formdata) {

  }

  return (
    <div>
      <form onSubmit={handleSubmit(submitBuilder)}>

      </form>
    </div>
  )
}

export default CourseBuilderForm
