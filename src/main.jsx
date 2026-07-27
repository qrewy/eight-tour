import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Memories from './Memories.jsx'

const pathname = window.location.pathname.replace(/\/+$/, '') || '/'
const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '')
const routePath =
  basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || '/'
    : pathname
const memoriesMatch = routePath.match(/^\/memories(?:\/([^/]+))?$/)
const currentPage = memoriesMatch ? (
  <Memories citySlug={memoriesMatch[1]} />
) : (
  <App />
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {currentPage}
  </StrictMode>,
)
