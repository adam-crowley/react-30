import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import CardGenerator from './components/CardGenerator'
import Clicker from './components/Clicker'
import DigitalClock from './components/DigitalClock'
import ImageGallery from './components/ImageGallery'
import UserFeed from './components/UserFeed'
import QuoteGenerator from './components/QuoteGenerator'
import Navbar from './components/Navbar/Navbar'

function App() {
  return (
    <Router>
      <div className="page">
        <Navbar />
        <Routes>
          <Route path="/quote-generator" element={<QuoteGenerator />} />
          <Route path="/image-gallery" element={<ImageGallery />} />
          <Route path="/user-feed" element={<UserFeed />} />
          <Route path="/card-generator" element={<CardGenerator />} />
          <Route path="/clicker" element={<Clicker />} />
          <Route path="/digital-clock" element={<DigitalClock />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
