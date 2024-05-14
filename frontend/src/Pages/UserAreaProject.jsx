import React from 'react'
import Header from '../Components/Header'
import AreaProject from '../Components/AreaProject'
import UserSideBar from '../Components/userSideBar'


export default function UserAreaProject() {
  return (
    <>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <AreaProject />
        </div>
      </div>
    </>
  )
}
