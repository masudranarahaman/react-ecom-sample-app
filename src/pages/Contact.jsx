import React from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const navigate = useNavigate()
  const handleGoToHome = () =>{
    return navigate('/')
  }
  return (
    <div>
      <h2>Welcome to Contact page</h2>
       <button onClick={handleGoToHome}>Go to Home page</button>
    </div>
  )
}

export default Contact