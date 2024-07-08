import { useState, useEffect } from 'react'
import axios from 'axios'

function UserFeed() {
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(0)

  async function getUsers() {
    try {
      const response = await axios.get('https://randomuser.me/api/?results=5')
      const data = response.data.results
      setUserData(data)
      console.log('data', data)
    } catch (error) {
      console.error(error)
    }
  }

  function nextUser() {
    console.log('index', index)
    setIndex((prevIndex) => {
      console.log('prevIndex', prevIndex)
      return prevIndex === userData.length - 1 ? 0 : prevIndex + 1
    })
    console.log('index', index)
  }

  function previousUser() {
    console.log('index', index)
    setIndex((prevIndex) => {
      console.log('prevIndex', prevIndex)
      return prevIndex === 0 ? userData.length - 1 : prevIndex - 1
    })
    console.log('index', index)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="user-feed">
      <h2>User Feed</h2>
      <div className="user-feed__container">
        <button className="" onClick={previousUser}>
          Previous
        </button>
        {userData.length && (
          <>
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
        <button className="" onClick={nextUser}>
          Next
        </button>
      </div>

      <button className="button button--blue" onClick={getUsers}>
        Generate new users
      </button>
    </div>
  )
}

export default UserFeed
