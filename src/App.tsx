import './App.css'
import CardGenerator from './components/CardGenerator'
import Clicker from './components/Clicker'
import DigitalClock from './components/DigitalClock'
import UserFeed from './components/UserFeed'

function App() {
  return (
    <>
      <div className="page">
        <UserFeed />
        <CardGenerator />
        <Clicker />
        <DigitalClock />
      </div>
    </>
  )
}

export default App
