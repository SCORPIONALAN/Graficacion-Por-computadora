import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BresenhamDemo from './Bresenham.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BresenhamDemo />
  </StrictMode>,
)
