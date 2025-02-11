import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../layouts'
import { ChatPage } from '../pages'
import { AuthLayout, AuthPage } from '../auth'


export const AppRouter = () => {



    const logged = 'authenticated';

  return (
    <>
    
    {
        logged === 'authenticated'
        ?
            <>
            
                <Routes>
                    <Route path='/' element={<MainLayout/>}>
                        <Route index element={<ChatPage/>}/>
                    </Route>
                </Routes>
            
            </>
        :

        <>
            
                <Routes>
                    <Route path='/' element={<AuthLayout/>}>
                        <Route index element={<AuthPage/>}/>
                    </Route>
                </Routes>
            
            </>
    }
        

    
    
    </>
  )
}
