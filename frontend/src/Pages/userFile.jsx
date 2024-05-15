import React from 'react'
import Header from '../Components/Header'
import UserSideBar from '../Components/userSideBar'
import File from '../Components/File'

export default function userFile() {
  return (
    <>
      <Header />
      <div className="flex">
        <UserSideBar />
        <div className="flex-1">
          <File/>
        </div>
      </div>
    </>
  )
}
