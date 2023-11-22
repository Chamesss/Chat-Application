import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    console.log('this is layout :)')
    return (
        <Outlet/>
    )
}

export default Layout