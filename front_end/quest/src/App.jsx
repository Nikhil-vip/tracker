import './App.css'
import { Routes, Route } from 'react-router-dom'
import LOGGIN from './Log_in.jsx'
import REGISTER from './register.jsx'
import Dashboard from './dash.jsx'
import Entry from './jobs_entry.jsx'
function App() {
  return (
    <>


      <Routes>
        <Route path="/" element={<REGISTER />} />
        <Route path="/Log_in.jsx" element={<LOGGIN />} />
        <Route path="/dash.jsx" element={<Dashboard />} />
        <Route path="/jobs_entry.jsx" element={<Entry />} />
      </Routes>

    </>
  )
}

export default App
