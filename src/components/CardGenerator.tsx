import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingTriangles } from 'react-loader-spinner'

type IDInputs = {
  firstName: string
  collegeName: string
  locationName: string
}

function CardGenerator() {
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
    <div className="card-generator">
      <div className="card-generator__container">
        <header>
          <h2>ID Card generator</h2>
        </header>
        <div className="card-generator__columns">
          <div className="card-generator__column">
            <h3>Input form</h3>
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
              <button className="button button--blue" type="submit">
                Generate Card
              </button>
            </form>
          </div>

          <div className="card-generator__column">
            <div>
              <h3>Generated Card</h3>
            </div>
            {isLoading ? (
              <RotatingTriangles
                visible={true}
                height="80"
                width="80"
                colors={[
                  'rgb(255, 204, 102)',
                  'rgb(0, 187, 255)',
                  'rgb(187, 136, 255)',
                ]}
                ariaLabel="rotating-triangles-loading"
                wrapperStyle={{}}
                wrapperClass="card-generator__loading"
              />
            ) : null}

            {isSubmitted && formData && showCard && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.4 }}
                  className="card-generator__card"
                >
                  <div>
                    <div className="card-generator__group">
                      <span className="bold">
                        Name: <br />
                      </span>
                      <span>{formData.firstName}</span>
                    </div>
                    <div className="card-generator__group">
                      <span className="bold">
                        College Name: <br />
                      </span>
                      <span>{formData.collegeName}</span>
                    </div>
                    <div className="card-generator__group">
                      <span className="bold">
                        Location: <br />
                      </span>
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
            <motion.p
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.2 }}
            >
              {error.message}
            </motion.p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardGenerator
