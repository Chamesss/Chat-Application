import React from 'react'
import { Outlet } from 'react-router-dom'

const RequireAuth = () => {
  console.log('this is Require Auth :)')
  return (
      <Outlet />
  )
}

export default RequireAuth