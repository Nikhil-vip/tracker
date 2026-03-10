import { useState } from 'react'
import './App.css'
import LOGGIN from './log_in'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LOGGIN />
    </>
  )
}

export default App
