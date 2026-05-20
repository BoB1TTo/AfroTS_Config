import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')
const startupScreen = document.getElementById('startup-screen')

function finishStartup() {
  document.body.classList.add('startup-done')
  startupScreen?.setAttribute('aria-hidden', 'true')
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

requestAnimationFrame(() => {
  finishStartup()
})
