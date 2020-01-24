import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'

const dummyUserEndpoint = 'https://jsonplaceholder.typicode.com/users/2'

const HooksComponent = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch(dummyUserEndpoint, {method: 'GET'})
    .then(res => res.json())
    .then(user => setUser(user))
  }, []);
  
  return (
    <div className='sample-rest-data'>
      <div><strong>Sample Rest Data</strong></div>
      <div>{user.username || 'loading...'}</div>
      <style jsx>
        {`
          .sample-rest-data {
            border: solid 1px black;
            margin: 5px 15px;
            padding: 15px;
          }
        `}
      </style>
    </div>
  )
}

export default HooksComponent