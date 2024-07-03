import { useState, useEffect } from 'react'
import axios from 'axios'

function UserFeed() {
  const [userData, setUserData] = useState([])

  async function getUser() {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=5')
      const data = response.data.results
      console.log(data)
      setUserData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="user-feed">
      <h2>User Feed</h2>
      <div className="user-feed__container">
        {userData.map((user) => (
          <>
            <div className="user-feed__user">
              <div className="user-feed__top-panel">
                User:{' '}
                {`${user.name.title} ${user.name.first} ${user.name.last}`}
              </div>
              <div className="user-feed__content">
                <div className="user-feed__left-col">
                  <p className="user-feed__name"></p>
                  <p>Email: {user.email}</p>
                  <p className="user-feed__time"></p>
                  <p>Age: {user.dob.age} </p>
                  <p>Nationality: {user.location.country}</p>
                  <p>Phone: {user.phone}</p>
                </div>
                <div className="user-feed__right-col">
                  <img
                    className="user-feed__img"
                    src={user.picture.large}
                    alt={`${user.name.title} ${user.name.first} ${user.name.last}`}
                  />
                  <p>Address:</p>
                  <p>{`${user.location.street.number} ${user.location.street.name}`}</p>
                  <p>{`${user.location.city}, ${user.location.country}, ${user.location.postcode}`}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

export default UserFeed
