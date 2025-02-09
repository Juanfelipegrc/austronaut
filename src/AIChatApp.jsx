import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {routes} from './router'


export const AIChatApp = () => {
  return (
    <Suspense fallback={
      <div> 
        <h1>Cargando...</h1>
      </div>
    }>
    
        <Routes>

          {
            routes.map(({path, component: Component}) => (

              <Route key={path} path={path} element={<Component/>}/>

            ))
          }

        </Routes>

    </Suspense>
  )
}
