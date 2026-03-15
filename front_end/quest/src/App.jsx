import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LOGGIN from './log_in'
import REGISTER from './register.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/log_in' element={<LOGGIN />} />
          <Route path='/register' element={<REGISTER />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
