import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AIChatApp } from './AIChatApp'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AIChatApp/>
    </BrowserRouter>
  </StrictMode>,
)
