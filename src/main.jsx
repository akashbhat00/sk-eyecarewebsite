import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { services } from './services/service.container'
import { App } from './ui/app/App'
import './ui/styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App services={services} />
  </StrictMode>,
)
