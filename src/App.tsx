import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'

import './App.css'

type IDInputs = {
  firstName: string
  collegeName: string
  locationName: string
}

function App() {
  const [formData, setFormData] = useState<IDInputs | null>(null)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDInputs>()

  const onSubmit: SubmitHandler<IDInputs> = (data) => {
    console.log(data)
    setFormData(data)
    setIsSubmitted(true)
  }

  return (
    <>
      <header>
        <h1>ID Card generator</h1>
      </header>

      <div>
        <div>
          <h2>Input form</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Enter Name:</label>
            <input
              id="firstName"
              {...register('firstName', { required: 'Name is required' })}
            />
          </div>
          <div>
            <label>Enter College Name:</label>
            <input
              id="collegeName"
              {...register('collegeName', {
                required: 'College Name is required',
              })}
            />
          </div>
          <div>
            <label>Enter Location:</label>
            <input
              id="locationName"
              {...register('locationName', {
                required: 'Location is required',
              })}
            />
          </div>
          <button type="submit">Generate Card</button>
        </form>
      </div>

      <div>
        <div>
          <h3>Generated Card</h3>
        </div>

        {isSubmitted && formData && (
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.4 }}
            className="generated-card"
          >
            <div>
              <div>
                <div>
                  <span>Name: </span>
                  <span>{formData.firstName}</span>
                </div>
                <div>
                  <span>College Name:</span>
                  <span>{formData.collegeName}</span>
                </div>
                <div>
                  <span>Location:</span>
                  <span>{formData.locationName}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <div className="errors">
        {Object.values(errors).map((error, index) => (
          <p key={index}>{error.message}</p>
        ))}
      </div>
    </>
  )
}

export default App
