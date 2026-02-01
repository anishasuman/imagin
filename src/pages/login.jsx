import React from 'react'
import {SignIn} from '@clerk/clerk-react' 
const Login = () => {
  return (
    <div>
      <SignIn path='/auth/login' />
    </div>
  )
}

export default Login
