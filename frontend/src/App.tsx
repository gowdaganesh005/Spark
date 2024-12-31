
import { Outlet } from 'react-router-dom'
import './App.css'
import { Background } from './components/pages/Background'

import Header from './components/ui/Header'

function App() {
  

  return (
    <>
    <Background>
      <Header/>
      <Outlet/>
    </Background>
    </>
  )
}

export default App
