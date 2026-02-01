import React from 'react'
import {SignUp} from '@clerk/clerk-react'
const Register = () => {
  return (
    <div>
      <SignUp path='/auth/register' routing='path' />
    </div>
  )
}

export default Register
