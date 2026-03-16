import './App.css'
import { Routes, Route } from 'react-router-dom'
import LOGGIN from './Log_in.jsx'
import REGISTER from './register.jsx'
function App() {
  return (
    <>


      <Routes>
        <Route path="/" element={<REGISTER />} />
        <Route path="/Log_in.jsx" element={<LOGGIN />} />
      </Routes>

    </>
  )
}

export default App
