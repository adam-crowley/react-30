import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingTriangles } from 'react-loader-spinner'

function ImageGallery() {
  const [photoData, setPhotoData] = useState([])
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  async function getData() {
    try {
      setIsLoading(true)
      const response = await axios.get('https://picsum.photos/v2/list')
      const data = response.data.slice(0, 10)
      setPhotoData(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  function nextUser() {
    setIndex((prevIndex) => {
      return prevIndex === photoData.length - 1 ? 0 : prevIndex + 1
    })
  }

  function previousUser() {
    setIndex((prevIndex) => {
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
        <div className="image-gallery__user-wrapper">
          {photoData.length && (
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
                  wrapperClass="card-generator__loading"
                />
              ) : (
                <AnimatePresence>
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: 'easeInOut', duration: 0.4 }}
                    className="image-gallery__img"
                  >
                    <img
                      className="image-gallery__img"
                      src={photoData[index].download_url}
                      alt={photoData[index].id}
                    />
                  </motion.div>
                </AnimatePresence>
              )}
            </>
          )}
        </div>
        <button
          className="image-gallery__btn user-feed__btn--next"
          onClick={nextUser}
        ></button>
      </div>
    </div>
  )
}

export default ImageGallery
