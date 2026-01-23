import ForgotPassword from './pages/auth/ForgotPassword'
import Login from './pages/auth/Login'
import './App.css'
import {BrowserRouter , Routes , Route } from "react-router-dom"

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element= {<Login/>} />
      <Route path="/ForgotPassword" element={<ForgotPassword/>} /> 
    </Routes>
    </BrowserRouter>
  )
}

export default App
