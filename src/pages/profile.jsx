import React from 'react'
import {UserProfile} from '@clerk/clerk-react'
const Profile = () => {
  return (
    <div>
      <UserProfile path='/auth/profile' routing='path' />
    </div>
  )
}

export default Profile
