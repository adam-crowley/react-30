import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingTriangles } from 'react-loader-spinner'

import { Photo } from '../../models/imageGallery'

function ImageGallery() {
  const [photoData, setPhotoData] = useState<Photo[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  async function getData() {
    try {
      setIsLoading(true)
      const response = await axios.get<Photo[]>('https://picsum.photos/v2/list')
      const data = response.data.slice(0, 10)
      setPhotoData(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  function nextUser() {
    setCurrentIndex((prevIndex) => {
      return prevIndex === photoData.length - 1 ? 0 : prevIndex + 1
    })
  }

  function previousUser() {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? photoData.length - 1 : prevIndex - 1
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="image-gallery">
      <h2>Image gallery</h2>
      <div className="image-gallery__container">
        <button
          className="image-gallery__btn image-gallery__btn--prev"
          onClick={previousUser}
        ></button>
        <div className="image-gallery__img-wrapper">
          <>
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
                wrapperClass="image-gallery__loading"
              />
            ) : (
              <AnimatePresence>
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.4 }}
                  className="image-gallery__img"
                  src={photoData[currentIndex].download_url}
                ></motion.img>
              </AnimatePresence>
            )}
          </>
        </div>
        <button
          className="image-gallery__btn user-feed__btn--next"
          onClick={nextUser}
        ></button>
        <ul className="image-gallery__progress">
          {photoData.map((_photo, index) => (
            <li key={index}>
              <button
                className={currentIndex === index ? 'selected' : ''}
                onClick={() => setCurrentIndex(index)}
              >
                •
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ImageGallery
