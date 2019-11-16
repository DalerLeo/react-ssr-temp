import React from 'react'
import ProfileUI from './ProfileUI'

const Profile = (props) => {
  const { userData } = props
  return (
    <div>
      <ProfileUI {...userData} />
    </div>
  )
}

export default Profile
