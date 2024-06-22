import { useForm, SubmitHandler } from 'react-hook-form'

import './App.css'

type IDInputs = {
  firstName: string
  collegeName: string
  locationName: string
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IDInputs>()

  const onSubmit: SubmitHandler<IDInputs> = (data) => {
    console.log(data)
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
        <div>
          <div>
            <div>
              <div>
                <span>Name:</span>
                <span></span>
              </div>
              <div>
                <span>College Name:</span>
                <span></span>
              </div>
              <div>
                <span>Location:</span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Display all errors in one div */}
      <div className="errors">
        {Object.values(errors).map((error, index) => (
          <p key={index}>{error.message}</p>
        ))}
      </div>
    </>
  )
}

export default App
