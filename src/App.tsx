import './App.css'
import CardGenerator from './components/CardGenerator'
import Clicker from './components/Clicker'
import DigitalClock from './components/DigitalClock'
import ImageGallery from './components/ImageGallery'
import UserFeed from './components/UserFeed'
import QuoteGenerator from './components/QuoteGenerator'

function App() {
  return (
    <>
      <div className="page">
        <QuoteGenerator />
        <ImageGallery />
        <UserFeed />
        <CardGenerator />
        <Clicker />
        <DigitalClock />
      </div>
    </>
  )
}

export default App
