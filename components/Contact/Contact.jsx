import React from 'react'
import { useForm } from "react-hook-form";


const Contact = () => {
  // function and state 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <div className='my-10'>
      {/* title  */}
      <div className='flex flex-col items-center justify-center'>
        <h1 className='font-semibold text-4xl'>Contact With Us</h1>
      </div>
      {/* form section  */}


      {/* form section end  */}

    </div>
  )
}

export default Contact