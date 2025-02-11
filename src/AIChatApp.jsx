import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'

export const AIChatApp = () => {
  return (
    <>
    
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
    
    </>
  )
}
