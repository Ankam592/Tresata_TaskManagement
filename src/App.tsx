
import {Outlet} from 'react-router-dom'
import { Header } from './Components/Header/Header'

import './App.css'

function App() {
  return (
    <div className='app'>
      <Header></Header>
      <main className='main'>
        <Outlet/>
      </main>
    </div>
  )
}

export default App
