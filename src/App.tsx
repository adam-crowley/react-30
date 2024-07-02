import './App.css'
import CardGenerator from './components/CardGenerator'
import Clicker from './components/Clicker'
import DigitalClock from './components/DigitalClock'

function App() {
  return (
    <>
      <div className="page">
        <CardGenerator />
        <Clicker />
        <DigitalClock />
      </div>
    </>
  )
}

export default App
