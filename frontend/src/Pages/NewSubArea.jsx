import React from 'react'
import AdminSideBar from '../Components/AdminSideBar'
import Header from '../Components/Header'
import FormNewSubArea from '../Components/FormNewSubArea'

export default function NewSubArea() {
  return (
    <div>
      <Header />
      <div className="flex">
        <AdminSideBar />
        <div className="flex-1">
          <FormNewSubArea />
        </div>
      </div>
    </div>
  )
}
