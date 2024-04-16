import React from 'react'
import AdminSideBar from '../Components/AdminSideBar'
import Header from '../Components/Header'
import FormNewDepartement from '../Components/FormNewDepartement'


export default function NewDepartement() {
  return (
    <div>
      <Header />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <FormNewDepartement />
        </div>
      </div>
    </div>
  )
}
