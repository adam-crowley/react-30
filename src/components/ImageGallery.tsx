import { useState, useEffect } from 'react'
import axios from 'axios'

function ImageGallery() {
  const [photoData, setPhotoData] = useState([])

  async function getData() {
    const response = await axios.get('https://picsum.photos/v2/list?results=5')
    const data = response.data.slice(0, 10)
    setPhotoData(data)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="image-gallery">
      <h2>Image gallery</h2>
      <div className="image-gallery__container">
        {photoData.map((photo, index) => {
          return (
            <div key={index} className="image-gallery__img-wrapper">
              <img
                className="image-gallery__img"
                src={photo.download_url}
                alt={photo.id}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
