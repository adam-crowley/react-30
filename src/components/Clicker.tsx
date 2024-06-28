import { useState } from 'react'

function Clicker() {
  const [count, setCount] = useState(0)

  return (
    <div className="clicker">
      <h2>Clicker</h2>
      <div className="clicker__container">
        <div className="clicker__screen">{count}</div>
        <div className="clicker__buttons">
          <button onClick={() => (count === 0 ? null : setCount(count - 1))}>
            -
          </button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
      </div>
    </div>
  )
}

export default Clicker
