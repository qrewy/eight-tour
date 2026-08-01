import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Memories from './Memories.jsx'

const basename = /^\/eightour(?:\/|$)/.test(window.location.pathname)
  ? '/eightour'
  : '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/memories" element={<Memories />} />
        <Route path="/memories/:citySlug/*" element={<Memories />} />
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
