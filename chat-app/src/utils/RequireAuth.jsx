import React from 'react'
import { Outlet } from 'react-router-dom'

const RequireAuth = () => {
  return (
    <Outlet />
  )
}

export default RequireAuth