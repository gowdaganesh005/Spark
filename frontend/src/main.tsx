import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider,createBrowserRouter,Route ,createRoutesFromElements} from "react-router-dom"
import { LandingPage } from './components/pages/LandingPage'
import Chat from './components/pages/Chat'
import App from './App'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="" element={<LandingPage/>}/>
      <Route path="create" element={<Chat/>}/>
    </Route>
  )

)

createRoot(document.getElementById('root')!).render(
  
    <RouterProvider router={router} />
  
)
