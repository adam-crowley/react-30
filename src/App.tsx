import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingTriangles } from 'react-loader-spinner'

import './App.css'

type IDInputs = {
  firstName: string
  collegeName: string
  locationName: string
}

function App() {
  const [formData, setFormData] = useState<IDInputs | null>(null)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [showCard, setShowCard] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDInputs>()

  const onSubmit: SubmitHandler<IDInputs> = (data) => {
    setShowCard(false)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setFormData(data)
      setIsSubmitted(true)
      setShowCard(true)
    }, 400)
  }

  return (
    <>
      <div className="page">
        <div className="card-generator">
          <div className="card-generator__container">
            <header>
              <h1>ID Card generator</h1>
            </header>
            <div className="card-generator__columns">
              <div className="card-generator__column">
                <h2>Input form</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form">
                  <div className="form__group">
                    <label>Enter Name:</label>
                    <input
                      id="firstName"
                      {...register('firstName', {
                        required: 'Name is required',
                      })}
                    />
                  </div>
                  <div className="form__group">
                    <label>Enter College Name:</label>
                    <input
                      id="collegeName"
                      {...register('collegeName', {
                        required: 'College Name is required',
                      })}
                    />
                  </div>
                  <div className="form__group">
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

              <div className="card-generator__column">
                <div>
                  <h2>Generated Card</h2>
                </div>
                {isLoading ? (
                  <RotatingTriangles
                    visible={true}
                    height="80"
                    width="80"
                    colors={['#1B5299', '#EF8354', '#DB5461']}
                    ariaLabel="rotating-triangles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : null}

                {isSubmitted && formData && showCard && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: 'easeInOut', duration: 0.4 }}
                      className="generated-card"
                    >
                      <div>
                        <div className="">
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
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
            <div className="card-generator__errors">
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error.message}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
