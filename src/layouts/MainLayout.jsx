import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from '../components/SideBar'
import { ToggleThemeButton } from '../components'

export const MainLayout = () => {
  return (
    <div className='flex overflow-hidden h-svh w-full'>

        <ToggleThemeButton/>

        <SideBar/>

        <main className='w-full'>

            <Outlet/>

        </main>


    </div>
  )
}
