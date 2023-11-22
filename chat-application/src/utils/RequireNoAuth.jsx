import React from 'react'
import { Outlet } from 'react-router-dom'

const RequireNoAuth = () => {
  console.log('this is Require No Auth :)')
  return (
      <Outlet />
  )
}

export default RequireNoAuth