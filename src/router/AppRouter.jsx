import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts'
import { ChatPage } from '../pages'



export const AppRouter = () => {



    

  return (
    <>         
        <Routes>
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<ChatPage/>}/>
            </Route>
        </Routes>
    
    </>
  )
}
