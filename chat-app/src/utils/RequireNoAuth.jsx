import React from 'react'
import { Outlet } from 'react-router-dom'

const RequireNoAuth = () => {
  return (
    <Outlet />
  )
}

export default RequireNoAuth