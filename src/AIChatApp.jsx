import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { useAuth } from './hooks';

export const AIChatApp = () => {


  return (
    <>
    
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
    
    </>
  )
}
