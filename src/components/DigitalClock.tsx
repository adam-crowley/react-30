import { useState, useEffect } from 'react'

function DigitalClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="digital-clock">
      <h2>Digital Clock</h2>
      <div className="digital-clock__container">
        <span className="digital-clock__time">
          {time.toLocaleTimeString('en-GB')}
        </span>
      </div>
    </div>
  )
}

export default DigitalClock
