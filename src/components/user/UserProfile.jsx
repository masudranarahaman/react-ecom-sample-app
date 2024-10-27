import React from 'react'
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const {state} = useLocation()
  console.log( state )
  return (
    <div className='profile-container'>
        { state ? (<>
          <h2>User Profile</h2>
        <div className="profile-info">
        <p><span className='profile-label'>Name: </span>{state.name}</p>
        <p><span className='profile-label'>Email: </span>{state.email}</p>
        <p><span className='profile-label'>City: </span>{state.city}</p>
        <p><span className='profile-label'>Country: </span>{state.country}</p>
        </div>
        </>) :<p>No profile exits</p> }
        
    </div>
  )
}

export default UserProfile;