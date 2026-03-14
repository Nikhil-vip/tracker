import { useState } from 'react'
import './App.css'
import LOGGIN from './log_in'
import REGISTER from './register.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <REGISTER />
    </>
  )
}

export default App
