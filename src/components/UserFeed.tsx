import { useState, useEffect } from 'react'
import axios from 'axios'
import { RotatingTriangles } from 'react-loader-spinner'

import { UserData } from '../../models/userfeed'

function UserFeed() {
  const [userData, setUserData] = useState<UserData[]>([])
  const [index, setIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

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
    setIndex((prevIndex) => {
      return prevIndex === userData.length - 1 ? 0 : prevIndex + 1
    })
  }

  function previousUser() {
    setIndex((prevIndex) => {
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
        {userData.length && (
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
            ) : null}
            <div key={index} className="user-feed__user">
              <div className="user-feed__top-panel">
                User:{' '}
                {`${userData[index].name.title} ${userData[index].name.first} ${userData[index].name.last}`}
              </div>
              <div className="user-feed__content">
                <div className="user-feed__left-col">
                  <p className="user-feed__name"></p>
                  <p>Email: {userData[index].email}</p>
                  <p className="user-feed__time"></p>
                  <p>Age: {userData[index].dob.age} </p>
                  <p>Nationality: {userData[index].location.country}</p>
                  <p>Phone: {userData[index].phone}</p>
                </div>
                <div className="user-feed__right-col">
                  <img
                    className="user-feed__img"
                    src={userData[index].picture.large}
                    alt={`${userData[index].name.title} ${userData[index].name.first} ${userData[index].name.last}`}
                  />
                  <p>Address:</p>
                  <p>{`${userData[index].location.street.number} ${userData[index].location.street.name}`}</p>
                  <p>{`${userData[index].location.city}, ${userData[index].location.country}, ${userData[index].location.postcode}`}</p>
                </div>
              </div>
            </div>
          </>
        )}
        <button
          className="user-feed__btn user-feed__btn--next"
          onClick={nextUser}
        ></button>
        <ul className="user-feed__progress">
          <li>
            <button
              className={index === 0 ? 'selected' : ''}
              onClick={() => setIndex(0)}
            >
              •
            </button>
          </li>
          <li>
            <button
              className={index === 1 ? 'selected' : ''}
              onClick={() => setIndex(1)}
            >
              •
            </button>
          </li>
          <li>
            <button
              className={index === 2 ? 'selected' : ''}
              onClick={() => setIndex(2)}
            >
              •
            </button>
          </li>
          <li>
            <button
              className={index === 3 ? 'selected' : ''}
              onClick={() => setIndex(3)}
            >
              •
            </button>
          </li>
          <li>
            <button
              className={index === 4 ? 'selected' : ''}
              onClick={() => setIndex(4)}
            >
              •
            </button>
          </li>
        </ul>
      </div>

      <button className="button button--yellow" onClick={getUsers}>
        Generate new users
      </button>
    </div>
  )
}

export default UserFeed
