import { useState, useEffect } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { RotatingTriangles } from 'react-loader-spinner'

import { UserData } from '../../models/userfeed'

function UserFeed() {
  const [userData, setUserData] = useState<UserData[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  async function getUsers() {
    try {
      setIsLoading(true)
      const response = await axios.get('https://randomuser.me/api/?results=5')
      const data = response.data.results
      setUserData(data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  function nextUser() {
    setCurrentIndex((prevIndex) => {
      return prevIndex === userData.length - 1 ? 0 : prevIndex + 1
    })
  }

  function previousUser() {
    setCurrentIndex((prevIndex) => {
      return prevIndex === 0 ? userData.length - 1 : prevIndex - 1
    })
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="user-feed">
      <h2>User Feed</h2>
      <div className="user-feed__container">
        <button
          className="user-feed__btn user-feed__btn--prev"
          onClick={previousUser}
        ></button>
        <div className="user-feed__user-wrapper">
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
                wrapperClass="user-feed__loading"
              />
            ) : (
              <AnimatePresence>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: 'easeInOut', duration: 0.4 }}
                  className="user-feed__user"
                >
                  <div className="user-feed__content">
                    <div className="user-feed__left-col">
                      <p className="user-feed__name">
                        <span className="bold">
                          {`${userData[currentIndex].name.title} ${userData[currentIndex].name.first} ${userData[currentIndex].name.last}`}
                        </span>
                      </p>
                      <p>
                        <span className="bold">Email:</span>{' '}
                        <span className="user-feed__email">
                          {userData[currentIndex].email}
                        </span>
                      </p>
                      <p className="user-feed__time"></p>
                      <p>
                        <span className="bold">Age:</span>{' '}
                        {userData[currentIndex].dob.age}{' '}
                      </p>
                      <p>
                        <span className="bold">Nationality:</span>{' '}
                        {userData[currentIndex].location.country}
                      </p>
                      <p>
                        <span className="bold">Phone:</span>{' '}
                        {userData[currentIndex].phone}
                      </p>
                    </div>
                    <div className="user-feed__right-col">
                      <img
                        className="user-feed__img"
                        src={userData[currentIndex].picture.large}
                        alt={`${userData[currentIndex].name.title} ${userData[currentIndex].name.first} ${userData[currentIndex].name.last}`}
                      />
                      <div className="user-feed__address">
                        <p>
                          <span className="bold">Address:</span>
                        </p>
                        <p>{`${userData[currentIndex].location.street.number} ${userData[currentIndex].location.street.name}`}</p>
                        <p>{`${userData[currentIndex].location.city}, ${userData[currentIndex].location.country}, ${userData[currentIndex].location.postcode}`}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </>
        </div>
        <button
          className="user-feed__btn user-feed__btn--next"
          onClick={nextUser}
        ></button>
        <ul className="user-feed__progress">
          {userData.map((_user, index) => (
            <li key={index}>
              <button
                className={index === currentIndex ? 'selected' : ''}
                onClick={() => setCurrentIndex(index)}
              >
                •
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className="button button--yellow" onClick={getUsers}>
        Generate new users
      </button>
    </div>
  )
}

export default UserFeed
