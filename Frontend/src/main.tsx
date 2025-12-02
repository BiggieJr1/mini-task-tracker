import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import TaskPage from './pages/TaskPage.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskPage />
  </StrictMode>,
)
